import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material"; // Import Button component
import { useEffect } from "react";
import axios from "axios";

function DataTable() {
  // Define columns with a custom button for each row
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "nic", headerName: "NIC", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "passportID", headerName: "Passport ID", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "approvalStatus", headerName: "Approval Status", width: 150 },
    {
      field: "action", // New column for the button
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleViewData(params.row)} // Call a function when the button is clicked
        >
          View
        </Button>
      ),
    },
  ];

  // Dummy data using map function
  const users = [
    {
      id: 1,
      name: "John Doe",
      nic: "123456789V",
      email: "john@example.com",
      passportID: "A123456",
      status: "Active",
      approvalStatus: "Approved",
    },
    {
      id: 2,
      name: "Jane Smith",
      nic: "987654321V",
      email: "jane@example.com",
      passportID: "B234567",
      status: "Inactive",
      approvalStatus: "Pending",
    },
    {
      id: 3,
      name: "Sam Stark",
      nic: "192837465V",
      email: "sam@example.com",
      passportID: "C345678",
      status: "Active",
      approvalStatus: "Approved",
    },
    {
      id: 4,
      name: "Emily Snow",
      nic: "564738291V",
      email: "emily@example.com",
      passportID: "D456789",
      status: "Inactive",
      approvalStatus: "Rejected",
    },
    {
      id: 5,
      name: "Robert Baratheon",
      nic: "102938475V",
      email: "robert@example.com",
      passportID: "E567890",
      status: "Active",
      approvalStatus: "Approved",
    },
  ];

  // Generate rows dynamically using map
  const rows = users.map((user) => ({
    id: user.id,
    name: user.name,
    nic: user.nic,
    email: user.email,
    passportID: user.passportID,
    status: user.status,
    approvalStatus: user.approvalStatus,
  }));

  // Function to handle view button click
  const handleViewData = (rowData) => {
    alert(`Full Data: ${JSON.stringify(rowData, null, 2)}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        console.log("---------------")
        console.log(rows)
        console.log("++++++++++++++++")
        const response = await axios.get("https://projectsyntech-dzb2g7dbebe0amde.southindia-01.azurewebsites.net/api/Applicant/trial");
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    
    fetchData(); 
  });
  return (
    <div
      style={{
        marginLeft: "1vw",
        height: 400,
        width: "98vw",
        backgroundColor: "#1e1e1e",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 100]}
        sx={{
          "& .MuiDataGrid-root": {
            color: "#ffffff", // Text color
          },
          "& .MuiDataGrid-cell": {
            backgroundColor: "#1e1e1e", // Cell background
            color: "#ffffff", // Cell text color
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#333333", // Header background
            color: "#ffffff", // Header text color
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#333333", // Footer background
            color: "#ffffff", // Footer text color
          },
        }}
      />
    </div>
  );
}

export default DataTable;
