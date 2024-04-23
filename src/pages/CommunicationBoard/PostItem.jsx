import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import InputArea from "./InputArea.jsx";
import ReplyList from "./ReplyList.jsx";
import staticInitObject from "../../config/AllStaticConfig.js";
import { gql, GraphQLClient } from "graphql-request";

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

// GraphQL API endpoint
const graphqlAPI = staticInitObject.APIGATEWAY_SERVER_URL;
const token = localStorage.getItem("token");
const headers = {
  authorization: token,
};
const client = new GraphQLClient(graphqlAPI, { headers });

// GraphQL mutation to create a reply
const CREATE_REPLY_MUTATION = gql`
  mutation CreateReply($postId: ID!, $content: String!) {
    createReply(postId: $postId, content: $content) {
      id
      content
      userId
      userName
      createdAt
    }
  }
`;

// GraphQL mutation to delete a post
const DELETE_POST_MUTATION = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

const PostItem = ({ id, content, userId, userName, createdAt, fetchPosts }) => {
  const [showReplyInput, setShowReplyInput] = useState(false); // state to show/hide reply input
  const [refetchReplies, setRefetchReplies] = useState(() => () => {}); // state to refetch replies
  const [open, setOpen] = useState(false); // state to show/hide delete confirmation dialog

  // Check if the current user can delete the post
  const currentUser = localStorage.getItem("username");
  const currentUserPrivilege = localStorage.getItem("privilege");
  const canDelete =
    currentUser === userName || currentUserPrivilege === "manager";

  const handleDeleteClick = (e) => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  // Function to handle post deletion
  const handleDelete = async () => {
    try {
      await client.request(DELETE_POST_MUTATION, { id });
      // Refetch posts after deletion
      await fetchPosts();
      handleClose();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Function to handle reply creation
  const handleCreateReply = async ({ content }) => {
    try {
      await client.request(CREATE_REPLY_MUTATION, {
        postId: id,
        content,
      });
      // Refetch replies after creation
      refetchReplies();
      setShowReplyInput(false);
    } catch (error) {
      console.error("Error creating reply:", error);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        padding: 2,
        marginY: 1,
        position: "relative",
        border: "1px solid #cccccc",
      }}
    >
      {/*Render the delete button only if the current user can delete the post*/}
      {canDelete && (
        <IconButton
          onClick={handleDeleteClick}
          sx={{ position: "absolute", top: -4, right: -4 }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          <Avatar sx={{ marginRight: 2 }}>{userName.charAt(0)}</Avatar>
          <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
            {content}
          </Typography>
        </Box>
        <Button
          sx={{ marginLeft: "auto", marginRight: 1 }}
          onClick={() => setShowReplyInput((prev) => !prev)}
        >
          Reply
        </Button>
      </Box>
      {/* Render the reply input area only if the user clicks the reply button */}
      {showReplyInput && (
        <InputArea
          sx={actionButtonStyle}
          type="reply"
          onSubmit={handleCreateReply}
        />
      )}
      <Box display="flex" justifyContent="space-between" sx={{ marginTop: 1 }}>
        <Typography variant="overline">{`${new Date(
          createdAt
        ).toLocaleString()}`}</Typography>
        <Typography variant="subtitle2">{`Posted by: ${userName}`}</Typography>
      </Box>
      <ReplyList postId={id} setRefetchReplies={setRefetchReplies} />
      {/* Render the delete confirmation dialog only if the user clicks the delete button */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post? This action cannot be
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

export default PostItem;
