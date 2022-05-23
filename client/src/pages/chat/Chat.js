import { useContext, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

//context
import GlobalContext from "../../context/global-context";
import httpRequests from "../../services/public-services";

//components
import './chat.css';

const Chat = () => {
    const { id: groupId } = useParams();

    const user = JSON.parse(localStorage.getItem("user"));
    const { socket } = useContext(GlobalContext);

    const [data, setData] = useState([]);

    const [groupData, setGroupData] = useState({
        group: '',
        users: []
    });

    const [userInput, setUserInput] = useState('');
    const [groupName, setGroupName] = useState('');

    const handleChange = ({ target: { value } }) => {
        setUserInput(value);
    };

    useEffect(() => {
        const fetchGroupName = async () => {
            const { data: { body: { name } } } = await httpRequests.readGroupName(groupId);
            setGroupName(name);
        };

        fetchGroupName();

        socket.emit('join', { email: user.email, group: groupId }, (error) => {

        });

        socket.on('message', (response) => {
            setData([...data, response]);
        });

        socket.on('groupData', ({ group, users }) => {
            setGroupData({ group, users });
        });

    }, [data, user.email, groupId, socket]);


    const onSendMessage = (e) => {
        e.preventDefault();

        if (!userInput) {
            return;
        }

        socket.emit('sendMessage', userInput, (error) => {
            if (error) {
                return console.log(error);
            }

            console.log('Message Delivered!');
        });

        setUserInput('');
    };

    const getChatPosition = (email) => {
        if (email === 'Admin') {
            return { width: '100%', textAlign: 'center', color: '#0070CC' };
        } else if (email === user.email) {
            return { width: '100%', textAlign: 'left', color: '#0070CC' };
        } else {
            return { width: '100%', textAlign: 'right', color: '#0070CC' };
        }
    };

    const getChatColor = (email) => {
        if (email === 'Admin') {
            return { color: '#06113C' };
        } else if (email === user.email) {
            return { color: '#4D96FF' };
        } else {
            return { color: '#066163' };
        }
    };

    const getHeaderColor = (email) => {
        if (email === 'Admin') {
            return { color: 'tomato' };
        } else if (email === user.email) {
            return { color: '#9900F0' };
        } else {
            return { color: '#8479E1' };
        }
    };

    return (
        <>
            <div className="chat">
                <div className="chat__sidebar">
                    <div className='room-title'>
                        <p>{groupName}</p>
                    </div>
                    <h3 className='list-title'>Online Users</h3>
                    <ul className='users'>
                        {groupData.users.map((user) => {
                            return <li key={user.id}>{user.email} <img src={require('../../assets/online.png')} alt="online" style={{ width: 8, marginBottom: 6 }} /></li>;
                        })}
                    </ul>

                </div>
                <div className="chat__main">
                    <div className="chat__messages flex-container" >
                        <div style={{ width: '100%', textAlign: 'right' }}>
                            <Link to={'/'} style={{ width: '100%', textAlign: 'right' }} onClick={() => navigator('/')}>Leave</Link>
                        </div>
                        {data.map(({ createdAt, res, email }, index) => {
                            return (
                                <div key={index} style={getChatPosition(email)}>
                                    <div className='message' >
                                        <p>
                                            <span className='message__name' style={getHeaderColor(email)}>{email} </span>
                                            <span className='message__meta'>{createdAt}</span>
                                        </p>
                                        <p style={getChatColor(email)}>{res}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="compose">
                        <form id="message-form">
                            <input name="message" placeholder="hello there!" value={userInput} onChange={handleChange} required />
                            <button onClick={onSendMessage} disabled={!userInput} >Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Chat;