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

const columns = [
  { field: 'eventTime', headerName: 'Time', width: 150 },
  { field: 'message', headerName: 'Message', width: 800 },
];

const NotificationTable = ({ notifications, formatNotification }) => {
  const rows = notifications.map((notification, index) => ({
    id: index,
    eventTime: notification.eventTime,
    message: formatNotification(notification),
  }));

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
          width: '60%',
          '& .MuiDataGrid-row': {
            maxHeight: '70px',
          },
          '& .MuiDataGrid-cell': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
