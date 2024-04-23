import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

// Styled components for the header and its children
const actionButtonStyle = {
  backgroundColor: "#746352",
  color: "white",
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "3px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#5a4938",
  },
};

const InputArea = ({ type, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(""); // state for title input
  const [content, setContent] = useState(""); // state for content input

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      title,
      content,
    });
    setTitle("");
    setContent("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 3 }}
    >
      {/* Render the input area based on the type of input */}
      {type === "thread" && (
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />
      )}
      <TextField
        label="Content"
        variant="outlined"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        fullWidth
        multiline
        rows={type === "reply" ? 2 : 4}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button sx={actionButtonStyle} variant="contained" type="submit">
          {type === "thread" ? "Create Thread" : "Post"}
        </Button>
        {onCancel && (
          <Button sx={actionButtonStyle} variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default InputArea;
