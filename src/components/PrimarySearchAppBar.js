import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import { BrowserRouter, Link, useHistory } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [input, setInput] = React.useState("");
  const history = useHistory();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMenuToggleSection = () => {
    return (
      <div id="menu">
        <Link to="/Authors" id="listAll" className="menu-items">
          <Button variant="outline-primary">List all authors</Button>
        </Link>
        <Link to="/search/Love" id="love" className="menu-items">
          <Button variant="outline-danger">Love Quotes</Button>
        </Link>
        <Link to="/search/Wisdom" id="wisdom" className="menu-items">
          <Button variant="outline-success">Wisdom Quotes</Button>
        </Link>
        <Link to="/search/Philosophy" id="philosophy" className="menu-items">
          <Button variant="outline-dark">Philosophy Quotes</Button>
        </Link>
        <Link to="/search/Inspiration" id="inspiration" className="menu-items">
          <Button variant="outline-dark">Inspiration Quotes</Button>
        </Link>
        <Link to="/search/Life" id="life" className="menu-items">
          <Button variant="outline-dark">Life Quotes</Button>
        </Link>
        <Link to="/search/Success" id="success" className="menu-items">
          <Button variant="outline-dark">Success Quotes</Button>
        </Link>
      </div>
    );
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const handleSearchChange = (e) => {
    if (e.key === "Enter") {
      let url = "/search/" + input;
      history.push(url);
    }
  };

  const handleInputChane = (change) => {
    setInput(change.target.value);
  };

  const drawerWidth = 240;

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    })
  );

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <IconButton
    //         size="large"
    //         color="inherit"
    //         aria-label="open drawer"
    //         onClick={handleDrawerOpen}
    //         edge="start"
    //         sx={{ mr: 2, ...(open && { display: "none" }) }}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <Typography
    //         variant="h6"
    //         noWrap
    //         component="div"
    //         sx={{ display: { xs: "none", sm: "block" } }}
    //       >
    //         Quotes.farm
    //       </Typography>
    //       <Search onKeyDown={handleSearchChange} onChange={handleInputChane}>
    //         <SearchIconWrapper>
    //           <SearchIcon />
    //         </SearchIconWrapper>
    //         <StyledInputBase
    //           placeholder="Search…"
    //           inputProps={{ "aria-label": "search" }}
    //         />
    //       </Search>
    //       <Box sx={{ flexGrow: 1 }} />
    //       <Box sx={{ display: { xs: "none", md: "flex" } }}>
    //         <IconButton
    //           size="large"
    //           aria-label="show 4 new mails"
    //           color="inherit"
    //         >
    //           {/* { <Badge badgeContent={4} color="error"> */}
    //           <MailIcon />
    //           {/* </Badge> } */}
    //         </IconButton>
    //         <IconButton
    //           size="large"
    //           aria-label="show 17 new notifications"
    //           color="inherit"
    //         >
    //           <Badge badgeContent={17} color="error">
    //             <NotificationsIcon />
    //           </Badge>
    //         </IconButton>
    //         <IconButton
    //           size="large"
    //           edge="end"
    //           aria-label="account of current user"
    //           aria-controls={menuId}
    //           aria-haspopup="true"
    //           onClick={handleProfileMenuOpen}
    //           color="inherit"
    //         >
    //           <AccountCircle />
    //         </IconButton>
    //       </Box>
    //       <Box sx={{ display: { xs: "flex", md: "none" } }}>
    //         <IconButton
    //           size="large"
    //           aria-label="show more"
    //           aria-controls={mobileMenuId}
    //           aria-haspopup="true"
    //           onClick={handleMobileMenuOpen}
    //           color="inherit"
    //         >
    //           <MoreIcon />
    //         </IconButton>
    //       </Box>
    //     </Toolbar>
    //   </AppBar>
    //   <Drawer
    //     sx={{
    //       width: drawerWidth,
    //       flexShrink: 0,
    //       "& .MuiDrawer-paper": {
    //         width: drawerWidth,
    //         boxSizing: "border-box",
    //       },
    //     }}
    //     variant="persistent"
    //     anchor="left"
    //     open={open}
    //   >
    //     <DrawerHeader>
    //       <IconButton onClick={handleDrawerClose}>
    //         {theme.direction === "ltr" ? (
    //           <ChevronLeftIcon />
    //         ) : (
    //           <ChevronRightIcon />
    //         )}
    //       </IconButton>
    //     </DrawerHeader>
    //     <Divider />
    //     <List>
    //       {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>
    //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
    //           </ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //     <Divider />
    //     <List>
    //       {["All mail", "Trash", "Spam"].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>
    //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
    //           </ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //   </Drawer>
    //   <Main open={open}>
    //     <DrawerHeader />
    //     <Typography paragraph>
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //       eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
    //       dolor purus non enim praesent elementum facilisis leo vel. Risus at
    //       ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
    //       quisque non tellus. Convallis convallis tellus id interdum velit
    //       laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
    //       adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
    //       integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
    //       eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
    //       quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
    //       vivamus at augue. At augue eget arcu dictum varius duis at consectetur
    //       lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
    //       faucibus et molestie ac.
    //     </Typography>
    //     <Typography paragraph>
    //       Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
    //       ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
    //       elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
    //       sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
    //       mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
    //       risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
    //       purus viverra accumsan in. In hendrerit gravida rutrum quisque non
    //       tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
    //       morbi tristique senectus et. Adipiscing elit duis tristique
    //       sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
    //       eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
    //       posuere sollicitudin aliquam ultrices sagittis orci a.
    //     </Typography>
    //   </Main>
    //   {renderMobileMenu}
    //   {renderMenu}
    // </Box>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Main>
    </Box>
  );
}
