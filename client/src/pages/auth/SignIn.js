import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import Button from "../../components/button/Button";
import TextField from "../../components/textField/TextField";

// components
import Auth from "./Auth";

const SignIn = () => {

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

  return (
    <Auth>
      <Typography align="center" mt="136px" fontSize={"26px"} fontWeight="400">Sign In</Typography>
      <Grid container direction="column" alignItems="center" justifyContent="center" >
        <div>
          <TextField name={"email"} value={credentials.email} size="small" onChange={handleChange} margin="normal" style={{ width: '379px', marginTop: '106px' }} />
        </div>
        <div>
          <TextField name={"password"} value={credentials.password} size="small" onChange={handleChange} margin="normal" style={{ width: '379px', marginTop: '29px' }} />
        </div>

        <Button label={"Sign In"} style={{ width: '221px', marginTop: '52px' }} />
      </Grid>
      <Grid container direction="row" alignItems="center" justifyContent="center" >
        <Typography align="center" mt="90px" mr="20px" fontSize={"16px"} fontWeight="400" style={{ color: '#706F6F' }}>Need an account?</Typography>
        <Typography align="center" mt="90px" fontSize={"16px"} fontWeight="400" style={{ color: '#706F6F' }}>Sign Up</Typography>
      </Grid>
    </Auth >
  );
};

export default SignIn;
