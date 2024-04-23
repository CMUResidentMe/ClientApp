import React, { useState, useEffect, useCallback } from "react";
import { gql, request, GraphQLClient } from "graphql-request";
import ThreadItem from "./ThreadItem.jsx";
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
const token = localStorage.getItem("token");
const headers = {
  authorization: token,
};
const client = new GraphQLClient(graphqlAPI, { headers });

// GraphQL query to get threads
const GET_THREADS_QUERY = gql`
  query GetThreads($pageNum: Int!, $pageSize: Int!) {
    threads(pageNum: $pageNum, pageSize: $pageSize) {
      id
      title
      content
      userId
      userName
      createdAt
    }
  }
`;

// GraphQL mutation to create a thread
const CREATE_THREAD_MUTATION = gql`
  mutation CreateThread($title: String!, $content: String!) {
    createThread(title: $title, content: $content) {
      id
      title
      content
      userId
      userName
      createdAt
    }
  }
`;

const ThreadList = ({ onThreadSelect }) => {
  const [threads, setThreads] = useState([]); // state to store threads
  const [page, setPage] = useState(0); // state to store page number
  const pageSize = 10; // number of threads per page
  const [hasMore, setHasMore] = useState(false); // state to check if there are more threads

  // Function to fetch threads
  const fetchThreads = useCallback(async () => {
    try {
      const { threads } = await client.request(GET_THREADS_QUERY, {
        pageNum: page,
        pageSize,
      });

      setThreads((prev) => (page === 0 ? threads : [...prev, ...threads]));
      setHasMore(threads.length === pageSize);
    } catch (error) {
      console.error("Error fetching threads:", error);
      setHasMore(false);
    }
  }, [page, pageSize]);

  // Fetch threads on initial render
  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  // Function to handle thread creation
  const handleCreateThread = async ({ title, content }) => {
    try {
      await client.request(CREATE_THREAD_MUTATION, { title, content });
      await fetchThreads();
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };

  return (
    <Box>
      {/* Render the list of threads */}
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          onThreadSelect={onThreadSelect}
          fetchThreads={fetchThreads}
        />
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginY: 2,
        }}
      >
        {/* Render the 'Load More' button if there are more threads to fetch */}
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
      {/* Refresh button to refetch threads */}
      <Box mt={2} width="100%" display="flex" justifyContent="center">
        <IconButton color="white" onClick={fetchThreads} aria-label="refresh">
            <RefreshIcon />
        </IconButton>
      </Box>
      <Box marginTop={5}>
        <InputArea type="thread" onSubmit={handleCreateThread} />
      </Box>
    </Box>
  );
};

export default ThreadList;
