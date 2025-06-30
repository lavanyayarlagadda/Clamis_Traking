import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  DropdownComponent,
  DropdownOption,
} from "../../Components/reusable/Dropdown";

const people: DropdownOption[] = ["Alice", "Bob", "Charlie"].map((name) => ({
  label: name,
  value: name,
}));

const taskTypes: DropdownOption[] = ["Bug", "Feature", "Improvement"].map(
  (type) => ({
    label: type,
    value: type,
  })
);

const priorities: DropdownOption[] = ["High", "Medium", "Low"].map((p) => ({
  label: p,
  value: p,
}));

const FiltersPane: React.FC = () => {
  const [person, setPerson] = useState<DropdownOption | null>(null);
  const [taskType, setTaskType] = useState<DropdownOption | null>(null);
  const [priority, setPriority] = useState<DropdownOption | null>(null);

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="subtitle1" mb={1}>
        Person
      </Typography>
      <DropdownComponent value={person} options={people} onChange={setPerson} />
      <Typography variant="subtitle1" mb={1}>
        Type of Task
      </Typography>
      <DropdownComponent
        value={taskType}
        options={taskTypes}
        onChange={setTaskType}
      />
      <Typography variant="subtitle1" mb={1}>
        Priority
      </Typography>
      <DropdownComponent
        value={priority}
        options={priorities}
        onChange={setPriority}
      />
    </Box>
  );
};

export default FiltersPane;
