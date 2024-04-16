import * as React from 'react';
import { Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@apollo/client';
import styles from './WorkOrderCSS.jsx';

const columns = [
  { field: 'id', headerName: 'ID', width: 10, },
  { field: 'workType', headerName: 'Work\u00a0Type', width: 80,  },
  { field: 'priority', headerName: 'Priority', width: 80,},
  { field: 'preferredTime', headerName: 'Preferred\u00a0Time', width: 100, align: 'right',},
  { field: 'entryPermission', headerName: 'Entry\u00a0Permission', width: 100, align: 'right',},
  { field: 'status', headerName: 'Status', minWidth: 80,},
  { field: 'assignedStaff', headerName: 'Assigned\u00a0Staff', width: 170,},
];

const WorkOrderTable = (props) => {
  let workOrdersMap = {};
  const { loading, error, data } = useQuery(props.graphQLStr);
  
  if (loading) console.log('Querying...');
  if (error) console.log(`Query error! ${error.message}`);
  let workOrdersByOwner = [];
  if( data !== undefined && data.workOrdersByOwner !== undefined){
    data.workOrdersByOwner.map( row => {
      let newRow = {};
      {columns.map((column) => {
        if(column.field === 'id'){
          newRow[column.field] = row['uuid'];
        }else{
          newRow[column.field] = row[column.field];
        }
      })};
      workOrdersByOwner.push(newRow);
      workOrdersMap[row['uuid']] = row;
    });
  }

  function ShowWorkOrders() {
    return <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {workOrdersByOwner !== null && 
          <DataGrid
            columnVisibilityModel={{
              id: false,
            }}
            rows={workOrdersByOwner}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            NoRowsOverlay
            enableRowSelectionOnClick
            onRowClick={(e) => {
              console.log(`calling props.setCurrentWK`);
              //console.log(workOrdersMap[e.id]);
              props.setCurrentWK(workOrdersMap[e.id]);
            }}
          />
        }
      </Paper>;
  }

  return (
    <div style={styles.container}>
      <ShowWorkOrders/>
    </div>
  );
}

export default WorkOrderTable;
