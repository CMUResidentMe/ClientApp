import React, { useState } from "react";
import { IconButton, Badge } from "@mui/material";
import {
  ArrowBack,
  Notifications,
  Menu as MenuIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import Navbar from "../../components/NavBar.js";
import ThreadList from "./ThreadList.jsx";
import PostList from "./PostList.jsx";
import NotificationsIcon from "@mui/icons-material/Notifications.js";
import NotificationTable from "../Notification/NotificationTable.jsx";
import useNotificationListener from "../../notification/NotificationListener.js";
import ResidentMeLogo from "../../assets/logo.png";

const HeaderHeight = "100px";

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  padding-left: 14%;
  padding-right: 14%;
  height: ${HeaderHeight}; // Fixed height
  background-color: #f2efea;
  color: #746352;
  z-index: 1000; // High z-index to ensure it stays on top
`;

const LeftIconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

const RightIconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BackButtonContainer = styled.div`
  width: 85%;
  display: flex;
  justify-content: flex-start; // Aligns the button to the left
  position: relative;
  z-index: 10000;
  padding-top: 8rem;
`;

const ContentContainer = styled.div`
  padding-top: calc(
    ${HeaderHeight} + 60px
  ); // Adjusted padding-top to add some space below the fixed header
  padding-bottom: 20px; // Give some padding at the bottom
  overflow: auto; // Scrollable content
  margin: 0 auto; // Center the container if necessary
  max-width: 1200px; // Max width for large screens, adjust as needed
  width: 100%; // Full width on small screens
  box-sizing: border-box; // Include padding in the element's total width and height
`;

const NotificationTableWrapper = styled.div`
  display: flex;
  justify-content: center; // Center horizontally
  align-items: center; // Center vertically
  flex-direction: column; // Stack children vertically
  width: 100%; // Take the full width of the container
  height: 100%; // Take the full height available
`;

const Logo = styled.img`
  height: 80px;
  margin-right: 10px;
`;

const AppName = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 15px;
`;

const CommunicationBoardPage = () => {
  const [view, setView] = useState("threads"); // Initial view to show threads
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [currentThreadId, setCurrentThread] = useState(null);
  const [currentThreadTitle, setCurrentThreadTitle] = useState("");
  const [currentThreadContent, setCurrentThreadContent] = useState("");
  const [currentThreadUserName, setCurrentThreadUserName] = useState("");
  const [currentThreadCreatedAt, setCurrentThreadCreatedAt] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const handleThreadSelect = (id, title, content, userName, createdAt) => {
    setCurrentThread(id);
    setCurrentThreadTitle(title);
    setCurrentThreadContent(content);
    setCurrentThreadUserName(userName);
    setCurrentThreadCreatedAt(createdAt);
    setView("posts");
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const commBoardUpdateCB = (event) => {
    console.log("Received notification:", event);
    setNotifications((prevNotifications) => [...prevNotifications, event]);
    setNotificationCount((prevCount) => prevCount + 1);
  };

  useNotificationListener(commBoardUpdateCB);

  const handleNotificationClick = () => {
    setView("notifications");
    setNotificationCount(0);
  };

  const handleBack = () => {
    setView("threads"); // Return to 'threads' view from any other view
    setCurrentThread(null);
    setCurrentThreadTitle("");
    setCurrentThreadContent("");
    setCurrentThreadUserName("");
    setCurrentThreadCreatedAt("");
  };

  // Rendering the corresponding content based on the current view
  const renderContent = () => {
    switch (view) {
      case "notifications":
        return <NotificationTableWrapper><NotificationTable notifications={notifications} /></NotificationTableWrapper>; // Component to render list of notifications
      case "posts":
        return (
          <PostList
            threadId={currentThreadId}
            threadTitle={currentThreadTitle}
            threadContent={currentThreadContent}
            threadUserName={currentThreadUserName}
            threadCreatedAt={currentThreadCreatedAt}
          /> // Component to render list of posts
        );
      case "threads":
      default:
        return <ThreadList onThreadSelect={handleThreadSelect} />; // Component to render list of threads
    }
  };

  return (
    <>
      <Header>
        <LeftIconsContainer>
          <Logo src={ResidentMeLogo} alt="ResidentMe Logo" />
        </LeftIconsContainer>

        <CenterContainer>
          <AppName>Communication Board</AppName>
        </CenterContainer>

        <RightIconsContainer>
          <IconButton onClick={handleNotificationClick}>
            <Badge badgeContent={notificationCount} color="warning">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </RightIconsContainer>
      </Header>
      <Navbar
        isDrawerOpen={isDrawerOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <ContentContainer>
        {(view === "posts" || view === "notifications") && (
          <IconButton
            onClick={handleBack}
            sx={{ position: "absolute", top: 110, left: 30 }}
          >
            <ArrowBack />
          </IconButton>
        )}
        {renderContent()}
      </ContentContainer>
    </>
  );
};

export default CommunicationBoardPage;
