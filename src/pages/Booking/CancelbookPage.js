import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import { Badge } from "@mui/material";
import styled from "@emotion/styled";
import {
  Notifications as NotificationsIcon,
  MenuBookOutlined,
} from "@mui/icons-material";
import Navbar from "../../components/NavBar.js"; // Custom navigation bar component
import ResidentMeLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { GraphQLClient, gql } from "graphql-request";
import staticInitObject from "../../config/AllStaticConfig.js";

const graphqlAPI = staticInitObject.APIGATEWAY_SERVER_URL; // API endpoint URL

// Styled components for layout and formatting.
const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  padding-left: 14%;
  padding-right: 14%;
  height: 100px;
  background-color: #f2efea;
  color: #746352;
  z-index: 1000;
`;
const CenterContainer = styled.div`
  display: flex;
  flex-grow: 1; // This allows the center container to grow and use available space
  justify-content: center; // Center content within the container
  align-items: center;
`;
const Logo = styled.img`
  height: 80px;
`;

const AppName = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 15px;
`;

const StyledPaper = styled(Paper)`
  margin-bottom: 20px;
  padding: 20px;
`;

// Component definition
const CancelBookingPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]); // State to hold booking data

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token"); // Retrieve auth token.
      const headers = {
        authorization: token,
      };
      const client = new GraphQLClient(graphqlAPI, { headers });

      const query = gql`
        query GetBookingsByUser {
          bookingsByUser {
            date
            startTime
            endTime
            user_name
            user_id
            is_confirmed
            room_id
            booking_id
            room_name
          }
        }
      `; // GraphQL query to fetch bookings.

      try {
        const data = await client.request(query);
        console.log("data", data);
        setBookings(data.bookingsByUser);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const cancelBooking = async (room_id, booking_id) => {
    const token = localStorage.getItem("token");
    const headers = {
      authorization: token,
    };
    const client = new GraphQLClient(graphqlAPI, { headers });

    const mutation = gql`
      mutation CancelBooking($room_id: ID!, $booking_id: ID!) {
        cancelBooking(room_id: $room_id, booking_id: $booking_id) {
          id
        }
      }
    `; // GraphQL mutation to cancel a booking.

    try {
      await client.request(mutation, { room_id, booking_id });
      setBookings(
        bookings.filter((booking) => booking.booking_id !== booking_id)
      ); // Update state to remove the canceled booking.
      alert("Booking canceled successfully");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking");
    }
  };

  return (
    <>
      <Header>
        <Logo src={ResidentMeLogo} alt="ResidentMe Logo" />
        <CenterContainer>
          <AppName>Cancel Booking</AppName>
        </CenterContainer>
      </Header>
      <Container style={{ paddingTop: "140px", marginTop: "100px" }}>
        {" "}
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
            position: "absolute",
            top: "80px",
            left: "20px",
          }}
          onClick={() => navigate("/booking")}
        >
          Go Back to Booking
        </Button>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <StyledPaper key={booking.booking_id} elevation={3}>
              <Typography variant="h6">
                {booking.date} from {booking.startTime} to {booking.endTime} -{" "}
                {booking.room_name}
                {!booking.is_confirmed && (
                  <Typography
                    component="span"
                    style={{ color: "red", marginLeft: "10px" }}
                  >
                    (Pending)
                  </Typography>
                )}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() =>
                  cancelBooking(booking.room_id, booking.booking_id)
                }
              >
                Cancel Booking
              </Button>
            </StyledPaper>
          ))
        ) : (
          <Typography>No bookings found</Typography>
        )}
      </Container>
    </>
  );
};

export default CancelBookingPage;
