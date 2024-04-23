import React, { useState, useEffect, useCallback } from "react";
import { gql, request, GraphQLClient } from "graphql-request";
import ThreadSummary from "./ThreadSummary.jsx";
import PostItem from "./PostItem.jsx";
import InputArea from "./InputArea.jsx";
import { Button, Box, IconButton } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import staticInitObject from "../../config/AllStaticConfig.js";

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

// GraphQL query to get posts by thread
const GET_POSTS_QUERY = gql`
  query GetPostsByThread($threadId: ID!, $pageNum: Int!, $pageSize: Int!) {
    postsByThread(threadId: $threadId, pageNum: $pageNum, pageSize: $pageSize) {
      id
      content
      userId
      userName
      createdAt
    }
  }
`;

// GraphQL mutation to create a post
const CREATE_POST_MUTATION = gql`
  mutation CreatePost($threadId: ID!, $content: String!) {
    createPost(threadId: $threadId, content: $content) {
      id
      content
      userId
      userName
      createdAt
    }
  }
`;

const PostList = ({
  threadId,
  threadTitle,
  threadContent,
  threadUserName,
  threadCreatedAt,
}) => {
  const [posts, setPosts] = useState([]); // state to store posts
  const [page, setPage] = useState(0); // state to store page number
  const pageSize = 10; // number of posts per page
  const [hasMore, setHasMore] = useState(false); // state to store whether there are more posts to fetch

  // Function to fetch posts by thread
  const fetchPosts = useCallback(async () => {
    if (!threadId) return;
    try {
      const { postsByThread } = await request(graphqlAPI, GET_POSTS_QUERY, {
        threadId,
        pageNum: page,
        pageSize,
      });
      setPosts((prev) =>
        page === 0 ? postsByThread : [...prev, ...postsByThread]
      );
      setHasMore(postsByThread.length === pageSize);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setHasMore(false);
    }
  }, [threadId, page, pageSize]);

  // Fetch posts on initial render
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Function to handle post creation
  const handleCreatePost = async ({ content }) => {
    const token = localStorage.getItem("token");
    const headers = {
      authorization: token,
    };
    const client = new GraphQLClient(graphqlAPI, { headers });
    try {
      await client.request(CREATE_POST_MUTATION, {
        threadId,
        content,
      });
      // Refetch posts after creation
      await fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Box>
      <ThreadSummary
        title={threadTitle}
        content={threadContent}
        userName={threadUserName}
        createdAt={threadCreatedAt}
      />
      {/* Render the list of posts */}
      {posts.map((post) => (
        <PostItem key={post.id} {...post} fetchPosts={fetchPosts} />
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginY: 2,
        }}
      >
        {/* Render the 'Load More' button if there are more posts to fetch */}
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
      {/* Render the 'Refresh' button to fetch posts again */}
      <Box mt={2} width="100%" display="flex" justifyContent="center">
        <IconButton color="white" onClick={fetchPosts} aria-label="refresh">
            <RefreshIcon />
        </IconButton>
      </Box>
      <Box marginTop={5}>
        <InputArea type="post" onSubmit={handleCreatePost} />
      </Box>
    </Box>
  );
};

export default PostList;
