// components/WorkQueueTableGrid.tsx

import React from "react";

import { Chip, Avatar, Typography, Stack } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DynamicTable from "../../components/reusable/dynamicTable";

// Mock task data
const taskData = [
  {
    id: "T-1001",
    title: "Fix login bug",
    assignedTo: {
      name: "Alice",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    priority: "High",
    status: "To Do",
    dueDate: "2025-06-21",
  },
  {
    id: "T-1002",
    title: "Update dashboard layout",
    assignedTo: {
      name: "Bob",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    priority: "Medium",
    status: "In Progress",
    dueDate: "2025-06-22",
  },
  {
    id: "T-1003",
    title: "Write unit tests",
    assignedTo: {
      name: "Charlie",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    priority: "Low",
    status: "Completed",
    dueDate: "2025-06-20",
  },
];

// Column definitions
const columns = [
  {
    key: "id",
    label: "Task ID",
  },
  {
    key: "title",
    label: "Title",
  },
  {
    key: "assignedTo",
    label: "Assigned To",
    render: (row: any) => (
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar src={row.assignedTo.avatar} alt={row.assignedTo.name} sx={{ width: 24, height: 24 }} />
        <Typography variant="body2">{row.assignedTo.name}</Typography>
      </Stack>
    ),
  },
  {
    key: "priority",
    label: "Priority",
    render: (row: any) => {
      const colorMap: Record<string, "error" | "warning" | "success"> = {
        High: "error",
        Medium: "warning",
        Low: "success",
      };
      return <Chip label={row.priority} color={colorMap[row.priority]} size="small" />;
    },
  },
  {
    key: "status",
    label: "Status",
    render: (row: any) => {
      const colorMap: Record<string, "default" | "info" | "success"> = {
        "To Do": "default",
        "In Progress": "info",
        "Completed": "success",
      };
      return <Chip label={row.status} color={colorMap[row.status]} size="small" />;
    },
  },
  {
    key: "dueDate",
    label: "Due Date",
    render: (row: any) => new Date(row.dueDate).toLocaleDateString(),
  },
];

// Actions
const actions = [
  {
    label: "Mark as Done",
    icon: <DoneIcon fontSize="small" />,
    onClick: (row: any) => {
      alert(`Marked Task ${row.id} as done`);
    },
  },
];

const WorkQueueTableGrid: React.FC = () => {
  return (
    <DynamicTable
      title="Work Queue"
      countLabel={`${taskData.length} Tasks`}
      columns={columns}
      data={taskData}
      actions={actions}
    />
  );
};

export default WorkQueueTableGrid;
