import { Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Notify from "../../components/notify/Notify";
import TextField from "../../components/textField/TextField";
import httpRequests from '../../services/public-services';

// context
import GlobalContext from '../../context/global-context';

// components
import Auth from "./Auth";

const SignIn = () => {
  const { onNotifyOpen } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleChange = ({ target: { name, value } }) => {
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const validator = ({ email, password }) => {
    const errors = {};

    if (!email) errors.email = true;
    if (!password) errors.password = true;

    return errors;
  };

  const onSubmit = async () => {
    const errors = validator(credentials);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const { data: { body: { user, token } } } = await httpRequests.login(credentials);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        window.location.reload();
        setCredentials({
          email: "",
          password: ""
        });
        navigate('/');
      } catch (error) {
        onNotifyOpen();
        setErrorMsg(error.response.data.message)
      }
    }
  };

  return (
    <Auth>
      <Notify title="Failed" message={errorMsg} />
      <Typography align="center" mt="136px" fontSize={"26px"} fontWeight="400">Sign In</Typography>
      <Grid container direction="column" alignItems="center" justifyContent="center" >
        <div style={{ marginTop: '106px' }}>
          <TextField
            name={"email"}
            value={credentials.email}
            size="small"
            label={"Email"}
            onChange={handleChange}
            error={errors.email}
            helperText={errors.email && "email is required!"}
            margin="normal"
            style={{ width: '379px' }}
          />
        </div>
        <div>
          <TextField
            name={"password"}
            type="password"
            value={credentials.password}
            size="small"
            label={"Password"}
            error={errors.password}
            helperText={errors.password && "password is required!"}
            onChange={handleChange}
            margin="normal"
            style={{ width: '379px', marginTop: '29px' }}
          />
        </div>
        <Button label={"Sign In"} onClick={onSubmit} style={{ width: '221px', marginTop: '52px' }} />
      </Grid>
      <Grid container direction="row" alignItems="center" justifyContent="center" >
        <Typography align="center" mt="90px" mr="20px" fontSize={"16px"} fontWeight="400" style={{ color: '#706F6F' }}>Need an account?</Typography>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/sign-up')}>
          <Typography align="center" mt="90px" fontSize={"16px"} fontWeight="400" style={{ color: '#706F6F' }}>Sign Up</Typography>
        </span>
      </Grid>
    </Auth>
  );
};

export default SignIn;
