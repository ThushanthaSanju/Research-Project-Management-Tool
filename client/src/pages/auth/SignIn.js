import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import Button from "../../components/button/Button";
import TextField from "../../components/textField/TextField";
import httpRequests from '../../services/public-services';

// components
import Auth from "./Auth";

const SignIn = () => {

  const [errors, setErrors] = useState({});

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

  const validator = ({ firstName, lastName, role, email, password }) => {
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
        setCredentials({
          email: "",
          password: ""
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Auth>
      <Typography align="center" mt="136px" fontSize={"26px"} fontWeight="400">Sign In</Typography>
      <Grid container direction="column" alignItems="center" justifyContent="center" >
        <div>
          <TextField
            name={"email"}
            value={credentials.email}
            size="small"
            label={"Email"}
            onChange={handleChange}
            error={errors.email}
            helperText={errors.email && "email is required!"}
            margin="normal"
            style={{ width: '379px', marginTop: '106px' }}
          />
        </div>
        <div>
          <TextField
            name={"password"}
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
        <Typography align="center" mt="90px" fontSize={"16px"} fontWeight="400" style={{ color: '#706F6F' }}>Sign Up</Typography>
      </Grid>
    </Auth >
  );
};

export default SignIn;
