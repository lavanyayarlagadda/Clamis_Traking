import { Box } from "@mui/material";
import FiltersPane from "./Filters";
import { FilterList } from "@mui/icons-material";
import ReusableDrawer from "../../Components/reusable/reusableDrawer";


import WorkQueueTableGrid from "./workQueueGrid";
import React , {useState} from "react";
import MetricsCards from "./MetricsCards";

interface WorkQueueProps {
  name?: string;
}

const WorkQueue: React.FC<WorkQueueProps> = ({}) => {
   const [filterOpen, setFilterOpen] = useState(false);
    const handleSubmitFilters = () => {
    // Apply filter logic here
    console.log('Filters submitted');
    setFilterOpen(false);
  };
  return (
    <>
      <Box>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"flex-end"}}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent:"flex-end",
            gap: 1,
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
            mt: 0,
            mb: 1,
            width: "5rem"
          }}
          onClick={() => setFilterOpen(true)}
        >
          <FilterList fontSize="small" />
          Filter
        </Box>
        </Box>
        {/* <FiltersPane /> */}
        <MetricsCards />
        <WorkQueueTableGrid />
         <ReusableDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onSubmit={handleSubmitFilters}
        heading="Filter Tasks"
      >
        <FiltersPane />
      </ReusableDrawer>
      </Box>
    </>
  );
};

export default WorkQueue;
