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
import ResidentMeLogo from "../../assets/logo.png";
// Kafka
import { socketManager } from "../../notification/socketManager.js";
// Configuration for API endpoint
const graphqlAPI = staticInitObject.APIGATEWAY_SERVER_URL;


const HeaderHeight = "60px";

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between; // Ensures that children align to each end and center.
  padding: 20px;
  padding-left: 14%;  // Provides a buffer on the sides
  padding-right: 14%;
  height: 100px;  // Consistent height for larger header area
  background-color: #f2efea;
  color: #746352;
  z-index: 1000;
`;
const Logo = styled.img`
  height: 80px; 
  margin-right: auto; 
`;

const AppName = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  flex-grow: 1; // Allows it to use available space and center the text when possible
  text-align: center; // Centers the text in its flex container
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

// GraphQL queries and mutations
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
  
  const [openCreate, setOpenCreate] = useState(false);
  const [rooms, setRooms] = useState([]);// State to store room data
  const [partyRooms, setPartyRooms] = useState([]);// State for party rooms specifically
  const [refreshData, setRefreshData] = useState(false); // Trigger for refreshing data
  const [roomDetails, setRoomDetails] = useState({
    name: "",
    room_type: "",  
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = {
    authorization: token,
  };
  const client = new GraphQLClient(graphqlAPI, { headers });

  useEffect(() => {
    // Connect to websocket for real-time data
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
  // Handlers for creating, deleting, approving, and declining room bookings
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleCreateRoom = () => {
    console.log("Creating room with details:", roomDetails);
    const { name, room_type } = roomDetails;
    const CREATE_ROOM_MUTATION = gql`
    mutation CreateRoom($name: String!, $room_type: String!) {
      createRoom(name: $name, room_type: $room_type) {
        id
        name
        room_type
      }
    }
  `;
    client.request(CREATE_ROOM_MUTATION, { name, room_type })
    .then(room => {
      console.log("Room created successfully:", room);
      setRefreshData(prev => !prev); // Refresh data to show new room
      handleCloseCreate(); // Close the creation dialog
    })
    .catch(error => {
      console.error("Failed to create room:", error);
    });
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
      <Logo src={ResidentMeLogo} alt="ResidentMe Logo" />
      <AppName>Manager Dashboard</AppName>
        <RightIconsContainer>
          <IconButton onClick={handleBackManager}>
            <HomeIcon />
          </IconButton>
        </RightIconsContainer>
      </Header>
      <ContentContainer>
      <Button
        variant="contained"
        startIcon={<AddBox />}
        onClick={handleOpenCreate}
        sx={{
          mb: 2,
          backgroundColor: '#746352', // Set the button color
          ':hover': {
            backgroundColor: '#5e483e' // Darken the button on hover for better UX
          },
          justifyContent: 'left' 
        }}
      >
        Create New Room
      </Button>
        <Dialog open={openCreate} onClose={handleCloseCreate}>
          <DialogTitle>Create New Room</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter details for the new room.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Room Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) =>
                setRoomDetails({ ...roomDetails, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Room Type"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) =>
                setRoomDetails({ ...roomDetails, room_type: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCreate}>Cancel</Button>
            <Button onClick={handleCreateRoom}>Create</Button>
          </DialogActions>
        </Dialog>
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
