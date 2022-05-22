import { Grid } from "@mui/material";

const Auth = (props) => {
  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={8} sx={{ bgcolor: '#00474F' }} />
      <Grid item xs={4}>
        {props.children}
      </Grid>
    </Grid>
  );
};

export default Auth;
