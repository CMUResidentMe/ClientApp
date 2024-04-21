import React, { useState, useEffect, useCallback } from "react";
import { gql, request, GraphQLClient } from "graphql-request";
import ThreadSummary from "./ThreadSummary.js";
import PostItem from "./PostItem.js";
import InputArea from "./InputArea.js";
import { Button, Box } from "@mui/material";
import staticInitObject from "../../config/AllStaticConfig.js";

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
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const [hasMore, setHasMore] = useState(false);

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

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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
      <Box marginTop={5}>
        <InputArea type="post" onSubmit={handleCreatePost} />
      </Box>
    </Box>
  );
};

export default PostList;
