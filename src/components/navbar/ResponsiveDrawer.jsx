import React from "react";
import {
  Drawer as MuiDrawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
  Toolbar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/bloglogo.png";

const ResponsiveDrawer = ({
  open,
  setOpen,
  drawerWidth = 240,
  menuItems = [],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  return (
    <>
      {isMobile ? (
        // ===== Mobile Drawer (temporary)
        <MuiDrawer
          variant="temporary"
          open={open}
          onClose={() => setOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#a8d5f2", // 🌈 Light blue background
            },
          }}
        >
          <Toolbar
            sx={{
              alignSelf: "center",
              padding: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img alt="logo" src={logo} width={100} height={40} />
          </Toolbar>
          <Divider />
          <List>
            {menuItems.map(({ text, icon, path }) => (
              <ListItem key={text} disablePadding>
                <Tooltip title={text} placement="right">
                  <ListItemButton
                    component={Link}
                    to={path}
                    onClick={() => setOpen(false)}
                    selected={location.pathname === path}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: "rgba(25,118,210,0.15)",
                      },
                    }}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </MuiDrawer>
      ) : (
        // ===== Desktop Drawer (mini variant)
        <MuiDrawer
          variant="permanent"
          sx={{
            width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
            flexShrink: 0,
            whiteSpace: "nowrap",
            boxSizing: "border-box",
            "& .MuiDrawer-paper": {
              width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
              boxSizing: "border-box",
              backgroundColor: "#eff5f8ff", //
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: "hidden",
            },
          }}
          open={open}
        >
          <Toolbar
            sx={{
              alignSelf: "center",
              padding: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img alt="logo" src={logo} width={100} height={40} />
          </Toolbar>
          <Divider />
          <List>
            {menuItems.map(({ text, icon, path }) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <Tooltip
                  title={text}
                  placement="right"
                  disableHoverListener={open}
                >
                  <ListItemButton
                    component={Link}
                    to={path}
                    selected={location.pathname === path}
                    sx={{
                      minHeight: 44,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      "&.Mui-selected": {
                        backgroundColor: "rgba(25,118,210,0.15)",
                        "&:hover": {
                          backgroundColor: "rgba(25,118,210,0.25)",
                        },
                      },
                    }}
                  >
                   <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto", // reduced spacing
                      justifyContent: "center",
                      "& svg": {
                        fontSize: "1.5rem", // smaller icon
                        color: "#0b0c0cff", // subtle blue tint (optional)
                      },
                    }}
                  >
                    {icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={text}
                    sx={{
                      opacity: open ? 1 : 0,
                      "& .MuiListItemText-primary": {
                        fontSize: "0.8rem", // smaller font
                        fontWeight: 500,
                        color: "#333",
                      },
                    }}
                  />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </MuiDrawer>
      )}
    </>
  );
};

export default ResponsiveDrawer;
