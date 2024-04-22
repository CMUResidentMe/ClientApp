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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import InputArea from "./InputArea.jsx";
import ReplyList from "./ReplyList.jsx";
import staticInitObject from "../../config/AllStaticConfig.js";
import { gql, GraphQLClient } from "graphql-request";

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

const graphqlAPI = staticInitObject.APIGATEWAY_SERVER_URL;

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

const DELETE_POST_MUTATION = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

const PostItem = ({ id, content, userId, userName, createdAt, fetchPosts }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [refetchReplies, setRefetchReplies] = useState(() => () => {});
  const [open, setOpen] = useState(false);

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

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      authorization: token,
    };
    const client = new GraphQLClient(graphqlAPI, { headers });
    try {
      await client.request(DELETE_POST_MUTATION, { id });
      await fetchPosts();
      handleClose();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleCreateReply = async ({ content }) => {
    const token = localStorage.getItem("token");
    const headers = {
      authorization: token,
    };
    const client = new GraphQLClient(graphqlAPI, { headers });
    try {
      await client.request(CREATE_REPLY_MUTATION, {
        postId: id,
        content,
      });
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
      {canDelete && (
        <IconButton
          onClick={handleDeleteClick}
          sx={{ position: "absolute", top: -4, right: -4 }}
        >
          <FontAwesomeIcon icon={faTimes} />
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
