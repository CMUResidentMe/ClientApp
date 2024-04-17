import * as React from 'react';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { Backdrop, IconButton, Box } from '@mui/material';
import WorkOrderForm from './WorkOrderForm';
import { ArrowBack } from '@mui/icons-material';

const HeaderHeight = '60px';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: "#f7f7f7";
  padding-top: 20px;
  width: 70%;
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

const createColumns = (handleEditClick) => [
  { field: 'id', headerName: 'ID', width: 0, resizable: false, headerAlign: 'center', },
  {
    field: 'edit', headerName: 'Edit', sortable: false, filterable: false, width: 100, headerAlign: 'center', cellClassName: 'firstColumnPadding',
    renderCell: (params) => (
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        onClick={() => handleEditClick(params.row)}
        color="inherit"
      />
    )
  },
  { field: 'semanticId', headerName: '#', width: 100, resizable: false, headerAlign: 'center', },
  { field: 'workType', headerName: 'Work Type', width: 250, resizable: false, headerAlign: 'center', },
  { field: 'priority', headerName: 'Priority', width: 100, resizable: false, headerAlign: 'center', },
  { field: 'preferredTime', headerName: 'Preferred Time', width: 150, align: 'right', resizable: false, headerAlign: 'center', },
  { field: 'entryPermission', headerName: 'Entry Permission', width: 200, align: 'right', resizable: false, headerAlign: 'center', },
  { field: 'status', headerName: 'Status', minWidth: 100, resizable: false, headerAlign: 'center', },
  { field: 'assignedStaff', headerName: 'Assigned Staff', width: 200, resizable: false, headerAlign: 'center', },
  { field: 'createTime', headerName: 'Submitted Time', width: 200, resizable: false, cellClassName: 'lastColumnPadding', headerAlign: 'center', },
];


const WorkOrderTable = (props) => {
  document.body.style.overflow = 'hidden';

  const [isFormOpen, setFormOpen] = React.useState(false);
  const [currentWorkOrder, setCurrentWorkOrder] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEditClick = (workOrder) => {
    setCurrentWorkOrder(workOrder);
    setFormOpen(true);
    setIsEditing(true);
  };

  const closeModal = () => {
    setFormOpen(false);
    setIsEditing(false); // Reset editing state when closing the form
  };

  const columns = createColumns(handleEditClick);

  console.log("GraphQL Query:", props.graphQLStr);
  let workOrdersMap = {};
  const { loading, error, data } = useQuery(props.graphQLStr);

  if (loading) console.log('Querying...');
  if (error) console.log(`Query error! ${error.message}`);

  let workOrdersByOwner = [];
  if (data !== undefined && data.workOrdersByOwner !== undefined) {
    data.workOrdersByOwner.forEach((row) => {
      let newRow = {};
      columns.forEach((column) => {
        newRow[column.field] = column.field === 'id' ? row['uuid'] : row[column.field];
      });
      workOrdersByOwner.push(newRow);
      workOrdersMap[row['uuid']] = row;
    });
  };


  function ShowWorkOrders() {
    return <ContentContainer>
      {!isEditing && (
        <IconButton onClick={closeModal} style={{ visibility: isEditing ? 'visible' : 'hidden' }}>
          <ArrowBack />
        </IconButton>
      )}
      {workOrdersByOwner !== null &&
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
          rows={workOrdersByOwner}
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
          onRowClick={(e) => {
            console.log(`calling props.setCurrentWK`);
            //console.log(workOrdersMap[e.id]);
            props.setCurrentWK(workOrdersMap[e.id]);
          }}
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
              p: 4,
              m: 4,
              borderRadius: '12px',
              cursor: 'default',
              height: '38%',
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <WorkOrderForm
              currentWK={currentWorkOrder}
              closeModal={closeModal}
              isEditing={isEditing}
            />
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

export default WorkOrderTable;
