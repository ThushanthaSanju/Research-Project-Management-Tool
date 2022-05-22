import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import Button from "../../components/button/Button";
import DropDown from "../../components/dropdown/DropDown";
import TextField from "../../components/textField/TextField";
import httpRequests from '../../services/public-services';

// components
import Auth from "./Auth";

const SignUp = () => {

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

  const onSubmit = async () => {
    const { data: { body: { user, token } } } = await httpRequests.register(credentials);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

  };

  return (
    <Auth>
      <Typography align="center" mt="136px" fontSize={"26px"} fontWeight="400">Sign Up</Typography>
      <Grid container direction="column" alignItems="center" justifyContent="center" >
        <div>
          <TextField
            name={"firstName"}
            label="First Name"
            value={credentials.firstName}
            size="small"
            onChange={handleChange}
            margin="normal"
            style={{ width: '379px', marginTop: '106px' }}

          />
        </div>

        <div>
          <TextField
            name={"lastName"}
            label="Last Name"
            value={credentials.lastName}
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
          options={[{ name: 'Student', value: "student" }, { name: 'Staff', value: "staff" }]}
          style={{ width: '379px', marginTop: '29px' }}
          onChange={handleChange}
        />

        <div>
          <TextField
            name={"email"}
            label="Email"
            value={credentials.email}
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
            value={credentials.password}
            size="small"
            onChange={handleChange}
            margin="normal"
            style={{ width: '379px', marginTop: '29px' }}
          />
        </div>

        <Button label={"Sign In"} style={{ width: '221px', marginTop: '52px' }} onClick={onSubmit} />
      </Grid>
      <Grid container direction="row" alignItems="center" justifyContent="center" >
        <Typography align="center" mt="90px" mr="20px" fontSize={"16px"} fontWeight="400" style={{ color: '#706F6F' }}>Already an user?</Typography>
        <Typography align="center" mt="90px" fontSize={"16px"} fontWeight="400" style={{ color: '#706F6F' }}>Sign In</Typography>
      </Grid>
    </Auth>
  );
};

export default SignUp;
