import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  LinearProgress,
  Stack,
  useTheme,
} from '@mui/material';
import MultiSelect from '../../components/reusable/MultiSelect';

interface StatusData {
  name: string;
  value: number; // percentage
  amount: number;
  color: string;
}

const insuranceCompanies = [
  'NTR Vaidyaseva',
  'ICICI Lombard',
  'Star Health',
  'HDFC ERGO',
  'Bajaj Allianz',
];

const ReconciliationStatusDistribution: React.FC = () => {
  const theme = useTheme();

  const [selectedCompanies, setSelectedCompanies] = React.useState<string[]>([
    'NTR Vaidyaseva',
  ]);

  const formatCurrency = (value: number): string => {
    return `₹${(value / 100000).toFixed(1)}L`;
  };

  const companyData: Record<string, StatusData[]> = {
    'NTR Vaidyaseva': [
      { name: 'Fully Reconciled', value: 68, amount: 1867890, color: '#22c55e' },
      { name: 'Pending Reconciled', value: 18, amount: 498234, color: '#eab308' },
      { name: 'Unreconciled', value: 10, amount: 273456, color: '#ef4444' },
      { name: 'Others', value: 4, amount: 106789, color: '#a855f7' },
    ],
    'ICICI Lombard': [
      { name: 'Fully Reconciled', value: 70, amount: 800000, color: '#22c55e' },
      { name: 'Pending Reconciled', value: 14, amount: 160000, color: '#eab308' },
      { name: 'Unreconciled', value: 10, amount: 114000, color: '#ef4444' },
      { name: 'Others', value: 6, amount: 68000, color: '#a855f7' },
    ],
    'Star Health': [
      { name: 'Fully Reconciled', value: 72, amount: 900000, color: '#22c55e' },
      { name: 'Pending Reconciled', value: 13, amount: 162000, color: '#eab308' },
      { name: 'Unreconciled', value: 8, amount: 98000, color: '#ef4444' },
      { name: 'Others', value: 7, amount: 87000, color: '#a855f7' },
    ],
    'HDFC ERGO': [
      { name: 'Fully Reconciled', value: 65, amount: 700000, color: '#22c55e' },
      { name: 'Pending Reconciled', value: 20, amount: 215000, color: '#eab308' },
      { name: 'Unreconciled', value: 10, amount: 107000, color: '#ef4444' },
      { name: 'Others', value: 5, amount: 54000, color: '#a855f7' },
    ],
    'Bajaj Allianz': [
      { name: 'Fully Reconciled', value: 69, amount: 600000, color: '#22c55e' },
      { name: 'Pending Reconciled', value: 15, amount: 130000, color: '#eab308' },
      { name: 'Unreconciled', value: 10, amount: 85000, color: '#ef4444' },
      { name: 'Others', value: 6, amount: 73000, color: '#a855f7' },
    ],
  };

  const getCombinedData = (): StatusData[] => {
    const isAllSelected = selectedCompanies.includes('ALL');
    const companies = isAllSelected ? insuranceCompanies : selectedCompanies;

    const template = companyData[companies[0]].map((item) => ({
      ...item,
      value: 0,
      amount: 0,
    }));

    companies.forEach((company) => {
      const entries = companyData[company];
      entries.forEach((entry, i) => {
        template[i].value += entry.value;
        template[i].amount += entry.amount;
      });
    });

    // Average percentages across companies
    const totalCompanies = companies.length;
    return template.map((item) => ({
      ...item,
      value: Math.round(item.value / totalCompanies),
    }));
  };

  const data = getCombinedData();

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

  return (
    <Card
      elevation={3}
      sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
        borderRadius: 3,
        boxShadow: 2,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardHeader
        title={
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ color: theme.palette.text.primary, letterSpacing: 0.3 }}
            >
              Reconciliation Status Distribution
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
        {data.map((item, index) => (
          <Box key={index} mb={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" fontWeight={500} color="text.secondary">
                {item.name}
              </Typography>
              <Box textAlign="right">
                <Typography variant="body2" fontWeight={600} color="text.primary">
                  {item.value}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatCurrency(item.amount)}
                </Typography>
              </Box>
            </Box>

            <LinearProgress
              variant="determinate"
              value={item.value}
              sx={{
                height: 10,
                borderRadius: 5,
                mt: 1,
                backgroundColor: '#e5e7eb',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: item.color,
                  borderRadius: 5,
                  transition: 'width 0.5s ease-in-out',
                },
              }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default ReconciliationStatusDistribution;