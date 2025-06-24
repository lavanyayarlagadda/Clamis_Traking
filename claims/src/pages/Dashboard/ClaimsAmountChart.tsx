import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import MultiSelect from '../../components/reusable/MultiSelect';

const insuranceCompanies = [
  'NTR Vaidyaseva',
  'ICICI Lombard',
  'Star Health',
  'HDFC ERGO',
  'Bajaj Allianz'
];

interface MonthlyAmounts {
  months: string[];
  claimAmount: number[];
  approvedAmount: number[];
  settledAmount: number[];
}

const ClaimAmountChart: React.FC = () => {
  const [selectedCompanies, setSelectedCompanies] = React.useState<string[]>([
    'NTR Vaidyaseva',
    'ICICI Lombard'
  ]);

  // Sample data for each insurance company
  const companyData: Record<string, MonthlyAmounts> = {
    'NTR Vaidyaseva': {
      months: ['JAN', 'FEB', 'MAR', 'APR'],
      claimAmount: [3234567, 3876543, 4214789, 3567890],
      approvedAmount: [2890234, 3456789, 3789456, 3123567],
      settledAmount: [2750000, 3300000, 3650000, 3000000]
    },
    'ICICI Lombard': {
      months: ['JAN', 'FEB', 'MAR', 'APR'],
      claimAmount: [1000000, 1100000, 1200000, 1000000],
      approvedAmount: [900000, 950000, 1050000, 900000],
      settledAmount: [850000, 900000, 1000000, 850000]
    },
    'Star Health': {
      months: ['JAN', 'FEB', 'MAR', 'APR'],
      claimAmount: [800000, 850000, 900000, 800000],
      approvedAmount: [750000, 800000, 850000, 750000],
      settledAmount: [700000, 750000, 800000, 700000]
    },
    'HDFC ERGO': {
      months: ['JAN', 'FEB', 'MAR', 'APR'],
      claimAmount: [600000, 650000, 700000, 600000],
      approvedAmount: [550000, 600000, 650000, 550000],
      settledAmount: [500000, 550000, 600000, 500000]
    },
    'Bajaj Allianz': {
      months: ['JAN', 'FEB', 'MAR', 'APR'],
      claimAmount: [500000, 550000, 600000, 500000],
      approvedAmount: [450000, 500000, 550000, 450000],
      settledAmount: [400000, 450000, 500000, 400000]
    }
  };

  // Combine data for selected companies
  const getCombinedData = () => {
    const isAllSelected = selectedCompanies.includes('ALL');
    const companiesToProcess = isAllSelected ? insuranceCompanies : selectedCompanies;

    if (companiesToProcess.length === 0) {
      return {
        months: companyData['NTR Vaidyaseva'].months,
        claimAmount: [],
        approvedAmount: [],
        settledAmount: []
      };
    }

    const months = companyData[companiesToProcess[0]].months;
    
    const combinedData: MonthlyAmounts = {
      months,
      claimAmount: Array(months.length).fill(0),
      approvedAmount: Array(months.length).fill(0),
      settledAmount: Array(months.length).fill(0)
    };

    companiesToProcess.forEach(company => {
      const data = companyData[company];
      for (let i = 0; i < months.length; i++) {
        combinedData.claimAmount[i] += data.claimAmount[i];
        combinedData.approvedAmount[i] += data.approvedAmount[i];
        combinedData.settledAmount[i] += data.settledAmount[i];
      }
    });

    return combinedData;
  };

  const { months, claimAmount, approvedAmount, settledAmount } = getCombinedData();

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

  // Format currency for y-axis
  const formatCurrency = (value: number) => `₹${(value / 100000).toFixed(1)}L`;

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
          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
            <Typography variant="subtitle1" fontWeight={600} color="text.primary">
              Claim vs Approved vs Settled Amount
            </Typography>
            <Box sx={{ width: '40%' }}>
              <MultiSelect
                options={insuranceCompanies}
                selected={selectedCompanies}
                onChange={handleCompanyChange}
                includeAllOption={true}
                placeholder="Select companies"
                width="100%"
              />
            </Box>
          </Stack>
        }
        sx={{ px: 3, pt: 3, pb: 0 }}
      />
      <CardContent sx={{ px: 3, pt: 1, pb: 3 }}>
        <Box height={300}>
          <BarChart
            height={300}
            xAxis={[{ 
              id: 'months', 
              data: months, 
              scaleType: 'band', 
              label: 'Month' 
            }]}
            series={[
              {
                id: 'claimAmount',
                data: claimAmount,
                label: 'Claim Amount',
                color: '#3b82f6', // Blue
              },
              {
                id: 'approvedAmount',
                data: approvedAmount,
                label: 'Approved Amount',
                color: '#10b981', // Green
              },
              {
                id: 'settledAmount',
                data: settledAmount,
                label: 'Settled Amount',
                color: '#8b5cf6', // Purple
              },
            ]}
            yAxis={[{ valueFormatter: formatCurrency }]}
            margin={{ top: 20, bottom: 40, left: 60, right: 20 }}
            grid={{ horizontal: true }}
            sx={{
              '.MuiChartsLegend-root': {
                mt: 2,
                fontSize: 13,
              },
              '.MuiChartsAxis-tickLabel': {
                fontSize: 12,
                fill: '#4b5563',
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

export default ClaimAmountChart;