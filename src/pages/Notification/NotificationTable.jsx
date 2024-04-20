import React from 'react';
import './Notification.css'
import styled from '@emotion/styled';
import { DataGrid } from '@mui/x-data-grid';
//import { createHash } from 'crypto';

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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  background-color: "#f7f7f7";
  padding-top: 20px;
  width: 90%;
`;

const columns = [
  { field: 'id', headerName: 'ID', width: 0, resizable: false },
  { field: 'changeDescription', headerName: 'Notification Message', width: 900, resizable: false, },
]

const NotificationTable = (props) => {

  function AllNotifications() {
    /*
    {"msgType":"workorderCreated","workOrder":{"uuid":"661836ed9a724618afd79054","owner":"admin",
     "workType":"fix5544","priority":0,"detail":"fix 56 chair","status":"OPEN"}}
    */
    const rows = props.notifications.map(({ msgType, workOrder }) => ({
      id: workOrder.uuid,
      changeDescription: workOrder.changeDescription,
    }));

    return (
      <ContentContainer>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[10]}
          autoHeight
          NoRowsOverlay
          sx={{
            height: '60%',
            width: '70%',
            '& .MuiDataGrid-row': {
              maxHeight: '70px',
            },
            '& .MuiDataGrid-cell': {
              display: 'flex',
              alignItems: 'center', // Vertically center align
              justifyContent: 'center' // Horizontally center align
            },
            '& .MuiDataGrid-columnSeparator': {
              visibility: 'visible', // Ensure separators are visible
              color: 'rgba(224, 224, 224, 1)', // You can change the color to match your design
            },

          }}
        />
      </ContentContainer>
    )
  }

  return (
    <AllNotifications />
  );
};

export default NotificationTable;

