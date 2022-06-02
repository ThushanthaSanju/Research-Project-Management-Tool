import { Grid, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../../components/button/Button";
import DropDown from "../../components/dropdown/DropDown";
import TextField from "../../components/textField/TextField";
import httpRequests from '../../services/public-services';

// context
import GlobalContext from '../../context/global-context';

// components
import Auth from "./Auth";
import Notify from "../../components/notify/Notify";

const SignUp = () => {
  const { onNotifyOpen } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: "",
    role: "",
    email: "",
    password: ""
  });

  const handleChange = ({ target: { name, value } }) => {
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const validator = ({ firstName, lastName, role, email, password }) => {
    const errors = {};

    if (!firstName) errors.firstName = true;
    if (!lastName) errors.lastName = true;
    if (!role) errors.role = true;
    if (!email) errors.email = true;
    if (!password) errors.password = true;

    return errors;
  };

  const onSubmit = async () => {
    const errors = validator(credentials);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const { data: { body: { user, token } } } = await httpRequests.register(credentials);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setCredentials({
          firstName: "",
          lastName: "",
          role: "",
          email: "",
          password: ""
        });
        navigate('/')
        window.location.reload();
      } catch (error) {
        setErrorMsg(error.response.data.message);
        onNotifyOpen();
      }
    }
  };

  return (
    <Auth> 
      <Notify title="Failed" message={errorMsg} />
      <Typography align="center" mt="136px" fontSize={"26px"} fontWeight="400">Sign Up</Typography>
      <Grid container direction="column" alignItems="center" justifyContent="center" >
        <div style={{ marginTop: '106px' }}>
          <TextField
            name={"firstName"}
            label="First Name"
            value={credentials.firstName}
            error={errors.firstName}
            helperText={errors.firstName && "first name is required!"}
            size="small"
            onChange={handleChange}
            margin="normal"
            style={{ width: '379px' }}
          />
        </div>

        <div>
          <TextField
            name={"lastName"}
            label="Last Name"
            value={credentials.lastName}
            error={errors.lastName}
            helperText={errors.lastName && "last name is required!"}
            size="small"
            onChange={handleChange}
            margin="normal"
            style={{ width: '379px', marginTop: '29px' }}
          />
        </div>

        <DropDown
          name="role"
          label="Role"
          value={credentials.role}
          error={errors.role}
          errorMessage={errors.role && "Role is required!"}
          options={[{ name: 'Student', value: "student" }, { name: 'Staff', value: "staff" }]}
          style={{ width: '379px', marginTop: '29px' }}
          onChange={handleChange}
        />

        <div>
          <TextField
            name={"email"}
            label="Email"
            value={credentials.email}
            error={errors.email}
            helperText={errors.email && "email is required!"}
            size="small"
            onChange={handleChange}
            margin="normal"
            style={{ width: '379px', marginTop: '29px' }}
          />
        </div>
        <div>
          <TextField
            name={"password"}
            label="Password"
            type="password"
            error={errors.password}
            helperText={errors.password && "password is required!"}
            value={credentials.password}
            size="small"
            onChange={handleChange}
            margin="normal"
            style={{ width: '379px', marginTop: '29px' }}
          />
        </div>

        <Button label={"Sign Up"} style={{ width: '221px', marginTop: '52px' }} onClick={onSubmit} />
      </Grid>
      <Grid container direction="row" alignItems="center" justifyContent="center" >
        <Typography align="center" mt="90px" mr="20px" fontSize={"16px"} fontWeight="400" style={{ color: '#706F6F' }}>Already an user?</Typography>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/sign-in')}>
          <Typography align="center" mt="90px" fontSize={"16px"} fontWeight="400" style={{ color: '#706F6F' }}>Sign In</Typography>
        </span>
      </Grid>
    </Auth>
  );
};

export default SignUp;
