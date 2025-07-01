import { useState } from "react";
import { Filter, FilterList, People, Visibility } from "@mui/icons-material";
import { Box, Chip, Grid, Switch, FormControlLabel, Tooltip, IconButton } from "@mui/material";
import { FilterDrawer } from "../../Components/reusable/filter";
import { ButtonComponent } from "../../Components/reusable/Button";
import { useNavigate } from "react-router-dom";

import { InfoOutline, Edit } from "@mui/icons-material";
import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";

import StatsCard from "../../Components/reusable/Cards";
import DynamicTable from "../../Components/reusable/dynamicTable";
import ConfirmPopup from "../../Components/reusable/ConfirmPopup";

const Users = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserStatus, setSelectedUserStatus] = useState(false);
  const [actionText, setActionText] = useState("");
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  interface FilterValues {
    fromDate: Date | null;
    toDate: Date | null;
    insuranceCompanies: string[];
  }
  type UserRow = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userTypeName: string;
    createdDate: string;
    active: boolean;
  };

  const [filters, setFilters] = useState<FilterValues>({
    fromDate: null,
    toDate: null,
    insuranceCompanies: [],
  });

  const navigate = useNavigate();

  const widgetsData = [
    {
      title: "Total Users",
      value: 5,
      infoText: "Displays the count of total users",
    },
    {
      title: "Total Active Users",
      value: 3,
      infoText: "Displays the total count of Active users",
    },
    {
      title: "Total Inactive Users",
      value: 2,
      infoText: "Displays the total count of InActive users",
    },
  ];

  const handleStatusChange = (id: string, newStatus: boolean) => {
    setSelectedUserId(id);
    setSelectedUserStatus(newStatus);
    setActionText(newStatus ? "Activate" : "DeActivate");

    setOpenConfirm(true);
  };
  const columns = [
    {
      key: "firstName",
      label: "First Name",
      align: false,
      disableSorting: false,
      render: (row: UserRow) => row.firstName,
    },
    {
      key: "lastName",
      label: "Last Name",
      align: false,
      disableSorting: false,
      render: (row: UserRow) => row.lastName,
    },
    {
      key: "email",
      label: "Email",
      align: false,
      disableSorting: false,
      render: (row: UserRow) => row.email,
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
      align: false,
      disableSorting: false,
      render: (row: UserRow) => row.phoneNumber,
    },
    {
      key: "userTypeName",
      label: "Role",
      align: false,
      disableSorting: false,
      render: (row: UserRow) => row.userTypeName,
    },
    {
      key: "createdDate",
      label: "Created Date",
      align: false,
      disableSorting: false,
      render: (row: UserRow) =>
        row.createdDate
          ? new Date(row.createdDate).toISOString().split("T")[0]
          : "N/A",
    },
    {
      key: "active",
      label: "Status",
      align: false,
      disableSorting: false,
      render: (row: UserRow) => (
        <FormControlLabel
          control={
            <Switch
              checked={row.active}
              onChange={(e) => handleStatusChange(row.id.toString(), e.target.checked)}
              color="primary"
            />
          }
          label={
            row.active ? (
              <span style={{ display: "flex", alignItems: "center" }}>
                <CheckCircleOutline style={{ color: "green", marginRight: 4 }} />
                Active
              </span>
            ) : (
              <span style={{ display: "flex", alignItems: "center" }}>
                <HighlightOff style={{ color: "red", marginRight: 4 }} />
                Inactive
              </span>
            )
          }
        />
      ),
    }

  ];



  const users = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "9876543210",
      userTypeName: "Admin",
      createdDate: "2024-12-01T10:30:00Z",
      displayName:"JD",
      active: true,
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      displayName:"JS",
      email: "jane.smith@example.com",
      phoneNumber: "8765432109",
      userTypeName: "User",
      createdDate: "2024-11-15T09:15:00Z",
      active: false,
    },
    {
      id: 3,
      firstName: "Amit",
      lastName: "Sharma",
      displayName:"AS",
      email: "amit.sharma@example.com",
      phoneNumber: "9988776655",
      userTypeName: "Viewer",
      createdDate: "2025-01-10T08:00:00Z",
      active: true,
    },
    {
      id: 4,
      firstName: "Sara",
      lastName: "Ali",
      displayName:"SA",
      email: "sara.ali@example.com",
      phoneNumber: "9123456789",
      userTypeName: "Editor",
      createdDate: "2025-02-05T13:45:00Z",
      active: false,
    },
    {
      id: 5,
      firstName: "Rahul",
      lastName: "Verma",
      displayName:"RV",
      email: "rahul.verma@example.com",
      phoneNumber: "9988001122",
      userTypeName: "Admin",
      createdDate: "2024-10-22T11:20:00Z",
      active: true,
    },
  ];


  const baseActions = [
    {
      label: "Update",
      icon: <Edit fontSize="small" color="primary" />,
      onClick: (row: any) => {
        navigate("/updateUser", { state: { rowData: row } });
      },
    },
  ];

  const handleSubmitPopupClose = () => {
    setOpenConfirm(false);
    setSelectedUserId("");
    setSelectedUserStatus(false);
    setActionText("");
  };

  const handleSubmitPopupConfirmOpen = async () => {
    setIsConfirmLoading(true);

  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignSelf: { xs: "flex-end", sm: "center" },
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1,
            // mt: '-10px',
            cursor: "pointer",
            px: 1,
            py: 0.5,
            borderRadius: 2,
            backgroundColor: "white",
            color: "#2563EB",
            fontSize: "14px",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#BAE6FD",
            },
          }}
          onClick={() => setFilterOpen(true)}
        >
          <FilterList fontSize="small" />
          Users Filter
        </Box>

        <ButtonComponent
          label="Create User"
          onClick={() => navigate("/createUser")}
          loading={false}
          variant="contained"
          sx={{
            borderRadius: 2,
            px: 1,
            py: 0.25,
            width: { xs: "100%", md: "auto" },
          }}
        />
      </Box>
      <Grid container spacing={1}>
        {widgetsData &&
          widgetsData?.map((widget, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <StatsCard
                title={widget.title}
                value={widget.value}
                icon={
                  <InfoOutline
                    sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
                  />
                }
                // isLoading={metricsLoading}
                infoText={widget.infoText}
              />
            </Grid>
          ))}
      </Grid>
      <div style={{ marginTop: "20px" }}>


        <DynamicTable
          // key={activeTab}
           setting={false}
      download={false}
          loading={false}
          title="Overview"
          countLabel={`${users.length} Users`}
          columns={columns}
          data={users}
          chipColor={"#3b82f6"}
          iconColor={"#3b82f6"}
           Icon={People}
          actions={baseActions}
          minColumns={8}
        />
      </div>

      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onChange={setFilters}
        roles={["Users", "Admin"]}
        pageType="users"
      />

  <ConfirmPopup
  open={openConfirm}
  title={`Are you sure you want to ${actionText} this user?`}
  message=""
  buttonText="Cancel"
  buttonText2={actionText}
  onClose={handleSubmitPopupClose}
  onClick={handleSubmitPopupConfirmOpen}
  isLoading={isConfirmLoading}
  popUpClosed={false}
/>

    </>
  );
};

export default Users;
