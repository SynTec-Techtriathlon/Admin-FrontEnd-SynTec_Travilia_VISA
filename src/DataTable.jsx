import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DataTable = () => {
  const rows = [
    { name: 'John Doe', passportNo: 'A1234567', email: 'john.doe@example.com', status: 'Active', approval: 'Approved' },
    { name: 'Jane Smith', passportNo: 'B2345678', email: 'jane.smith@example.com', status: 'Pending', approval: 'Pending' },
    { name: 'Alice Johnson', passportNo: 'C3456789', email: 'alice.johnson@example.com', status: 'Inactive', approval: 'Rejected' },
    { name: 'Bob Brown', passportNo: 'D4567890', email: 'bob.brown@example.com', status: 'Active', approval: 'Approved' },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Passport No</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Approval</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.passportNo}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.approval}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
