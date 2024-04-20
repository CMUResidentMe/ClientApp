import React from 'react';
import './Notification.css';
import styled from '@emotion/styled';
import { DataGrid } from '@mui/x-data-grid';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 77vh;
  background-color: "#f7f7f7";
  padding-top: 10px;
  width: 90%;
`;

/*{
  notificationType: 'workorderChanged',
  eventTime: '04-21 01:34',
  owner: '661bff26a8293a3ed2fd06ee',
  message: 'semanticId:WO-66, workType change from bbbvvvccc to vvv, ',
  notificationID: 4
}*/
const columns = [
  { field: 'id', headerName: 'ID', width: 100, resizable: false, },
  { field: 'notificationType', headerName: 'Type', width: 150, resizable: false, },
  { field: 'eventTime', headerName: 'Time', width: 200 },
  { field: 'message', headerName: 'Message', width: 850 },
];

var notiSet = new Set();

const NotificationTable = ({ notifications }) => {

  const rows = notifications.filter(noti => {
    if(!(noti.notificationID in notiSet)){
      notiSet.add(noti.notificationID);
      return noti;
    }
  }).map((notification) => (
    {
      id: notification.notificationID,
      notificationType: notification.notificationType,
      eventTime: notification.eventTime,
      message: notification.message,
    }
  ));

  return (
    <ContentContainer>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
        getRowId={(row) => row.id}
        sx={{
          height: '60%',
          width: '80%',
          '& .MuiDataGrid-row': {
            maxHeight: '70px',
          },
          '& .MuiDataGrid-cell': {
            display: 'flex',
          },
          '& .firstColumnPadding': {
            paddingLeft: '16px',
          },
          '& .lastColumnPadding': {
            paddingRight: '16px',
          },
          '& .MuiDataGrid-columnSeparator': {
            visibility: 'visible',
            color: 'rgba(224, 224, 224, 1)',
          },
        }}
      />
    </ContentContainer>
  );
};

export default NotificationTable;
