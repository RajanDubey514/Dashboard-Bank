import React from "react"
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from '@mui/icons-material/Person';

const menuItems = [
    { text: "Dashboard", icon: <HomeIcon />, path: "/" },
    { text: "Add Customer", icon: <PersonIcon  />, path: "/sale-add" },
    { text: "About", icon: <InfoIcon />, path: "/about" },
  ];

  export default menuItems