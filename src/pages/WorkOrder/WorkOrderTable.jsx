import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { gql, useQuery } from '@apollo/client';
import styles from './WorkOrderCSS.jsx';

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
  }
}
`;

const columns = [
  { id: 'workType', label: 'Work\u00a0Type', minWidth: 80,  },
  { id: 'priority', label: 'Priority', minWidth: 80, format: (value) => value.toLocaleString('en-US'),},
  { id: 'preferredTime', label: 'Preferred\u00a0Time', minWidth: 100, align: 'right',},
  { id: 'entryPermission', label: 'Entry\u00a0Permission', minWidth: 100, align: 'right',},
  { id: 'status', label: 'Status', minWidth: 80,},
  { id: 'assignedStaff', label: 'Assigned\u00a0Staff', minWidth: 170,},
];

const WorkOrderTable = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  function ShowWorkOrders() {
    const { loading, error, data } = useQuery(queryWorkOrdersByOwner);
    if (loading) console.log('Querying...');
    if (error) console.log(`Query error! ${error.message}`);
    let workOrdersByOwner = []
    if( data !== undefined && data.workOrdersByOwner !== undefined){
      workOrdersByOwner = data.workOrdersByOwner;
    }

    return <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {workOrdersByOwner
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row['uuid']}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={workOrdersByOwner.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>;
  }
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={styles.container}>
      <ShowWorkOrders/>
    </div>
  );
}

export default WorkOrderTable;
