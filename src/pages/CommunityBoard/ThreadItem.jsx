import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import staticInitObject from "../../config/AllStaticConfig.js";
import { gql, GraphQLClient } from "graphql-request";

// Styled components for the header and its children
const graphqlAPI = staticInitObject.APIGATEWAY_SERVER_URL;

// GraphQL mutation to delete a thread
const DELETE_THREAD_MUTATION = gql`
  mutation DeleteThread($id: ID!) {
    deleteThread(id: $id)
  }
`;

const ThreadItem = ({
  id,
  title,
  content,
  userName,
  createdAt,
  onThreadSelect,
  fetchThreads,
}) => {
  const [open, setOpen] = useState(false); // state to show/hide delete confirmation dialog

  // Check if the current user can delete the thread
  const currentUser = localStorage.getItem("username");
  const currentUserPrivilege = localStorage.getItem("privilege");
  // Boolean to determine if the current user can delete the thread
  const canDelete =
    currentUser === userName || currentUserPrivilege === "manager";

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  // Function to handle the deletion of a thread
  const handleDelete = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    const headers = {
      authorization: token,
    };

    const client = new GraphQLClient(graphqlAPI, { headers });

    try {
      await client.request(DELETE_THREAD_MUTATION, { id });
      // Refetch threads after deletion
      await fetchThreads();
      handleClose();
    } catch (error) {
      console.error("Error deleting thread:", error);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        padding: 2,
        marginTop: 1,
        marginBottom: 1,
        position: "relative",
        border: "1px solid #cccccc",
      }}
      onClick={() => onThreadSelect(id, title, content, userName, createdAt)}
    >
      {/* Render the delete button if the current user can delete the thread */}
      {canDelete && (
        <IconButton
          onClick={handleDeleteClick}
          sx={{ position: "absolute", top: -4, right: -4 }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
      )}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
        <Avatar sx={{ marginRight: 2 }}>{userName.charAt(0)}</Avatar>
        <Typography variant="h6" sx={{ wordBreak: "break-all" }}>
          {title}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          wordBreak: "break-word",
          overflowWrap: "break-word",
          hyphens: "auto",
        }}
      >
        {content}
      </Typography>
      <Box display="flex" justifyContent="space-between" sx={{ marginTop: 1 }}>
        <Typography variant="overline">{`${new Date(
          createdAt
        ).toLocaleString()}`}</Typography>
        <Typography variant="subtitle2">{`Created by: ${userName}`}</Typography>
      </Box>
      
      {/* Dialog to confirm thread deletion */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this thread? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ThreadItem;
