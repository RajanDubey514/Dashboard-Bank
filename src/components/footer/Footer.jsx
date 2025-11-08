import React from "react";
import { Box, Typography, Link, Divider } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#000", // Black background
        color: "#fff",
        py: 2,
        px: { xs: 2, sm: 4 },
        mt: "auto",
        borderTop: "1px solid #222",
      }}
    >
      {/* Main Footer Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: { xs: "center", sm: "left" },
          gap: 1,
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            justifyContent: { xs: "center", sm: "flex-start" },
          }}
        >
          <Link
            href="#"
            underline="hover"
            color="inherit"
            sx={{
              fontSize: "0.9rem",
              transition: "color 0.3s",
              "&:hover": { color: "#bbb" },
            }}
          >
            Terms & Services
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "#555", display: { xs: "none", sm: "block" } }}
          />
          <Link
            href="#"
            underline="hover"
            color="inherit"
            sx={{
              fontSize: "0.9rem",
              transition: "color 0.3s",
              "&:hover": { color: "#bbb" },
            }}
          >
            Privacy Policy
          </Link>
        </Box>

        {/* Right Section */}
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.85rem",
            mt: { xs: 1, sm: 0 },
          }}
        >
          © {new Date().getFullYear()} All Rights Reserved |{" "}
          <Link
            href="mailto:contacttocare@gmail.com"
            color="inherit"
            underline="hover"
            sx={{
              fontWeight: 500,
              transition: "color 0.3s",
              "&:hover": { color: "#bbb" },
            }}
          >
            contacttocare@gmail.com
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
