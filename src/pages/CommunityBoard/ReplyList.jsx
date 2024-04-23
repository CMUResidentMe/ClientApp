import React, { useState, useEffect, useCallback } from "react";
import { gql, request } from "graphql-request";
import Reply from "./Reply.jsx";
import { Button, Box } from "@mui/material";
import staticInitObject from "../../config/AllStaticConfig.js";

// Styled components for the header and its children
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

// GraphQL API endpoint
const graphqlAPI = staticInitObject.APIGATEWAY_SERVER_URL;

// GraphQL query to get replies by post
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
  const [replies, setReplies] = useState([]); // state to store replies
  const [page, setPage] = useState(0); // state to store page number
  const pageSize = 10; // number of replies per page
  const [hasMore, setHasMore] = useState(true); // state to check if there are more replies

  // Function to fetch replies by post
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

  // Fetch replies on initial render
  useEffect(() => {
    fetchReplies();
  }, [fetchReplies]);

  // Update refetchReplies function when setRefetchReplies changes
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
        {/* Render the load more button if there are more replies to fetch */}
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
