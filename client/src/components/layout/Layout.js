import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  List,
  ListItem as MuiListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import {
  PeopleAlt as PeopleIcon,
  Category as CategoryIcon,
  Groups as GroupsIcon,
  Article as ArticleIcon,
  CloudUpload as CloudUploadIcon,
  SupervisedUserCircle as SupervisedUserCircleIcon,
} from "@mui/icons-material";

// assets
import AvatarImg from "../../assets/avatar.jpg";
import { useState } from "react";

const drawerWidth = 360;

// style
const useStyles = makeStyles({
  root: {
    "&$selected": {
      backgroundColor: "red",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
    "&$selected:hover": {
      backgroundColor: "red",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
    "&:hover": {
      backgroundColor: "red",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
  },
  appBar: {
    width: {
      sm: `calc(100% = ${drawerWidth}px)`,
    },
    ml: { sm: `${drawerWidth}px` },
    boxShadow: "none !important",
  },
  drawer: {
    width: `${drawerWidth}px`,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: `${drawerWidth}px`,
      boxSizing: "border-box",
    },
  },
  logoContainer: {
    marginTop: "10px",
    padding: "5px",
  },
  navText: {
    color: "black",
    fontWeight: 600,
    fontSize: "14px",
  },
  cardContainer: {
    backgroundColor: "#FFFF",
    padding: "16px",
    borderRadius: "10px",
  },
});

const user = { id: "12wjq91", role: "ADMIN" };

const adminNavLinks = [
  {
    label: "Users",
    icon: <PeopleIcon sx={{ color: "black" }} />,
    path: '/users'
  },
  {
    label: "Submission Types",
    icon: <CategoryIcon sx={{ color: "black" }} />,
    path: '/submissions'
  },
  {
    label: "Panel Members",
    icon: <GroupsIcon sx={{ color: "black" }} />,
    path: '/panels'
  },
  {
    label: "Marking Schemas",
    icon: <ArticleIcon sx={{ color: "black" }} />,
    path: '/schemas'
  },
  {
    label: "Uploads",
    icon: <CloudUploadIcon sx={{ color: "black" }} />,
    path: '/uploads'
  },
  {
    label: "User roles",
    icon: <SupervisedUserCircleIcon sx={{ color: "black" }} />,
    path: '/roles'
  },
];

// ListItem
const ListItem = withStyles({
  root: {
    "&$selected": {
      background:
        "linear-gradient(90deg, rgba(0, 71, 79, 0.5) 0%, rgba(52, 52, 52, 0) 100%)",
    },
  },
  selected: {},
})(MuiListItem);

const Layout = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(0);

  const listItemClickHandler = (event, index, path) => {
    setSelected(index);
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
            <IconButton>
              <Avatar src={AvatarImg} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer variant="permanent" anchor="left" className={classes.drawer}>
          <div className={classes.logoContainer}>
            <Typography fontWeight={700} variant="h5">
              Research Management Tool
            </Typography>
          </div>
          <List sx={{ marginTop: "60px" }}>
            {user.role === "ADMIN" &&
              adminNavLinks.map(({ label, icon, path }, index) => (
                <ListItem
                  key={index}
                  selected={selected === index}
                  onClick={(event) => listItemClickHandler(event, index, path)}
                >
                  <ListItemButton>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText
                      disableTypography
                      className={classes.navText}
                      primary={label}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          bgcolor: "#EEEEEE",
          flexGrow: 1,
          p: 3,
          marginTop: "60px",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: "100vh",
        }}
      >
        <Box className={classes.cardContainer}>{props.children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
