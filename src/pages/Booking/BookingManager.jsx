import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';
import { AddBox, Delete, CheckCircle, Cancel } from "@mui/icons-material";
import Navbar from "../../components/NavBar.js";
import styled from "@emotion/styled";
import { GraphQLClient, gql } from "graphql-request";
import staticInitObject from "../../config/AllStaticConfig.js";
import { useNavigate } from "react-router-dom";
// Kafka
import { socketManager } from "../../notification/socketManager.js";

const graphqlAPI = staticInitObject.APIGATEWAY_SERVER_URL;
const token = localStorage.getItem("token");
const headers = {
  authorization: token,
};
const client = new GraphQLClient(graphqlAPI, { headers });

const HeaderHeight = "60px";

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  height: ${HeaderHeight};
  background-color: #f2efea;
  color: #746352;
  z-index: 1000;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - ${HeaderHeight});
  padding-top: ${HeaderHeight};
  width: 100%;
  padding-top: 120px;
`;
const RightIconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

// GraphQL Queries and Mutations
const GET_ALL_ROOMS_QUERY = gql`
  query GetAllRooms {
    allRooms {
      id
      name
      room_type
    }
  }
`;

const DELETE_ROOM_MUTATION = gql`
  mutation DeleteRoom($room_id: ID!) {
    deleteRoom(room_id: $room_id)
  }
`;

const GET_UNCONFIRMED_PARTY_ROOMS = gql`
  query GetUnconfirmedPartyRooms {
    unconfirmedPartyRooms {
      id
      name
      room_type
      bookedTimes {
        date
        startTime
        id
        endTime
        user_id
        user_name
        is_confirmed
      }
    }
  }
`;

const APPROVE_BOOKING_MUTATION = gql`
  mutation ApproveBooking($booking_id: ID!) {
    approveBooking(booking_id: $booking_id) {
      id
    }
  }
`;

const DECLINE_BOOKING_MUTATION = gql`
  mutation DeclineBooking($booking_id: ID!) {
    declineBooking(booking_id: $booking_id) {
      id
    }
  }
`;

const ManagerPage = () => {
  const [rooms, setRooms] = useState([]);
  const [partyRooms, setPartyRooms] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Connect to WebSocket
    socketManager.connect(token);
    // Set up notification listeners
    socketManager.getIo().on("BookingApproved", (notification) => {
      console.log("Booking approval notification:", notification);
    });
    socketManager.getIo().on("BookingDeclined", (notification) => {
      console.log("Booking decline notification:", notification);
    });

    // Fetch initial data
    client
      .request(GET_ALL_ROOMS_QUERY)
      .then((data) => setRooms(data.allRooms))
      .catch((error) => console.error("Error fetching rooms:", error));

    fetchPartyRooms();

    // Clean up on unmount
    return () => {
      socketManager.disconnect();
      socketManager.getIo().off("BookingApproved");
      socketManager.getIo().off("BookingDeclined");
    };
  }, [refreshData]);

  const fetchPartyRooms = () => {
    client
      .request(GET_UNCONFIRMED_PARTY_ROOMS)
      .then((data) => {
        const filteredRooms = data.unconfirmedPartyRooms.map((room) => ({
          ...room,
          bookedTimes: room.bookedTimes.filter((bt) => !bt.is_confirmed),
        }));
        setPartyRooms(filteredRooms);
        console.log("Unconfirmed party rooms fetched", filteredRooms);
      })
      .catch((error) =>
        console.error("Error fetching unconfirmed party rooms:", error)
      );
  };

  const handleDeleteRoom = (room_id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      client
        .request(DELETE_ROOM_MUTATION, { room_id })
        .then(() => {
          alert("Room deleted successfully.");
          setRooms((prev) => prev.filter((room) => room.id !== room_id));
        })
        .catch((error) => alert("Failed to delete room. Please try again."));
    }
  };

  const handleApprove = (booking_id) => {
    console.log("Approving booking with ID:", booking_id);
    client
      .request(APPROVE_BOOKING_MUTATION, { booking_id })
      .then(() => {
        alert("Booking approved successfully.");
        setRefreshData((old) => !old);
        setPartyRooms((prev) =>
          prev.filter((room) =>
            room.bookedTimes.some((bt) => bt.id !== booking_id)
          )
        );
      })
      .catch((error) => {
        console.error("Approval error:", error);
        alert("Failed to approve booking.");
      });
  };

  const handleDecline = (booking_id) => {
    client
      .request(DECLINE_BOOKING_MUTATION, { booking_id })
      .then(() => {
        alert("Booking declined successfully.");
        setRefreshData((old) => !old);
        setPartyRooms((prev) =>
          prev.filter((room) =>
            room.bookedTimes.some((bt) => bt.id !== booking_id)
          )
        );
      })
      .catch((error) => alert("Failed to decline booking."));
  };
  const handleBackManager = () => navigate("/manager-home");

  return (
    <>
      <Header>
        <Navbar />
        <Typography variant="h4" sx={{ ml: 2 }}>
          Manager Dashboard
        </Typography>
        <RightIconsContainer>
          <IconButton onClick={handleBackManager}>
            <HomeIcon />
          </IconButton>
        </RightIconsContainer>
      </Header>
      <ContentContainer>
        <Container maxWidth="lg">
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Delete Rooms
          </Typography>
          <List>
            {rooms.map((room) => (
              <ListItem key={room.id}>
                <ListItemText primary={room.name} secondary={room.room_type} />
                <IconButton
                  onClick={() => handleDeleteRoom(room.id)}
                  edge="end"
                  aria-label="delete"
                >
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Approve or Decline Party Room Booking Requests
          </Typography>
          <List>
            {partyRooms.flatMap((room) =>
              room.bookedTimes.map((booking) => (
                <ListItem key={`${room.id}-${booking.id}`}>
                  {" "}
                  <ListItemText
                    primary={`${room.name} - ${room.room_type}`}
                    secondary={`${booking.date} from ${booking.startTime} to ${booking.endTime}, booked by ${booking.user_name}`}
                  />
                  <IconButton
                    onClick={() => handleApprove(booking.id)}
                    color="primary"
                  >
                    <CheckCircle />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDecline(booking.id)}
                    color="secondary"
                  >
                    <Cancel />
                  </IconButton>
                </ListItem>
              ))
            )}
          </List>
        </Container>
      </ContentContainer>
    </>
  );
};

export default ManagerPage;
