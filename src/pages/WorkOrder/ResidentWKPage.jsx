import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import styled from '@emotion/styled';
import WorkOrderNewForm from './WorkOrderNewForm.jsx';
import WorkOrderTable from './WorkOrderTable.jsx';
import DehazeIcon from '@mui/icons-material/Dehaze';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Navbar from '../../components/NavBar.js';
import { gql } from '@apollo/client';
import NotificationTable from '../Notification/NotificationTable.jsx';


import newOrderIcon from '../../assets/newWorkOrder.png';
import currentOrdersIcon from '../../assets/currentWorkOrder.png';
import ResidentMeLogo from "../../assets/logo.png";
import { socketManager } from "../../notification/socketManager.js";
import workOrderListen from '../../notification/workOrderListener.js';

const StyledServiceLink = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: black;
  background-color: ${({ bgColor }) => bgColor};
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;


const ServiceContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
  align-items: center;
  margin-top: 100px; // Adjust as needed
`;

const HeaderHeight = '60px';

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  height: ${HeaderHeight}; // Fixed height
  background-color: #f2efea;
  color: #746352;
  z-index: 1000; // High z-index to ensure it stays on top
`;

// const BackButtonHeight = '20px';
const BackButtonContainer = styled.div`
  width: 85%;
  display: flex;
  justify-content: flex-start; // Aligns the button to the left
  position: relative;
  z-index: 10000;
  padding-top: 8rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - ${HeaderHeight});
  background-color: "#f7f7f7";
  padding-top: ${HeaderHeight};
`;

const Logo = styled.img`
  height: 80px;
`;

const AppName = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 15px;
`;

const queryWorkOrdersByOwner = gql`
query workOrdersByOwner {
  workOrdersByOwner{
    uuid
    semanticId
    owner
    workType
    priority
    status
    detail
    assignedStaff
    accessInstruction
    preferredTime
    entryPermission
    images
  }
}
`;

socketManager.connect(localStorage.getItem("token"));

const ResidentWKPage = () => {
  const [view, setView] = useState('landing');
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const [notifications, setNotifications] = React.useState([]);
  const handleSuccessfulSubmission = () => {
    setView('table');
  };

  //selected workOrder
  const [currentWK, setCurrentWK] = React.useState(undefined);

  const workorderUpdateCB = (event) => {
    setNotifications([...notifications, event]);
  };

  workOrderListen(workorderUpdateCB);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleNotificationClick = () => {
    setView('notifications');
  };

  const services = [
    {
      icon: newOrderIcon,
      text: "Create New Work Order",
      bgColor: "#cce8e4",
      onClick: () => setView('new')
    },
    {
      icon: currentOrdersIcon,
      text: "My Current Work Orders",
      bgColor: "#f3d9a4",
      onClick: () => setView('table')
    }
  ];

  const renderContent = () => {
    switch (view) {
      case 'notifications':
        return (
          <>
            <BackButtonContainer>
              <IconButton onClick={() => setView('landing')}>
                <ArrowBack />
              </IconButton>
            </BackButtonContainer>
            <NotificationTable notifications={notifications} />
          </>
        );

      case 'new':
        return (
          <>
            <BackButtonContainer>
              <IconButton onClick={() => setView('landing')}>
                <ArrowBack />
              </IconButton>
            </BackButtonContainer>
            <WorkOrderNewForm onSubmissionSuccess={handleSuccessfulSubmission} />
          </>
        );

      case 'table':
        return (
        <>
          <BackButtonContainer>
            <IconButton onClick={() => setView('landing')}>
              <ArrowBack />
            </IconButton>
          </BackButtonContainer>
          <WorkOrderTable responseName="workOrdersByOwner" graphQLStr={queryWorkOrdersByOwner} setCurrentWK={setCurrentWK} />
        </>);

      default:
        return (
          <ContentContainer>
            <ServiceContainer>
              {services.map((service, index) => (
                <StyledServiceLink key={index} bgColor={service.bgColor} onClick={service.onClick}>
                  <img src={service.icon} alt={service.text} style={{ width: '80px', height: '80px', marginBottom: '16px' }} />
                  <div>{service.text}</div>
                </StyledServiceLink>
              ))}
            </ServiceContainer>
          </ContentContainer>
        );
    }
  };


  return (
    <React.Fragment>
      <Header>
        <Logo src={ResidentMeLogo} alt="ResidentMe Logo"/>
        <AppName>Work Order</AppName>
        <IconButton color="inherit" onClick={handleNotificationClick} sx={{ marginRight: '-480px' }}>
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ margin: '20px' }}>
          <DehazeIcon />
        </IconButton>
        <Navbar isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
      </Header>
      {renderContent()}
    </React.Fragment>
  );
}

export default ResidentWKPage;