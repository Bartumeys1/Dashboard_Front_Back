import React, {
    useState
  } from "react";
  import { AppBar, Button,  MenuItem,  Toolbar, Typography } from "@mui/material";
  import { createTheme, ThemeProvider } from "@mui/material/styles";
  import AccountCircleIcon from "@mui/icons-material/AccountCircle";
  import  Menu  from "@mui/material/Menu";
  import {  Link,  NavLink } from "react-router-dom";
  import { useActions } from "../../hooks/useActions";
  import { useTypedSelector } from "../../hooks/useTypedSelector";
  
  const mdTheme = createTheme();

  
  const Header: React.FC = () => {
   
    const { isAuth, user } = useTypedSelector((store) => store.UserReducer);
    //Slide Menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const { LogOut } = useActions();
  
    const Logout = () => {
        LogOut(user.Id);
    };

 
    return (
      <ThemeProvider theme={mdTheme}>
               <AppBar position="static">
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ pl:"10px", flexGrow: 1 }}
              >
                <NavLink to="/" style={{textDecoration:"none", color:"white"}}>My Blogs</NavLink>
              </Typography>
              <div>
                {`${(isAuth)?(user.Email):("Undefined")}`}
                <Button
                  id="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <AccountCircleIcon style={{ color: "white" }} />
                </Button>
  
                <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem><NavLink to="/dashboard" style={{textDecoration:"none", color: "black"}}>Dashboard</NavLink></MenuItem>
          {isAuth && (
          <MenuItem onClick={Logout}>Logout</MenuItem>
          )}
          {!isAuth && (
          <MenuItem> <Link to="/login" style={{textDecoration:"none", color: "black"}}>Login</Link></MenuItem>
          )}

        </Menu>
              </div>
            </Toolbar>
          </AppBar>
      </ThemeProvider>
    );
  };
  
  export default Header;
  
  