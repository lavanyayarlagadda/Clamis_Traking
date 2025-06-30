import { useState } from "react";
import { Filter, FilterList, Visibility } from "@mui/icons-material";
import { Box, Chip } from "@mui/material";
import { FilterDrawer } from "../../Components/reusable/filter";
import { ButtonComponent } from "../../Components/reusable/Button";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  interface FilterValues {
    fromDate: Date | null;
    toDate: Date | null;
    insuranceCompanies: string[];
  }

  const [filters, setFilters] = useState<FilterValues>({
    fromDate: null,
    toDate: null,
    insuranceCompanies: [],
  });

  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "flex-end",
          gap: 4,
        }}
      >
        {/* Filter Button */}
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

      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onChange={setFilters}
        roles={["Users", "Admin"]}
        pageType="users"
      />
    </>
  );
};

export default Users;
