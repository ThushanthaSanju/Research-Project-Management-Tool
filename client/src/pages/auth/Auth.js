import { Grid, Typography } from "@mui/material";
import logo from '../../assets/SLIIT_Logo_Crest.png';


const Auth = (props) => {
  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={8} sx={{ bgcolor: '#00474F' }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
        >
          <img src={logo} width="261px" height={"321px"} alt="SLIIT Logo" style={{ marginTop: '227px' }} />
        </Grid>
        <Typography
          align="center"
          mt="77px"
          fontSize={"30px"}
          fontWeight="400"
          color="white"
        >
          Research Management Tool
        </Typography>
        <Typography
          align="center"
          mt="23px"
          fontSize={"22px"}
          fontWeight="400"
          color="white"
        >
          Discover your future
        </Typography>
      </Grid>
      <Grid item xs={4}>
        {props.children}
      </Grid>
    </Grid>
  );
};

export default Auth;
