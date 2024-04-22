import * as React from 'react';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { Backdrop, IconButton, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import WorkOrderFormStaff from './WorkOrderFormStaff.jsx';
import { workOrdersByStatus } from './StaffGraphQL.js'

const HeaderHeight = '60px';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 75vh;
  background-color: "#f7f7f7";
  padding-top: 10px;
  width: 80%;
`;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const createColumns = (handleAddClick) => [
  { field: 'id', headerName: 'ID', width: 0, resizable: false, headerAlign: 'center', },
  {
    field: 'add', headerName: 'Assign', sortable: false, filterable: false, width: 70, headerAlign: 'center', cellClassName: 'firstColumnPadding',
    renderCell: (params) => (
      <GridActionsCellItem
        icon={<AddIcon />}
        label="Add"
        onClick={() => handleAddClick(params.row)}
        color="inherit"
      />
    )
  },
  { field: 'semanticId', headerName: 'Work Order ID', width: 120, resizable: false, headerAlign: 'center', },
  { field: 'roomNumber', headerName: 'Room Number', width: 120, resizable: false, headerAlign: 'center', },
  { field: 'workType', headerName: 'Work Type', width: 160, resizable: false, headerAlign: 'center', },
  { field: 'priority', headerName: 'Priority', width: 100, resizable: false, headerAlign: 'center', },
  { field: 'preferredTime', headerName: 'Preferred Time', width: 150, align: 'right', resizable: false, headerAlign: 'center', },
  { field: 'entryPermission', headerName: 'Entry Permission', width: 200, align: 'right', resizable: false, headerAlign: 'center', },
  { field: 'createTime', headerName: 'Submitted Time', width: 150, resizable: false, cellClassName: 'lastColumnPadding', headerAlign: 'center', },
];

const OpenWorkOrdersStaffTable = (props) => {
  document.body.style.overflow = 'hidden';
  const [isFormOpen, setFormOpen] = React.useState(false);
  const [currentWorkOrder, setCurrentWorkOrder] = React.useState(null);
  const [isAdd, setIsAdd] = React.useState(false);

  const handleAddClick = (workOrder) => {
    console.log("workOrder: " + workOrder);
    setCurrentWorkOrder(workOrder);
    setFormOpen(true);
    setIsAdd(true);
  };

  const closeModal = () => {
    setFormOpen(false);
    setIsAdd(false); // Reset editing state when closing the form
  };

  const columns = createColumns(handleAddClick);

  let workOrdersMap = {};
  const { loading, error, data } = useQuery(workOrdersByStatus, { variables: { status: "OPEN" }});

  if (loading) console.log('Querying...');
  if (error) console.log(`Query error! ${error.message}`);

  let workOrdersUnassigned = [];
  if (data !== undefined && data.workOrdersByStatus !== undefined) {
    data.workOrdersByStatus.forEach((row) => {
      let newRow = {};
      columns.forEach((column) => {
        if (column.field === 'id') {
          newRow[column.field] = row['uuid'];
        } else if (column.field === 'roomNumber') {
          newRow[column.field] = row['ownerInfo']['roomNumber'];
        } else {
          newRow[column.field] = row[column.field];
        }
      });
      workOrdersUnassigned.push(newRow);
      workOrdersMap[row['uuid']] = row;
    });
  };


  function ShowWorkOrders() {
    return <ContentContainer>
      {!isAdd && (
        <IconButton onClick={closeModal} style={{ visibility: isAdd ? 'visible' : 'hidden' }}>
          <ArrowBack />
        </IconButton>
      )}
      {workOrdersUnassigned !== null &&
        <DataGrid
          sx={{
            height: '60%',
            width: '90%',
            '& .MuiDataGrid-row': {
              maxHeight: '70px',
            },
            '& .MuiDataGrid-cell': {
              display: 'flex',
              alignItems: 'center', // Vertically center align
              justifyContent: 'center' // Horizontally center align
            },
            marginBottom: '20px',
            '& .firstColumnPadding': {
              paddingLeft: '16px',  // Add padding to the left of the first column
            },
            '& .lastColumnPadding': {
              paddingRight: '16px',  // Add padding to the right of the last column
            },
            '& .MuiDataGrid-columnSeparator': {
              visibility: 'visible', // Ensure separators are visible
              color: 'rgba(224, 224, 224, 1)', // You can change the color to match your design
            },

          }}
          columnVisibilityModel={{
            id: false,
          }}
          rows={workOrdersUnassigned}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          NoRowsOverlay
          enableRowSelectionOnClick
        />
      }
      {currentWorkOrder && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isFormOpen}
          onClick={closeModal}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.paper',
              boxShadow: 24,
              // p: 4,
              // m: 4,
              borderRadius: '12px',
              cursor: 'default',
              height: '38%',
            }}
            onClick={(event) => event.stopPropagation()}
          >
          {workOrdersMap[currentWorkOrder.id] && 
          <WorkOrderFormStaff
              isAssign={true} 
              currentWK={workOrdersMap[currentWorkOrder.id]}
              closeModal={closeModal}
              isAdd={isAdd}/>
          } 
          </Box>
        </Backdrop>
      )
      }
    </ContentContainer>;
  }

  return (
    <ShowWorkOrders />
  );
}

export default OpenWorkOrdersStaffTable;
