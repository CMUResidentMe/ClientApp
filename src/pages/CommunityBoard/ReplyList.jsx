import React, { useState, useEffect, useCallback } from "react";
import { gql, request } from "graphql-request";
import Reply from "./Reply.jsx";
import { Button, Box } from "@mui/material";
import staticInitObject from "../../config/AllStaticConfig.js";

// Adjusted to be smaller than thread and post action buttons
const actionButtonStyle = {
  backgroundColor: "#746352",
  color: "white",
  padding: "0.3rem 0.75rem",
  fontSize: "0.75rem",
  border: "none",
  borderRadius: "3px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#5a4938",
  },
};

const graphqlAPI = staticInitObject.APIGATEWAY_SERVER_URL;

const GET_REPLIES_QUERY = gql`
  query GetRepliesByPost($postId: ID!, $pageNum: Int!, $pageSize: Int!) {
    repliesByPost(postId: $postId, pageNum: $pageNum, pageSize: $pageSize) {
      id
      content
      userId
      userName
      createdAt
    }
  }
`;

const ReplyList = ({ postId, setRefetchReplies }) => {
  const [replies, setReplies] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const [hasMore, setHasMore] = useState(true);

  const fetchReplies = useCallback(async () => {
    if (!postId) return;
    try {
      const { repliesByPost } = await request(graphqlAPI, GET_REPLIES_QUERY, {
        postId,
        pageNum: page,
        pageSize,
      });
      setReplies((prev) =>
        page === 0 ? repliesByPost : [...prev, ...repliesByPost]
      );
      setHasMore(repliesByPost.length === pageSize);
    } catch (error) {
      console.error("Error fetching replies:", error);
      setHasMore(false);
    }
  }, [postId, page, pageSize]);

  useEffect(() => {
    fetchReplies();
  }, [fetchReplies]);

  useEffect(() => {
    setRefetchReplies(() => fetchReplies);
  }, [fetchReplies, setRefetchReplies]);

  if (replies.length === 0) {
    return null;
  }

  return (
    <Box>
      {replies.map((reply) => (
        <Reply key={reply.id} {...reply} fetchReplies={fetchReplies} />
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginY: 2,
        }}
      >
        {hasMore && (
          <Button
            sx={actionButtonStyle}
            variant="contained"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Load More
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ReplyList;
