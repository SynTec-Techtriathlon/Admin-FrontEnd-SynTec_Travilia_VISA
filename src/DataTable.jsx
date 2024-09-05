import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useEffect,useState } from "react";
import axios from "axios";

function DataTable() {
  // Define columns with a custom button for each row

  const [applications, setApplications] = useState([]);

  const columns = [
    { field: "applicationNo", headerName: "Application No", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "nic", headerName: "NIC", width: 150 },
    { field: "purpose", headerName: "Purpose", width: 150 },
    { field: "passportCountry", headerName: "Passport Country", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
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

  // Dummy data
  const users = [
    {
      $id: "2",
      No: 8,
      Purpose: "Tourism",
      Route: "Sri Lanka to UK",
      TravelMode: "Air",
      ArrivalDate: "2024-09-20T16:27:35.021",
      Period: 30,
      AmountOfMoney: 1500,
      MoneyType: "USD",
      Status: "clear",
      ApplicantNIC: "A123456789",
      ApplicantNationality: "Sri Lankan",
      Applicant: {
        $id: "3",
        NIC: "A123456789",
        Nationality: "Sri Lankan",
        FullName: "John Doe",
        Gender: "Male",
        BirthDate: "1985-07-15T16:27:35.021",
        BirthPlace: "Colombo",
        Height: 180,
        Address: "123 Main St, Colombo, Sri Lanka",
        TelNo: "+94 71 234 5678",
        Email: "johndoe@example.com",
        Occupation: "Software Engineer",
        OccupationAddress: "XYZ Tech Solutions, 456 Park Lane, Colombo",
        Passport: {
          $id: "4",
          Id: "P987654321",
          Country: "Sri Lankan",
          DateOfExpire: "2030-07-15T16:27:35.021",
          DateOfIssue: "2020-07-15T16:27:35.021",
          ApplicantNIC: "A123456789",
          ApplicantNationality: "Sri Lankan",
        },
        Spouse: {
          $id: "5",
          ApplicantNIC: "A123456789",
          ApplicantNationality: "Sri Lankan",
          SpouseNIC: "B987654321",
          Name: "Jane Doe",
          Address: "123 Main St, Colombo, Sri Lanka",
        },
        Applications: {
          $id: "6",
          $values: [{ $ref: "2" }],
        },
        Histories: {
          $id: "7",
          $values: [
            {
              $id: "8",
              Id: 7,
              VisaType: "Tourist",
              VisaIssuedDate: "2022-03-10T16:27:35.021",
              VisaValidityPeriod: 90,
              DateLeaving: "2022-06-10T16:27:35.021",
              LastLocation: "Kandy",
              ApplicantNIC: "A123456789",
              ApplicantNationality: "Sri Lankan",
            },
          ],
        },
      },
    },
  ];

  // Generate rows dynamically
  const rows = applications.map((user) => ({
    applicationNo: user.No,                            // 8
    name: user.Applicant.FullName,                     // "John Doe"
    nic: user.Applicant.NIC,                           // "A123456789"
    purpose: user.Purpose,                             // "Tourism"
    route: user.Route,                                 // "Sri Lanka to UK"
    travelMode: user.TravelMode,                       // "Air"
    arrivalDate: user.ArrivalDate,                     // "2024-09-20T16:27:35.021"
    period: user.Period,                               // 30
    amountOfMoney: user.AmountOfMoney,                 // 1500
    moneyType: user.MoneyType,                         // "USD"
    status: user.Status,                               // "clear"
    applicantNationality: user.ApplicantNationality,
    passportCountry: user.Applicant.Passport.Country,
    birthDate: user.Applicant.BirthDate,               // "1985-07-15T16:27:35.021"
  birthPlace: user.Applicant.BirthPlace,             // "Colombo"
  height: user.Applicant.Height,                     // 180
  address: user.Applicant.Address,                   // "123 Main St, Colombo, Sri Lanka"
  telNo: user.Applicant.TelNo,                       // "+94 71 234 5678"
  email: user.Applicant.Email,                       // "johndoe@example.com"
  occupation: user.Applicant.Occupation,             // "Software Engineer"
  occupationAddress: user.Applicant.OccupationAddress,
  passportId: user.Applicant.Passport.Id,            // "P987654321"
  passportDateOfExpire: user.Applicant.Passport.DateOfExpire,  // "2030-07-15T16:27:35.021"
  passportDateOfIssue: user.Applicant.Passport.DateOfIssue, 

    
  }));

  // Function to handle view button click
  const handleViewData = (rowData) => {
    alert(`Full Data: ${JSON.stringify(rowData, null, 2)}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.get(
          "https://projectsyntech-dzb2g7dbebe0amde.southindia-01.azurewebsites.net/api/Applicant"
        );
        const data = response.data;
        setApplications(data.$values);
        console.log(data.$values);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData(); 
  }, []); // Add empty dependency array to run only once

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
        getRowId={(row) => row.applicationNo} // Use applicationNo as the row id
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
