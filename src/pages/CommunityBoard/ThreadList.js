import React, { useState, useEffect, useCallback } from "react";
import { gql, request, GraphQLClient } from "graphql-request";
import ThreadItem from "./ThreadItem.js";
import InputArea from "./InputArea.js";
import { Button, Box } from "@mui/material";
import staticInitObject from "../../config/AllStaticConfig.js";

const graphqlAPI = staticInitObject.APIGATEWAY_SERVER_URL;

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
  const [threads, setThreads] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const [hasMore, setHasMore] = useState(false);

  const fetchThreads = useCallback(async () => {
    try {
      const { threads } = await request(graphqlAPI, GET_THREADS_QUERY, {
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

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  const handleCreateThread = async ({ title, content }) => {
    const token = localStorage.getItem("token");
    const headers = {
      authorization: token,
    };
    const client = new GraphQLClient(graphqlAPI, { headers });
    try {
      await client.request(CREATE_THREAD_MUTATION, { title, content });
      await fetchThreads();
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };

  return (
    <Box>
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
        <InputArea type="thread" onSubmit={handleCreateThread} />
      </Box>
    </Box>
  );
};

export default ThreadList;
