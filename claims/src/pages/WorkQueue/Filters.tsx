// components/FiltersPane.tsx

import React, { useState } from 'react';
import { Box } from '@mui/material';
import Dropdown from '../../components/reusable/Dropdown';

const people = ['Alice', 'Bob', 'Charlie'];
const taskTypes = ['Bug', 'Feature', 'Improvement'];
const priorities = ['High', 'Medium', 'Low'];

const FiltersPane: React.FC = () => {
  const [person, setPerson] = useState('');
  const [taskType, setTaskType] = useState('');
  const [priority, setPriority] = useState('');

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Dropdown
        label="Person"
        value={person}
        options={people}
        onChange={setPerson}
      />
      <Dropdown
        label="Type of Task"
        value={taskType}
        options={taskTypes}
        onChange={setTaskType}
      />
      <Dropdown
        label="Priority"
        value={priority}
        options={priorities}
        onChange={setPriority}
      />
    </Box>
  );
};

export default FiltersPane;
