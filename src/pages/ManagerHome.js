import React from "react";
import bookingManagerIcon from "../assets/bookingManager.png";
import commBoardIcon from "../assets/commBoard.png";
import managerToolsIcon from "../assets/managerTools.png";
import marketPlaceManagerIcon from "../assets/marketPlaceManager.png";
import ResidentMeLogo from "../assets/logo.png";

import styled from '@emotion/styled';
import { Link } from "react-router-dom";

const StyledServiceLink = styled(Link)`
  text-align: center;
  padding: 1rem;
  text-decoration: none;
  color: black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: ${({ bgColor }) => bgColor};
  width: calc(50% - 40px);
  margin: 20px 0;
  padding: 40px;
  font-size: 1.2rem;
  min-height: 200px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  width: 100%;
  background-color: #f2efea;
  color: #746352;
`;

const Logo = styled.img`
  height: 80px;
`;

const AppName = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 15px;
`;

const Greeting = styled.h2`
  font-size: 1.5rem;
  font-weight: normal;
  margin-right: 15px;
  flex: 1;
  text-align: right;
`;

const ServiceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
  max-width: 1200px;
  margin: auto;
  padding: 0 20px;
`;

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
    text: "Register staff",
    link: "/staff-register",
    altText: "Register staff",
    bgColor: "#f3a4a4", // Soft Red Background
  },
];

const ManagerHome = () => {
  return (
    <Container>
      <Header>
        <Logo src={ResidentMeLogo} alt="ResidentMe Logo" />
        <AppName>ResidentMe</AppName>
        <Greeting>Welcome, Manager</Greeting>
      </Header>
      <ServiceContainer>
        {services.map((service, index) => (
          <StyledServiceLink to={service.link} key={index} bgColor={service.bgColor}>
            <div>
              <img src={service.icon} alt={service.altText} style={{ width: '80px', height: '80px', marginBottom: '16px' }} />
            </div>
            <div>{service.text}</div>
          </StyledServiceLink>
        ))}
      </ServiceContainer>
    </Container>
  );
};

export default ManagerHome;
