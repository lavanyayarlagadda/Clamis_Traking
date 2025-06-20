// components/FiltersPane.tsx

import React, { useState } from 'react';
import { Button, Grid, Paper } from '@mui/material';
import Dropdown from "../../components/reusable/Dropdown";
const people = ['Alice', 'Bob', 'Charlie'];
const taskTypes = ['Bug', 'Feature', 'Improvement'];
const priorities = ['High', 'Medium', 'Low'];

const FiltersPane: React.FC = () => {
  const [person, setPerson] = useState('');
  const [taskType, setTaskType] = useState('');
  const [priority, setPriority] = useState('');

  const handleApply = () => {
    console.log({ person, taskType, priority });
    // Add filter logic or callback here
  };

  return (
    <Paper elevation={2} style={{ padding: '16px', marginBottom: '16px', marginTop:"1rem" }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Dropdown
            label="Person"
            value={person}
            options={people}
            onChange={setPerson}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Dropdown
            label="Type of Task"
            value={taskType}
            options={taskTypes}
            onChange={setTaskType}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Dropdown
            label="Priority"
            value={priority}
            options={priorities}
            onChange={setPriority}
          />
        </Grid>
        <Grid size={{ xs: 12,sm : 3 }} sx={{p:2}}>
          <Button variant="contained" color="primary" onClick={handleApply}>
            Apply
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FiltersPane;
