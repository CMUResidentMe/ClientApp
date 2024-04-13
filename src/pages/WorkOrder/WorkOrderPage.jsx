import * as React from 'react';
import Box from '@mui/material/Box';
import WorkOrderTable from './WorkOrderTable.jsx';
import WorkOrderForm from './WorkOrderForm.jsx';
import NotificationBar from '../Notification/NotificationBar.jsx';
import styles from './WorkOrderCSS.jsx';
import { socketManager } from "../../notification/socketManager.js";
import workOrderListen from '../../notification/workOrderListener.js';

socketManager.connect(localStorage.getItem('token'));

const WorkOrderPage = () => {
  const [notiCnt, setNotiCnt] = React.useState(0);
  const [notifications, setNotifications] = React.useState([]);

  const workorderUpdateCB = (event) => {
    setNotiCnt(notiCnt + 1);
    setNotifications([...notifications, event]);
  };
  
  const workorderimageChangedCB = (event) => {
    setNotiCnt(notiCnt + 1);
  };
  
  workOrderListen(workorderUpdateCB, workorderimageChangedCB);

  return (
    <div style={styles.container}>
      <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(1, 1fr)', gridAutoFlow: 'row', gap: 5,}}>
        <h1 style={styles.heading}>Work Order</h1>
        <WorkOrderTable privilege={localStorage.getItem("privilege")} message={notiCnt}/>
        <WorkOrderForm privilege={localStorage.getItem("privilege")} />
        <NotificationBar notifications={notifications}/>
      </Box>  
    </div>
  );
};

export default WorkOrderPage;