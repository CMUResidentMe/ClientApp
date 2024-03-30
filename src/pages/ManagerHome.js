import React from "react";
import { Link } from "react-router-dom";
import bookingManagerIcon from "../assets/bookingManager.png";
import commBoardIcon from "../assets/commBoard.png";
import managerToolsIcon from "../assets/managerTools.png";
import marketPlaceManagerIcon from "../assets/marketPlaceManager.png";
import ResidentMeLogo from "../assets/logo.png";

const ManagerHome = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={ResidentMeLogo} style={styles.logo} alt="ResidentMe Logo" />
        <h1 style={styles.appName}>ResidentMe</h1>
        <h2 style={styles.greeting}>Welcome, Manager</h2>
      </div>

      <div style={styles.serviceContainer}>
        {services.map((service, index) => (
          <Link to={service.link} style={styles.service} key={index}>
            <div style={styles.iconContainer}>
              <img
                src={service.icon}
                style={styles.icon}
                alt={service.altText}
              />
            </div>
            <div style={styles.serviceText}>{service.text}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const services = [
  {
    icon: bookingManagerIcon,
    text: "Room Booking",
    link: "/booking-manager",
    altText: "Manage Room Booking",
    bgColor: "#cce8e4", // Soft Teal Background
  },
  {
    icon: commBoardIcon,
    text: "Community Board",
    link: "/community-board",
    altText: "Community Board",
    bgColor: "#f3d9a4", // Soft Yellow Background
  },
  {
    icon: marketPlaceManagerIcon,
    text: "Marketplace",
    link: "/marketplace",
    altText: "Marketplace Manager",
    bgColor: "#a4d4f3", // Soft Blue Background
  },
  {
    icon: managerToolsIcon,
    text: "Work Orders",
    link: "/work-order",
    altText: "Work Orders",
    bgColor: "#f3a4a4", // Soft Red Background
  },
];

// Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5", // Light gray background for the whole page
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "20px",
    width: "100%",
    backgroundColor: "#f2efea",
    color: "#746352",
  },
  logo: {
    height: "80px",
  },
  appName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginLeft: "15px",
  },
  greeting: {
    fontSize: "1.5rem",
    fontWeight: "normal",
    marginRight: "15px",
    flex: 1,
    textAlign: "right",
  },
  serviceContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between", // This spreads out the cards to use the available space
    gap: "40px", // This adds space between the rows and columns
    maxWidth: "1200px", // Controls the maximum width of the service container
    margin: "auto", // Centers the container in the parent
    padding: "0 20px", // Add horizontal padding if needed
  },
  service: {
    textAlign: "center",
    padding: "1rem",
    textDecoration: "none",
    color: "black",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    backgroundColor: "#fff", // White background for each service card
    width: "calc(50% - 40px)", // Take up half of the container width minus half of total gap
    margin: "20px 0", // Add vertical margin
    padding: "40px", // Increase padding inside the service cards
    fontSize: "1.2rem", // Increase font size for the service text if needed
    // Increase the size of the icons if they are background-images
    backgroundSize: "80px 80px", // Or set appropriate size
    backgroundPosition: "center 20px", // Or set appropriate position
    minHeight: "200px", // Or set to a height that looks good with your content
    boxSizing: "border-box", // Make sure padding doesn't affect the total width
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.2s ease-in-out",
    ":hover": {
      transform: "scale(1.05)", // Slightly enlarge the card on hover
    },
  },
  icon: {
    width: "80px", // Increased size of the icon
    height: "80px", // Maintain aspect ratio if square
    marginBottom: "16px", // Space between icon and service title
  },
  serviceText: {
    fontSize: "1rem",
    fontWeight: "600",
  },
};

export default ManagerHome;
