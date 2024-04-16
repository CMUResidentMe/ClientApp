import React, { useEffect } from 'react';
import { Box, Grid, Container, IconButton, Slide, Typography } from '@mui/material';
import { MenuBookOutlined } from '@mui/icons-material';
import { gql } from '@apollo/client';
import WorkOrderTable from './WorkOrderTable.jsx';
import WorkOrderForm from './WorkOrderForm.jsx';
import WorkOrderNewForm from './WorkOrderNewForm.jsx';
import NotificationBar from '../Notification/NotificationBar.jsx';
import styles from './WorkOrderCSS.jsx';
import { socketManager } from "../../notification/socketManager.js";
import workOrderListen from '../../notification/workOrderListener.js';
import Navbar from '../../components/NavBar.js';

const queryWorkOrdersByOwner = gql`
query workOrdersByOwner {
  workOrdersByOwner{
    uuid
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
  const [checked, setChecked] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  //selected workOrder
  const [currentWK, setCurrentWK] = React.useState(undefined);

  useEffect(() => {
    setChecked(true);
  }, []);

  const workorderUpdateCB = (event) => {
    setNotifications([...notifications, event]);
  };
  
  workOrderListen(workorderUpdateCB);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const residentPage = () => {
    return(
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Grid container>
          <Grid item xs={6}>
            <WorkOrderTable graphQLStr={queryWorkOrdersByOwner} setCurrentWK={setCurrentWK} />
          </Grid>
          <Grid item xs={6}>
            {currentWK && <WorkOrderForm currentWK={currentWK} />}
            {currentWK === undefined && <WorkOrderNewForm />}
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <div style={styles.container}>
      <Container maxWidth="lg" sx={{ boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)', backgroundColor: 'rgba(255, 255, 255, 0.85)', paddingTop: '1rem', paddingBottom: '2rem', paddingLeft: '2rem', paddingRight: '2rem', borderRadius: '8px' }}>
          <Box display="flex" justifyContent="flex-end" sx={{ marginBottom: '0.5rem' }}>
            <IconButton color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ margin: 1 }}>
              <MenuBookOutlined />
            </IconButton>
          </Box>
          <Navbar isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
          <Box sx={{ color: '#2B1B17' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'Merriweather, serif', fontWeight: 'bold', marginTop: '0' }}>
              Welcome to WorkOrder
            </Typography>
          </Box>
        </Slide>
      </Container>
      <Grid container>
          <Grid item xs={12}>
            {residentPage()}
          </Grid>
          <Grid item xs={12}>
            <NotificationBar notifications={notifications}/>
          </Grid>
      </Grid>
    </div>
  );
};

export default ResidentWKPage;