import React, { useState, useEffect, navigate } from "react";
import { GraphQLClient, gql } from "graphql-request";
import {
  Container,
  Box,
  IconButton,
  Typography,
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Badge } from "@mui/material";
import Calendar from "react-calendar";
import Navbar from "../../components/NavBar.js";
import {
  Notifications as NotificationsIcon,
  MenuBookOutlined,
} from "@mui/icons-material";
import { ArrowBack, Menu as MenuIcon } from "@mui/icons-material";
import partyRoomImage from "../../assets/partyroom.jpeg";

import studyRoomImage from "../../assets/studyroom.png";
import hangoutRoomImage from "../../assets/hangoutroom.jpeg";
import ResidentMeLogo from "../../assets/logo.png";
import styled from "@emotion/styled";
import staticInitObject from "../../config/AllStaticConfig.js";
import { useNavigate } from "react-router-dom";

import NotificationTable from "../Notification/NotificationTable.jsx";
import useNotificationListener from "../../notification/NotificationListener.js";
const HeaderHeight = "100px";
const graphqlAPI = staticInitObject.APIGATEWAY_SERVER_URL;
const RightIconsContainer = styled.div`
  display: flex;
  align-items: center;
`;
const NotificationTableWrapper = styled.div`
  display: flex;
  justify-content: center; // Center horizontally
  align-items: center; // Center vertically
  flex-direction: column; // Stack children vertically
  width: 100%; // Take the full width of the container
  height: 100%; // Take the full height available
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
const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  height: 60px;
  background-color: #f2efea;
  color: #746352;
  z-index: 1000;
`;

const Logo = styled.img`
  height: 50px;
`;

const AppName = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 15px;
`;

const GET_ROOMS_BY_TYPE = gql`
  query GetRoomsByType($room_type: String!) {
    roomsByType(room_type: $room_type) {
      id
      name
      room_type
      bookedTimes {
        date
        startTime
        endTime
        user_id
        user_name
        is_confirmed
      }
    }
  }
`;

const CREATE_BOOKING_MUTATION = gql`
  mutation CreateBooking(
    $room_id: ID!
    $date: String!
    $start_time: String!
    $end_time: String!
  ) {
    createBooking(
      room_id: $room_id
      date: $date
      start_time: $start_time
      end_time: $end_time
    ) {
      id
      name
      room_type
      bookedTimes {
        date
        startTime
        endTime
        user_id
        user_name
        is_confirmed
      }
    }
  }
`;

const calculateAvailableTimes = (bookedTimes, selectedDate) => {
  // Ensure we are working with the start of the day for comparison to ignore time part
  const dayStart = new Date(selectedDate.setHours(0, 0, 0, 0));
  const dayEnd = new Date(selectedDate.setHours(23, 59, 59, 999));

  // Correctly format the date for comparison
  const formattedDate = dayStart.toISOString().split("T")[0];
  console.log("Selected Date:", formattedDate);

  let intervals = [
    [new Date(dayStart.setHours(9, 0)), new Date(dayStart.setHours(17, 0))],
  ];

  bookedTimes.forEach(({ date: bookedDate, startTime, endTime }) => {
    if (new Date(bookedDate).toISOString().split("T")[0] === formattedDate) {
      const start = new Date(dayStart);
      start.setHours(...startTime.split(":").map(Number));

      const end = new Date(dayStart);
      end.setHours(...endTime.split(":").map(Number));

      console.log(
        `Booking from ${startTime} to ${endTime} affects availability.`
      );

      intervals = intervals.reduce((acc, [intStart, intEnd]) => {
        if (start >= intEnd || end <= intStart) {
          acc.push([intStart, intEnd]);
        } else {
          if (intStart < start) acc.push([intStart, start]);
          if (end < intEnd) acc.push([end, intEnd]);
        }
        return acc;
      }, []);
    }
  });

  console.log(
    "Available times after processing:",
    intervals.map((interval) =>
      interval
        .map(
          (time) =>
            `${time.getHours()}:${time
              .getMinutes()
              .toString()
              .padStart(2, "0")}`
        )
        .join(" - ")
    )
  );
  return intervals.map(
    ([start, end]) =>
      `${start.getHours()}:${start
        .getMinutes()
        .toString()
        .padStart(2, "0")} - ${end.getHours()}:${end
        .getMinutes()
        .toString()
        .padStart(2, "0")}`
  );
};

const BookingPage = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [roomType, setRoomType] = useState("");
  const [date, setDate] = useState(new Date());
  const [rooms, setRooms] = useState([]);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [view, setView] = useState("bookings");

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };
  const handleBack = () => {
    setView("bookings");
  };
  useEffect(() => {
    if (!roomType) return;

    const token = localStorage.getItem("token");
    const headers = {
      authorization: token,
    };
    const client = new GraphQLClient(graphqlAPI, { headers });

    client
      .request(GET_ROOMS_BY_TYPE, { room_type: roomType })
      .then((data) => {
        const updatedRooms = data.roomsByType.map((room) => ({
          ...room,
          availableTimes: calculateAvailableTimes(room.bookedTimes, date),
        }));
        setRooms(updatedRooms);
      })
      .catch((error) => console.error("Error fetching rooms:", error));
  }, [roomType, date, refreshCounter]);

  const handleCreateBooking = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      authorization: token,
    };
    const client = new GraphQLClient(graphqlAPI, { headers });

    const formattedDate = [
      date.getFullYear(),
      (date.getMonth() + 1).toString().padStart(2, "0"),
      date.getDate().toString().padStart(2, "0"),
    ].join("-");

    try {
      await client.request(CREATE_BOOKING_MUTATION, {
        room_id: selectedRoomId,
        date: formattedDate, // Use the locally formatted date
        start_time: startTime,
        end_time: endTime,
      });
      alert("Booking successful!");
      setBookingDialogOpen(false);
      setRefreshCounter((prev) => prev + 1); // Increment to trigger re-fetch
    } catch (error) {
      console.error("Error creating booking:", error);
      // Check if the error message is about the booking slot being already booked
      if (error.response && error.response.errors) {
        const message = error.response.errors
          .map((err) => err.message)
          .join("; ");
        if (message.includes("The selected time slot is already booked")) {
          alert(
            "This time slot is already booked, please choose another time."
          );
        } else {
          alert("Failed to create booking!");
        }
      } else {
        alert("Failed to create booking!");
      }
    }
  };

  const handleRoomTypeSelection = (type) => {
    const typeMap = {
      "Party Room": "party",
      "Study Room": "study",
      "Hangout Room": "hangout",
    };
    setRoomType(typeMap[type]);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleOpenBookingDialog = (room_id, time) => {
    setSelectedRoomId(room_id);
    const [start, end] = time.split(" - ");
    setStartTime(start);
    setEndTime(end);
    setBookingDialogOpen(true);
  };

  const bookRoomUpdate = (event) => {
    console.log("Received notification:", event);
    setNotifications((prevNotifications) => [...prevNotifications, event]);
    setNotificationCount((prevCount) => prevCount + 1);
  };

  useNotificationListener(bookRoomUpdate);

  const handleBackToBookings = () => {
    setView("bookings");
  };
  const handleNotificationClick = () => {
    setView("notifications");
    setNotificationCount(0);
  };
  const renderContent = () => {
    switch (view) {
      case "notifications":
        return (
          <NotificationTableWrapper>
            <NotificationTable notifications={notifications} />
          </NotificationTableWrapper>
        ); // Component to render list of notifications
      case "bookings":
      default:
        return (
          <Container
            maxWidth="lg"
            sx={{
              marginTop: "120px",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              padding: 4,
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ textAlign: "center", width: "100%", marginBottom: 2 }}
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
              {[
                {
                  name: "Party Room",
                  image: partyRoomImage,
                  description:
                    "A big room perfect for celebrating events with 30+ people.",
                },
                {
                  name: "Study Room",
                  image: studyRoomImage,
                  description:
                    "A quiet space designed for focused studying and concentration.",
                },
                {
                  name: "Hangout Room",
                  image: hangoutRoomImage,
                  description:
                    "A cozy area where you can relax, chat, and hang out with your buddies.",
                },
              ].map((option) => (
                <Box
                  onClick={() => handleRoomTypeSelection(option.name)}
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
                    margin: 1,
                  }}
                >
                  <img
                    src={option.image}
                    alt={option.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
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
                <Calendar onChange={handleDateChange} value={date} />
                <Typography sx={{ mt: 2 }}>
                  Selected Date: {date.toDateString()}
                </Typography>
                {rooms.length > 0 ? (
                  rooms.map((room) => (
                    <div key={room.id}>
                      <Typography variant="h6">{room.name}</Typography>
                      {room.availableTimes.length ? (
                        room.availableTimes.map((time, index) => (
                          <Button
                            key={index}
                            onClick={() =>
                              handleOpenBookingDialog(room.id, time)
                            }
                          >
                            {time} (Book Now)
                          </Button>
                        ))
                      ) : (
                        <Typography>No available times</Typography>
                      )}
                    </div>
                  ))
                ) : (
                  <Typography>No rooms available</Typography>
                )}
              </Box>
            )}
            <Dialog
              open={bookingDialogOpen}
              onClose={() => setBookingDialogOpen(false)}
            >
              <DialogTitle>Book Your Time</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please confirm your booking times within the selected time
                  slot.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="start_time"
                  label="Start Time"
                  type="time"
                  fullWidth
                  variant="standard"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <TextField
                  margin="dense"
                  id="end_time"
                  label="End Time"
                  type="time"
                  fullWidth
                  variant="standard"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setBookingDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() =>
                    handleCreateBooking(selectedRoomId, startTime, endTime)
                  }
                  color="primary"
                >
                  Confirm Booking
                </Button>
              </DialogActions>
            </Dialog>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#F2EFEA",
                color: "black",
                marginTop: 3,
                padding: "10px 30px",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#e0ded4",
                },
              }}
              onClick={() => navigate("/cancel-booking")}
            >
              My Bookings
            </Button>
          </Container>
        );
    }
  };

  return (
    <div>
      <Header>
        <Logo src={ResidentMeLogo} alt="ResidentMe Logo" />
        <AppName>Book Rooms</AppName>
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

        <Navbar
          isDrawerOpen={isDrawerOpen}
          handleDrawerToggle={() => setDrawerOpen(!isDrawerOpen)}
        />
      </Header>
      <ContentContainer>
        {view === "notifications" && (
          <IconButton
            onClick={handleBack}
            sx={{ position: "absolute", top: 110, left: 30 }}
          >
            <ArrowBack />
          </IconButton>
        )}
        {renderContent()}
      </ContentContainer>
    </div>
  );
};

export default BookingPage;
