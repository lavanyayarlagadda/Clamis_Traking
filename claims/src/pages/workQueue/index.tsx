import { Box } from "@mui/material";
import FiltersPane from "./Filters";
import MetricsCards from "./metricsCards";
import WorkQueueTableGrid from "./workQueueGrid";
import React from "react";

interface WorkQueueProps {
  name?: string;
}

const WorkQueue: React.FC<WorkQueueProps> = ({}) => {
  return (
    <>
    <Box >
        <FiltersPane />
        <MetricsCards/>
        <WorkQueueTableGrid/>
    </Box>
    </>
  );
};

export default WorkQueue;
