import React from 'react';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Menu,
  MenuItem,
  makeStyles,
  Avatar,
  IconButton,
  Hidden,
  Drawer,
  useTheme,
  Divider,
  List,
  ListItemIcon,
  ListItem,
  ListItemText
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Drafts,
  Dashboard,
  Group,
  Settings,
  Notifications,
  Description
} from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  brand: {
    flexGrow: 1
  },
  brandTitle: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      color: 'inherit'
    }
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  }
}));

const Header = ({
  isAuthenticated,
  user,
  onLogout,
  handleGoogleResponse,
  hasDrawer
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = () => (
    <>
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <Dashboard></Dashboard>
            </ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <Description></Description>
            </ListItemIcon>
            <ListItemText primary={'Articles'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <Drafts></Drafts>
            </ListItemIcon>
            <ListItemText primary={'Drafts'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <Group></Group>
            </ListItemIcon>
            <ListItemText primary={'Users'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <Notifications></Notifications>
            </ListItemIcon>
            <ListItemText primary={'Notifications'} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <Settings></Settings>
            </ListItemIcon>
            <ListItemText primary={'Settings'} />
          </ListItem>
        </List>
      </div>
    </>
  );

  return (
    <div data-test='main-header' className={classes.root}>
      <AppBar
        position={hasDrawer ? 'fixed' : 'static'}
        className={hasDrawer ? classes.appBar : null}
      >
        <Toolbar>
          {hasDrawer ? (
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon></MenuIcon>
            </IconButton>
          ) : null}
          <div className={classes.brand}>
            <Typography
              component={Link}
              to='/'
              variant='h6'
              className={classes.brandTitle}
              noWrap
            >
              Scribbles
            </Typography>
          </div>

          {!isAuthenticated ? (
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              onSuccess={handleGoogleResponse}
              onFailure={handleGoogleResponse}
              buttonText=''
              style={{
                background: 'transparent'
              }}
              render={(props) => (
                <Button color='inherit' onClick={props.onClick}>
                  Login
                </Button>
              )}
              cookiePolicy='single_host_origin'
            ></GoogleLogin>
          ) : (
            <>
              <Avatar
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                src={user?.avatar}
                style={{ cursor: 'pointer', width: '30px', height: '30px' }}
              ></Avatar>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                <MenuItem component={Link} to='/admin' onClick={handleClose}>
                  Dashboard
                </MenuItem>
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      {hasDrawer ? (
        <nav className={classes.drawer}>
          <Hidden smUp implementation='css'>
            <Drawer
              variant='temporary'
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer()}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation='css'>
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant='permanent'
              open
            >
              {drawer()}
            </Drawer>
          </Hidden>
        </nav>
      ) : null}
    </div>
  );
};

Header.defaultProps = {
  hasDrawer: false
};

export default Header;
