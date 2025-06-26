// components/WorkQueueTableGrid.tsx

import React from "react";
import DynamicTable from "../../components/reusable/dynamicTable"
import { Chip, Stack, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssigneePopover, { Assignee } from './AssigneSelect';

// Sample data for demo
const taskData = [
  {
    claimNumber: "CLM-001",
    claimStatus: "Approved",
    chequeNumber: "CHQ-98765",
    patientPaid: 1200,
    claimedAmount: 2000,
    approvedAmount: 1800,
    settledAmount: 1800,
    chequeDate: "2025-06-18",
    insuranceCompany: "HealthSecure",
    inpatientNumber: "INP-2345",
    customerId: "CUST-101",
    tags: ["urgent", "follow-up"],
  },
  {
    claimNumber: "CLM-002",
    claimStatus: "Pending",
    chequeNumber: "CHQ-12345",
    patientPaid: 300,
    claimedAmount: 1500,
    approvedAmount: 0,
    settledAmount: 0,
    chequeDate: "2025-06-20",
    insuranceCompany: "MediLife",
    inpatientNumber: "INP-9876",
    customerId: "CUST-202",
    tags: ["high-priority"],
  },
];

const assigneesList: Assignee[] = [
  { id: '1', name: 'Alice ', },
  { id: '2', name: 'Bob', },
  { id: '3', name: 'Charlie', }
];

// Column definitions
const columns = [
  { key: "claimNumber", label: "Claim Number" },
  { key: "claimStatus", label: "Claim Status", render: (row: any) => (
      <Chip 
        label={row.claimStatus} 
        color={
          row.claimStatus === "Approved" ? "success" : 
          row.claimStatus === "Pending" ? "warning" : 
          "default"
        } 
        size="small"
      />
    ) 
  },
  {
    key: 'assignee',
    label: 'Assignee',
    render: (params: any) => {
      const [selectedAssigneeId, setSelectedAssigneeId] = React.useState<string | null>(params.value);

      return (
        <AssigneePopover
          assignees={assigneesList}
          selectedAssigneeId={selectedAssigneeId}
          onSelect={(assignee:Assignee) => {
            setSelectedAssigneeId(assignee.id);
          }}
        />
      );
    },
  },
  { key: "chequeNumber", label: "Cheque Number" },
  { key: "patientPaid", label: "Patient Paid Amount", render: (row: any) => `₹${row.patientPaid}` },
  { key: "claimedAmount", label: "Claimed Amount", render: (row: any) => `₹${row.claimedAmount}` },
  { key: "approvedAmount", label: "Approved Amount", render: (row: any) => `₹${row.approvedAmount}` },
  { key: "settledAmount", label: "Settled Amount", render: (row: any) => `₹${row.settledAmount}` },
  { key: "chequeDate", label: "Cheque Date", render: (row: any) => new Date(row.chequeDate).toLocaleDateString() },
  { key: "insuranceCompany", label: "Insurance Company" },
  { key: "inpatientNumber", label: "Inpatient Number" },
  { key: "customerId", label: "Customer ID" },
  {
    key: "tags",
    label: "Tags",
    render: (row: any) => (
      <Stack direction="row" spacing={1}>
        {row.tags.map((tag: string, idx: number) => (
          <Chip key={idx} label={tag} size="small" variant="outlined" />
        ))}
      </Stack>
    ),
  },
];

// Actions
const actions = [
  {
    label: "Mark as Done",
    icon: <DoneIcon fontSize="small" />,
    onClick: (row: any) => {
      alert(`Marked claim ${row.claimNumber} as done`);
    },
  },
];

const WorkQueueTableGrid: React.FC = () => {
  return (
    <DynamicTable
     loading={false}
      title="Claim Work Queue"
      countLabel={`${taskData.length} Claims`}
      columns={columns}
      data={taskData}
      actions={actions}
       chipColor={"#48D56B"}
        Icon={CheckCircleIcon}
        iconColor={"#48D56B"}
    />
  );
};

export default WorkQueueTableGrid;
