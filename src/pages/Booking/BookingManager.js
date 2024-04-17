import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { AddBox, Cancel, CheckCircle } from "@mui/icons-material";
import Navbar from "../../components/NavBar.js";

const ManagerPage = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [roomDetails, setRoomDetails] = useState({
    name: "",
    type: "",
    description: "",
    capacity: "",
  });
  const [cancelReason, setCancelReason] = useState("");

  const bookings = [
    {
      id: 1,
      roomName: "Party Room",
      roomType: "Party",
      date: "2023-10-05",
      startTime: "15:00",
      endTime: "18:00",
      status: "Pending",
    },
    {
      id: 2,
      roomName: "Study Room",
      roomType: "Study",
      date: "2023-10-06",
      startTime: "09:00",
      endTime: "12:00",
      status: "Pending",
    },
  ];

  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleOpenCancel = (id) => {
    setOpenCancel(true);
    setSelectedBookingId(id);
  };
  const handleCloseCancel = () => setOpenCancel(false);
  const handleOpenApprove = (id) => {
    setOpenApprove(true);
    setSelectedBookingId(id);
  };
  const handleCloseApprove = () => setOpenApprove(false);

  const handleCreateRoom = () => {
    console.log("Creating room with details:", roomDetails);
    handleCloseCreate();
  };

  const handleApproveBooking = () => {
    console.log("Approving booking ID:", selectedBookingId);
    handleCloseApprove();
  };

  const handleCancelBooking = () => {
    console.log(
      "Cancelling booking ID:",
      selectedBookingId,
      "with reason:",
      cancelReason
    );
    handleCloseCancel();
  };

  const renderBookingList = () =>
    bookings.map((booking) => (
      <ListItem
        key={booking.id}
        secondaryAction={
          <>
            {booking.roomType === "Party" && booking.status === "Pending" && (
              <IconButton
                edge="end"
                aria-label="approve"
                onClick={() => handleOpenApprove(booking.id)}
              >
                <CheckCircle />
              </IconButton>
            )}
            <IconButton
              edge="end"
              aria-label="cancel"
              onClick={() => handleOpenCancel(booking.id)}
            >
              <Cancel />
            </IconButton>
          </>
        }
      >
        <ListItemText
          primary={`${booking.roomName} on ${booking.date} from ${booking.startTime} to ${booking.endTime}`}
          secondary={`Status: ${booking.status}`}
        />
      </ListItem>
    ));

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
          Manager Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddBox />}
          onClick={handleOpenCreate}
          sx={{ mb: 2 }}
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
                setRoomDetails({ ...roomDetails, type: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) =>
                setRoomDetails({ ...roomDetails, description: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Capacity"
              type="number"
              fullWidth
              variant="standard"
              onChange={(e) =>
                setRoomDetails({ ...roomDetails, capacity: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCreate}>Cancel</Button>
            <Button onClick={handleCreateRoom}>Create</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openCancel} onClose={handleCloseCancel}>
          <DialogTitle>Cancel Booking</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the reason for cancellation.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Cancellation Reason"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setCancelReason(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCancel}>Close</Button>
            <Button onClick={handleCancelBooking}>Submit</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openApprove} onClose={handleCloseApprove}>
          <DialogTitle>Approve Booking</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to approve this booking?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseApprove}>No</Button>
            <Button onClick={handleApproveBooking}>Yes</Button>
          </DialogActions>
        </Dialog>
        <List>{renderBookingList()}</List>
      </Container>
    </div>
  );
};

export default ManagerPage;
