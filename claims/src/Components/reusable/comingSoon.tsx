
import { Box, Typography } from "@mui/material";
import React from "react";

interface comingSoomProps {
    title:string
}



const ComingSoon: React.FC<comingSoomProps>= ({title}) => (
  <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
    <Typography variant="h4">{`${title} Coming Soon`} </Typography>
  </Box>
);

export default ComingSoon;
