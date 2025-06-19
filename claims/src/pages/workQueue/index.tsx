import { Box } from "@mui/material";
import FiltersPane from "./Filters";
import React from "react";

interface WorkQueueProps {
  name?: string;
}

const WorkQueue: React.FC<WorkQueueProps> = ({}) => {
  return (
    <>
    <Box sx={{border:"2px solid red"}}>
        <FiltersPane />
        <h3> metrics cards</h3> 
        <h3>Kanban table</h3>
    </Box>
    </>
  );
};

export default WorkQueue;
