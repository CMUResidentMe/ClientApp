import React from "react";
import { Box, Typography, Paper, Avatar } from "@mui/material";

const ThreadSummary = ({ title, content, userName, createdAt }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        padding: 2,
        marginY: 2,
        border: "1px solid #cccccc",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h6" sx={{ wordBreak: "break-all" }}>
          {title}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
        <Avatar sx={{ marginRight: 2 }}>{userName.charAt(0)}</Avatar>
        <Typography variant="body1">{content}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 1,
        }}
      >
        <Typography variant="overline">
          {new Date(createdAt).toLocaleString()}
        </Typography>
        <Typography variant="subtitle2">{`Created by: ${userName}`}</Typography>
      </Box>
    </Paper>
  );
};

export default ThreadSummary;
