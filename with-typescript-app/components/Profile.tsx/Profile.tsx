import { Box } from "@mui/material";
import React from "react";

const Profile = ({ name, email }) => {
  return (
      <Box sx={{ display: "flex", gap:"10px" }}>
        <p>{name}</p>
        <p>{email}</p>
      </Box>
  );
};

export default Profile;
