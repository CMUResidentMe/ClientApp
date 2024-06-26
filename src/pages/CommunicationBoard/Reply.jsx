import React, { useState } from "react";
import {
  Typography,
  Paper,
  IconButton,
  Box,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import staticInitObject from "../../config/AllStaticConfig.js";
import { gql, GraphQLClient } from "graphql-request";

// GraphQL API endpoint
const graphqlAPI = staticInitObject.APIGATEWAY_SERVER_URL;

// GraphQL mutation to delete a reply
const DELETE_REPLY_MUTATION = gql`
  mutation DeleteReply($id: ID!) {
    deleteReply(id: $id)
  }
`;

const Reply = ({ id, content, userName, createdAt, fetchReplies }) => {
  const [open, setOpen] = useState(false); // state to show/hide dialog

  // Check if the current user can delete the reply
  const currentUser = localStorage.getItem("username");
  const currentUserPrivilege = localStorage.getItem("privilege");
  const canDelete =
    currentUser === userName || currentUserPrivilege === "manager";

  const token = localStorage.getItem("token");
  const headers = {
    authorization: token,
  };
  const client = new GraphQLClient(graphqlAPI, { headers });

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle reply deletion
  const handleDelete = async () => {
    try {
      await client.request(DELETE_REPLY_MUTATION, { id });
      // Refetch replies after deletion
      await fetchReplies();
      handleClose();
    } catch (error) {
      console.error("Error deleting reply:", error);
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
    >
      {/* Render the delete button if the current user can delete the reply */}
      {canDelete && (
        <IconButton
          onClick={handleDeleteClick}
          sx={{ position: "absolute", top: -4, right: -4 }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
        <Avatar sx={{ marginRight: 2 }}>{userName.charAt(0)}</Avatar>
        <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
          {content}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" sx={{ marginTop: 1 }}>
        <Typography variant="overline">{`${new Date(
          createdAt
        ).toLocaleString()}`}</Typography>
        <Typography variant="subtitle2">{`Replied by: ${userName}`}</Typography>
      </Box>
      {/* Dialog to confirm reply deletion */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this reply? This action cannot be
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

export default Reply;
