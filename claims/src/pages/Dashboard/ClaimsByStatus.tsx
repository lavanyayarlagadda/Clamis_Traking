// components/dashboard/ClaimsByStatus.tsx

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
  useTheme,
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import MultiSelect from '../../components/reusable/MultiSelect';

const insuranceCompanies = [
  'NTR Vaidyaseva',
  'ICICI Lombard',
  'Star Health',
  'HDFC ERGO',
  'Bajaj Allianz'
];

const companyData: Record<
  string,
  { id: number; label: string; value: number; color: string }[]
> = {
  'NTR Vaidyaseva': [
    { id: 0, label: 'Approved', value: 2245, color: '#10b981' },
    { id: 1, label: 'Settled', value: 1890, color: '#3b82f6' },
    { id: 2, label: 'Reconciled', value: 1234, color: '#8b5cf6' },
    { id: 3, label: 'Unreconciled', value: 456, color: '#f59e0b' },
  ],
  'ICICI Lombard': [
    { id: 0, label: 'Approved', value: 1000, color: '#10b981' },
    { id: 1, label: 'Settled', value: 1000, color: '#3b82f6' },
    { id: 2, label: 'Reconciled', value: 1000, color: '#8b5cf6' },
    { id: 3, label: 'Unreconciled', value: 200, color: '#f59e0b' },
  ],
  'Star Health': [
    { id: 0, label: 'Approved', value: 500, color: '#10b981' },
    { id: 1, label: 'Settled', value: 400, color: '#3b82f6' },
    { id: 2, label: 'Reconciled', value: 300, color: '#8b5cf6' },
    { id: 3, label: 'Unreconciled', value: 100, color: '#f59e0b' },
  ],
  'HDFC ERGO': [
    { id: 0, label: 'Approved', value: 400, color: '#10b981' },
    { id: 1, label: 'Settled', value: 350, color: '#3b82f6' },
    { id: 2, label: 'Reconciled', value: 300, color: '#8b5cf6' },
    { id: 3, label: 'Unreconciled', value: 50, color: '#f59e0b' },
  ],
  'Bajaj Allianz': [
    { id: 0, label: 'Approved', value: 100, color: '#10b981' },
    { id: 1, label: 'Settled', value: 250, color: '#3b82f6' },
    { id: 2, label: 'Reconciled', value: 400, color: '#8b5cf6' },
    { id: 3, label: 'Unreconciled', value: 300, color: '#f59e0b' },
  ],
};

const ClaimsByStatus: React.FC = () => {
  const theme = useTheme();
  const [selectedCompanies, setSelectedCompanies] = React.useState<string[]>([
    'NTR Vaidyaseva',
  ]);

  const getData = () => {
    const isAllSelected = selectedCompanies.includes('ALL');
    const companiesToProcess = isAllSelected
      ? insuranceCompanies
      : selectedCompanies;

    const combined = [
      { id: 0, label: 'Approved', value: 0, color: '#10b981' },
      { id: 1, label: 'Settled', value: 0, color: '#3b82f6' },
      { id: 2, label: 'Reconciled', value: 0, color: '#8b5cf6' },
      { id: 3, label: 'Unreconciled', value: 0, color: '#f59e0b' },
    ];

    companiesToProcess.forEach((company) => {
      const data = companyData[company];
      data.forEach((item, index) => {
        combined[index].value += item.value;
      });
    });

    return combined;
  };

  const handleCompanyChange = (selected: string[]) => {
    if (selected.length === 0) {
      setSelectedCompanies(['NTR Vaidyaseva']);
      return;
    }

    if (selected.includes('ALL')) {
      setSelectedCompanies(['ALL']);
      return;
    }

    if (selectedCompanies.includes('ALL') && !selected.includes('ALL')) {
      setSelectedCompanies(selected);
      return;
    }

    setSelectedCompanies(selected);
  };

  const data = getData();
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card
      elevation={3}
      sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
        borderRadius: 3,
        boxShadow: 2,
        transition: 'transform 0.2s ease-in-out',
      }}
    >
      <CardHeader
        title={
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{
                color: theme.palette.text.primary,
                letterSpacing: 0.3,
              }}
            >
              Claims by Status
            </Typography>
            <Box sx={{ minWidth: 250 }}>
              <MultiSelect
                options={insuranceCompanies}
                selected={selectedCompanies}
                onChange={handleCompanyChange}
                width={250}
                includeAllOption
                placeholder="Select insurance companies"
              />
            </Box>
          </Stack>
        }
        sx={{ px: 3, pt: 3, pb: 0 }}
      />
      <CardContent sx={{ px: 3, pt: 1, pb: 3 }}>
        <Box height={300}>
          <PieChart
            series={[
              {
                data,
                innerRadius: 40,
                outerRadius: 80,
                arcLabel: (item) =>
                  `${((item.value / total) * 100).toFixed(1)}%`,
                arcLabelMinAngle: 10,
              },
            ]}
            slotProps={{
              legend: {
                direction: 'horizontal',
                position: { vertical: 'bottom', horizontal: 'center' },
              },
            }}
            height={250}
            sx={{
              '.MuiChartsAxis-tickLabel': {
                fontSize: 12,
                fill: '#4b5563',
              },
              '.MuiChartsLegend-series text': {
                fontSize: 13,
              },
              '.MuiChartsAxis-line': {
                stroke: '#e5e7eb',
              },
              '.MuiChartsGrid-line': {
                stroke: '#f3f4f6',
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClaimsByStatus;
