import React, { useState } from "react";
import { Container, Box, IconButton, Typography } from "@mui/material";
import { MenuBookOutlined } from "@mui/icons-material";
import Navbar from "../../components/NavBar.js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import calendar styles

import partyRoomImage from "../../assets/partyroom.jpeg";
import studyRoomImage from "../../assets/studyroom.png";
import hangoutRoomImage from "../../assets/hangoutroom.jpeg";
import ResidentMeLogo from "../../assets/logo.png";

const BookingPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [roomType, setRoomType] = useState("");
  const [date, setDate] = useState(new Date());

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const roomOptions = [
    {
      id: 1,
      name: "Party Room",
      image: partyRoomImage,
      description: "A big room perfect for celebrating events with 30+ people.",
    },
    {
      id: 2,
      name: "Study Room",
      image: studyRoomImage,
      description:
        "A quiet space designed for focused studying and concentration.",
    },
    {
      id: 3,
      name: "Hangout Room",
      image: hangoutRoomImage,
      description:
        "A cozy area where you can relax, chat, and hang out with your buddies.",
    },
  ];

  return (
    <div>
      <Navbar
        isDrawerOpen={isDrawerOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ marginBottom: "0.5rem" }}
      >
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ margin: 1 }}
        >
          <MenuBookOutlined />
        </IconButton>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ marginBottom: "1rem" }}
      >
        <img
          src={ResidentMeLogo}
          alt="ResidentMe Logo"
          style={{ height: 50 }}
        />
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          p: 4,
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          marginTop: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
            width: "100%",
            marginBottom: 2,
          }}
        >
          Book Rooms
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          flexDirection="row"
          flexWrap="wrap"
        >
          {roomOptions.map((option) => (
            <Box
              key={option.id}
              sx={{
                width: "30%",
                maxWidth: "300px",
                minHeight: "400px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                textAlign: "center",
                "&:hover": { boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" },
                cursor: "pointer",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                m: 1,
              }}
              onClick={() => setRoomType(option.name)}
            >
              <img
                src={option.image}
                alt={option.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <Typography variant="h6" sx={{ my: 2 }}>
                {option.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{ mx: 2, mb: 2, color: "rgba(0, 0, 0, 0.7)" }}
              >
                {option.description}
              </Typography>
            </Box>
          ))}
        </Box>
        {roomType && (
          <Box sx={{ width: "100%", mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Available Times for {roomType}
            </Typography>
            <Calendar onChange={setDate} value={date} />
            {/* Placeholder to display selected date or available times */}
            <Typography sx={{ mt: 2 }}>
              Selected Date: {date.toDateString()}
            </Typography>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default BookingPage;
