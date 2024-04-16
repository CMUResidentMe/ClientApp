import * as React from 'react';
import { Box, Tab, Grid, Container, IconButton } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { MenuBookOutlined } from '@mui/icons-material';
import { gql } from '@apollo/client';
import WorkOrderTable from './WorkOrderTable.jsx';
import WorkOrderForm from './WorkOrderForm.jsx';
import NotificationBar from '../Notification/NotificationBar.jsx';
import styles from './WorkOrderCSS.jsx';
import { socketManager } from "../../notification/socketManager.js";
import workOrderListen from '../../notification/workOrderListener.js';
import { PrivilegeType } from '../../data/userData.js';
import Navbar from '../../components/NavBar.js';

const queryWKsByAssignedStaff = gql`
query workOrdersByAssignedStaff {
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

const queryWorkOrdersUnassined = gql`
query workOrdersUnassined {
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

const StaffWKPage = () => {
  const [notiCnt, setNotiCnt] = React.useState(0);
  const [notifications, setNotifications] = React.useState([]);
  const [staffTabvalue, setStaffTabvalue] = React.useState('1');
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  //selected workOrder
  const [currentAssignedWK, setCurrentAssignedWK] = React.useState(undefined);
  const [currentUnsssignedWK, setCurrentUnsssignedWK] = React.useState(undefined);

  const workorderUpdateCB = (event) => {
    setNotiCnt(notiCnt + 1);
    setNotifications([...notifications, event]);
  };
  
  const workorderimageChangedCB = (event) => {
    setNotiCnt(notiCnt + 1);
  };
  
  workOrderListen(workorderUpdateCB, workorderimageChangedCB);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleStaffTabChange = (e, newValue) =>{
    setStaffTabvalue(newValue);
  }

  const staffPage = () => {
    return(
      <Box sx={{ flexGrow: 1 }}>
        <TabContext value={staffTabvalue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleStaffTabChange} aria-label="lab API tabs example">
              <Tab label="Assigned to Me" value="1" />
              <Tab label="Unassigned" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container>
              <Grid item xs={6}>
                <WorkOrderTable graphQLStr={queryWKsByAssignedStaff}/>
              </Grid>
              <Grid item xs={6}>
                <WorkOrderForm />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
          <Grid container>
              <Grid item xs={6}>
                <WorkOrderTable graphQLStr={queryWorkOrdersUnassined}/>
              </Grid>
              <Grid item xs={6}>
                <WorkOrderForm />
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>);
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
      </Container>
      <Grid container>
          <Grid item xs={12}>
            {staffPage()}
          </Grid>
          <Grid item xs={12}>
            <NotificationBar notifications={notifications}/>
          </Grid>
      </Grid>
    </div>
  );
};

export default StaffWKPage;