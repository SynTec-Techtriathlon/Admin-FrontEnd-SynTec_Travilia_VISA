
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, Grid} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css"; // Import the CSS for SweetAlert2
import { useNavigate } from "react-router-dom";


function DataTable() {
  const MySwal = withReactContent(Swal);
  const [applications, setApplications] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [Update, setUpdate] = useState(0);
  const navigator = useNavigate();

  const columns = [
    { field: "applicationNo", headerName: "Application No", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "nic", headerName: "NIC", width: 150 },
    { field: "purpose", headerName: "Purpose", width: 150 },
    { field: "passportCountry", headerName: "Passport Country", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{ backgroundColor: "#E78027",color: "#fff" }}
          size="small"
          onClick={() => handleViewData(params.row)}
        >
          View
        </Button>
      ),
    },
  ];

  const rows = applications.map((user) => ({
    applicationNo: user.No,
    name: user.Applicant.FullName,
    nic: user.Applicant.NIC,
    purpose: user.Purpose,
    route: user.Route,
    travelMode: user.TravelMode,
    arrivalDate: user.ArrivalDate,
    period: user.Period,
    amountOfMoney: user.AmountOfMoney,
    moneyType: user.MoneyType,
    status: user.Status,
    applicantNationality: user.ApplicantNationality,
    passportCountry: user.Applicant.Passport.Country,
    birthDate: user.Applicant.BirthDate,
    birthPlace: user.Applicant.BirthPlace,
    height: user.Applicant.Height,
    address: user.Applicant.Address,
    telNo: user.Applicant.TelNo,
    email: user.Applicant.Email,
    occupation: user.Applicant.Occupation,
    occupationAddress: user.Applicant.OccupationAddress,
    passportId: user.Applicant.Passport.Id,
    passportDateOfExpire: user.Applicant.Passport.DateOfExpire,
    passportDateOfIssue: user.Applicant.Passport.DateOfIssue,
  }));

  const handleOnclickAnalytic = () => {
    navigator(`/analitics`);
  };

  const handleViewData = async (rowData) => {
    const pageContent = document.getElementById("page-content");

    // Fetch applicant by applicationNo when the view button is clicked
    const fetchApplicantById = async (applicationNo) => {
        try {
            const response = await axios.get(
                `https://projectsyntech-dzb2g7dbebe0amde.southindia-01.azurewebsites.net/api/Applicant/${applicationNo}`
            );
            const applicantData = response.data;
            setSelectedApplicant(applicantData); // Set the fetched applicant data to state
        } catch (error) {
            console.error("Error fetching applicant by ID:", error);
        }
    };

    await fetchApplicantById(rowData.applicationNo);

    // Append the style directly to the document
    const style = document.createElement('style');
    style.textContent = `
        .swal-popup-container {
            display: flex;
            flex-direction: column;
            height: 100%;
          
        }

        .swal-popup {
            display: flex;
            flex-direction: column;
            height: 100vh; /* Ensure the popup fits within the viewport */
            overflow: hidden; /* Hide overflow of the popup itself */
            width: 60vw; /* Increase the width of the popup (adjust as needed) */
            max-width: 1200px; /* Optional: Set a max-width for
        }

        .swal-popup .swal2-content {
            overflow-y: auto; /* Add scrollbar to content area if needed */
            flex: 1; /* Allow the content area to grow and fill available space */
        }

        .swal-popup .swal2-actions {
            margin-top: auto; /* Push buttons to the bottom */
        }
    `;
    document.head.appendChild(style);
    console.log(selectedApplicant);
    console.log(selectedApplicant.Applicant.Photo)
    console.log('visa type',selectedApplicant.Applicant.Histories.$values[0].VisaType)

    MySwal.fire({
      title: <strong>Application Details</strong>,
      html: `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 0.5rem; max-height: 70vh; text-align: left;">
  <div style="text-align: left;">
    <p style="margin: 0; color: #fff;">Profile Image</p>
    <a href="${selectedApplicant.Applicant.Photo}">
    <img src="${selectedApplicant.Applicant.Photo}" alt="Applicant Photo" style="position: relative; top: 20px; right: 0; width: 100px; height: 100px; object-fit: cover; border-radius: 10%; border: 2px solid #fff;" />

    </a>
    </div>
  <div style="text-align: left;">
    <p style="margin: 0; color: #fff;">Passport Image</p>
    <a href="${selectedApplicant.Applicant.Passport.PassportImage}">
      <img src="${selectedApplicant.Applicant.Passport.PassportImage}" alt="Applicant Photo" style="position: relative; top: 20px; right: 0; width: 100px; height: 100px; object-fit: cover; border-radius: 10%; border: 2px solid #fff;" />
    </a>
  </div>
                ${renderMaterialInput("Full Name", selectedApplicant.Applicant.FullName)}
                ${renderMaterialInput("Gender", selectedApplicant.Applicant.Gender)}
                ${renderMaterialInput("Nationality", selectedApplicant.Applicant.Nationality)}
                ${renderMaterialInput("NIC", selectedApplicant.ApplicantNIC)}
                ${renderMaterialInput("Date of Birth", new Date(selectedApplicant.Applicant.BirthDate).toLocaleDateString())}
                ${renderMaterialInput("Place of Birth", selectedApplicant.Applicant.BirthPlace)}
                ${renderMaterialInput("Occupation", selectedApplicant.Applicant.Occupation)}
                ${renderMaterialInput("Height", selectedApplicant.Applicant.Height)}
                
                ${renderMaterialInput("Passport No", selectedApplicant.Applicant.Passport.Id)}
                ${renderMaterialInput("Passport Country", selectedApplicant.Applicant.Passport.Country)}
                ${renderMaterialInput("Date of Issue", new Date(selectedApplicant.Applicant.Passport.DateOfIssue).toLocaleDateString())}
                ${renderMaterialInput("Date of Expiry", new Date(selectedApplicant.Applicant.Passport.DateOfExpire).toLocaleDateString())}

                ${renderMaterialInput("Address", selectedApplicant.Applicant.Address)}
                ${renderMaterialInput("Telephone", selectedApplicant.Applicant.TelNo)}
                ${renderMaterialInput("Email", selectedApplicant.Applicant.Email)}
                ${renderMaterialInput("Occupation Address", selectedApplicant.Applicant.OccupationAddress)}

                ${renderMaterialInput("Visa Type", selectedApplicant.Applicant.Histories.$values[0].VisaType)}
                ${renderMaterialInput("Visa Issued Date", new Date(selectedApplicant.Applicant.Histories.$values[0].VisaIssuedDate).toLocaleDateString())}
                ${renderMaterialInput("Visa Validity Period", selectedApplicant.Period)}
                ${renderMaterialInput("Leaving Date", new Date(selectedApplicant.Applicant.Histories.$values[0].DateLeaving).toLocaleDateString())}
                ${renderMaterialInput("Last Location", selectedApplicant.Applicant.LastLocation)}
                ${renderMaterialInput("Date of Arrival", new Date(selectedApplicant.ArrivalDate).toLocaleDateString())}
                ${renderMaterialInput("Purpose", selectedApplicant.Purpose)}
                ${renderMaterialInput("Rought", selectedApplicant.Route)}
                ${renderMaterialInput("Traval Mode", selectedApplicant.TravelMode)}
                ${renderMaterialInput("Amount of Money", selectedApplicant.AmountOfMoney)}
                ${renderMaterialInput("Money Type", selectedApplicant.MoneyType)}
                ${renderMaterialInput("Status", selectedApplicant.Status)}
        </div>
      `,
      background: "#1e1e1e",
      color: "#fff",
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: "Approve",
      denyButtonText: "Reject",
      confirmButtonColor: "#E78027",
      denyButtonColor: "#d33",
      preConfirm: () => {
        handleApprove(selectedApplicant); // Call approve function
      },
      preDeny: () => {
        handleReject(selectedApplicant); // Call reject function
      },
      didOpen: () => {
        // Apply blur to background content when popup opens
        pageContent.style.filter = "blur(5px)";
      },
      didClose: () => {
        // Remove blur effect when popup closes
        pageContent.style.filter = "none";
      },
      customClass: {
        container: "swal-popup-container",
        popup: "swal-popup",
        confirmButton: "swal-confirm-button",
        denyButton: "swal-deny-button",
      },
    });
    
};


  
  // Function to handle approval
  const handleApprove = async (selectedApplicant) => {
    console.log(selectedApplicant);
    const applicationNo = selectedApplicant.No;
  
    try {
      // Example API call to approve the application
      await axios.put(
        `https://projectsyntech-dzb2g7dbebe0amde.southindia-01.azurewebsites.net/api/Admin/approveApplication?No=${applicationNo}`
      );
      Swal.fire("Approved", "The application has been approved.", "success");
      setUpdate((prevUpdate) => prevUpdate + 1); // Correctly increment state
    } catch (error) {
      console.error("Error approving application:", error);
      Swal.fire("Error", "There was an error approving the application.", "error");
    }
  };
  
  // Function to handle rejection
  const handleReject = async (selectedApplicant) => {
    const applicationNo = selectedApplicant.No;
    
    try {
      // Example API call to reject the application
      await axios.put(
        `https://projectsyntech-dzb2g7dbebe0amde.southindia-01.azurewebsites.net/api/Admin/rejectApplication?No=${applicationNo}`
      );
      console.log("rejected");
      Swal.fire("Rejected", "The application has been rejected.", "success");
      setUpdate((prevUpdate) => prevUpdate + 1);
    } catch (error) {
      console.error("Error rejecting application:", error);
      Swal.fire("Error", "There was an error rejecting the application.", "error");
    }
  };
  

  const renderMaterialInput = (label, value) => {
    return `
      <div style="margin-bottom: 0.75rem;">
        <label style="color:#fff">${label}:</label>
        <input type="text" value="${value}" readonly style="width: 100%; background-color: #333; color: #fff; border: none; padding: 8px; border-radius: 4px;" />
      </div>
    `;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://projectsyntech-dzb2g7dbebe0amde.southindia-01.azurewebsites.net/api/Applicant"
        );
        const data = response.data;
        setApplications(data.$values);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [Update]);


  return (
    <Box id="page-content" sx={{ filter: "none" }}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ paddingRight: "2vw", marginLeft: "1vw", marginBottom: "1rem" }}
      >
        <Grid item>
          <h1 style={{ color: "#fff" }}>Visa Status Overview</h1>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#E78027", color: "#fff" }}
            size="small"
            onClick={() => handleOnclickAnalytic()}
          >
            Analysis
          </Button>
        </Grid>
      </Grid>
  
      <Box
        sx={{
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
          getRowId={(row) => row.applicationNo}
          sx={{
            "& .MuiDataGrid-root": {
              color: "#ffffff",
            },
            "& .MuiDataGrid-cell": {
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#333333",
              color: "#ffffff",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#333333",
              color: "#ffffff",
            },
            height: "80vh",
            width: "100%",
          }}
        />
      </Box>
    </Box>
  );
}

export default DataTable;
