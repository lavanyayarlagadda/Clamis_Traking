import React from 'react';
import { Typography, Box } from '@mui/material';
import { DynamicTable } from '../reusable/dynamicTable';

const claims = [
  {
    id: 'CLM001',
    ihxRef: 'IHX2024001',
    hospital: 'Apollo',
    admissionDate: '2024-01-15',
    dischargeDate: '2024-01-18',
    claimedAmount: 100000,
    approvedAmount: 95000,
    status: 'Settled'
  },
];

const timeline = [
  { date: '2024-01-15', event: 'Claim Submitted' },
  { date: '2024-01-17', event: 'Documents Verified' },
  { date: '2024-01-20', event: 'Claim Approved' },
];

const columns = [
  {
    label: 'Claim ID',
    accessor: 'id',
  },
  {
    label: 'IHX Ref',
    accessor: 'ihxRef',
  },
  {
    label: 'Hospital',
    accessor: 'hospital',
  },
  {
    label: 'Dates',
    accessor: 'admissionDate',
    render: (row: any) => (
      <>
        <div>Adm: {row.admissionDate}</div>
        <div>Dis: {row.dischargeDate}</div>
      </>
    ),
  },
  {
    label: 'Amount',
    accessor: 'claimedAmount',
    render: (row: any) => (
      <>
        <div>Claimed: ₹{row.claimedAmount}</div>
        <div>Approved: ₹{row.approvedAmount}</div>
      </>
    ),
  },
  {
    label: 'Status',
    accessor: 'status',
  },
];

const Reconciled = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Reconciled Claims
      </Typography>

      <DynamicTable
        columns={columns}
        data={claims}
        rowKey="id"
        getExpandableContent={(row) => (
          <Box>
            <Typography fontWeight={600} mb={1}>Timeline</Typography>
            {timeline.map((t, i) => (
              <div key={i}>
                <strong>{t.event}:</strong> {t.date}
              </div>
            ))}
          </Box>
        )}
      />
    </Box>
  );
};

export default Reconciled;
