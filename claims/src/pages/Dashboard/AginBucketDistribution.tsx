import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import {
  BarChart,
  LineChart,
} from '@mui/x-charts';
import MultiSelect from '../../components/reusable/MultiSelect'; // assuming this is your reusable component

const insuranceCompanies = [
  'NTR Vaidyaseva',
  'ICICI Lombard',
  'Star Health',
  'HDFC ERGO',
  'Bajaj Allianz',
];

const AgingBucketDistribution: React.FC = () => {
  const [selectedCompanies, setSelectedCompanies] = React.useState<string[]>([
    'NTR Vaidyaseva',
  ]);

  // Aging buckets
  const buckets = ['0-7 days', '8-15 days', '16-30 days', '31-60 days', '61-90 days', '>90 days'];

  // Sample aging bucket data for each insurance company
  const companyData: Record<string, { bucket: string; claims: number; amount: number; avgAge: number }[]> = {
    'NTR Vaidyaseva': [
      { bucket: '0-7 days', claims: 356, amount: 1367890, avgAge: 3.8 },
      { bucket: '8-15 days', claims: 184, amount: 745678, avgAge: 11.5 },
      { bucket: '16-30 days', claims: 106, amount: 523456, avgAge: 24.1 },
      { bucket: '31-60 days', claims: 59, amount: 256789, avgAge: 46.2 },
      { bucket: '61-90 days', claims: 35, amount: 128234, avgAge: 76.0 },
      { bucket: '>90 days', claims: 13, amount: 61234, avgAge: 125.3 },
    ],
    'ICICI Lombard': [
      { bucket: '0-7 days', claims: 80, amount: 400000, avgAge: 3.2 },
      { bucket: '8-15 days', claims: 40, amount: 200000, avgAge: 10.8 },
      { bucket: '16-30 days', claims: 40, amount: 100000, avgAge: 23.0 },
      { bucket: '31-60 days', claims: 20, amount: 100000, avgAge: 44.5 },
      { bucket: '61-90 days', claims: 10, amount: 50000, avgAge: 74.0 },
      { bucket: '>90 days', claims: 5, amount: 30000, avgAge: 115.0 },
    ],
    'Star Health': [
      { bucket: '0-7 days', claims: 90, amount: 450000, avgAge: 3.5 },
      { bucket: '8-15 days', claims: 50, amount: 250000, avgAge: 11.0 },
      { bucket: '16-30 days', claims: 30, amount: 150000, avgAge: 23.5 },
      { bucket: '31-60 days', claims: 20, amount: 80000, avgAge: 45.0 },
      { bucket: '61-90 days', claims: 8, amount: 40000, avgAge: 75.0 },
      { bucket: '>90 days', claims: 6, amount: 20000, avgAge: 118.0 },
    ],
    'HDFC ERGO': [
      { bucket: '0-7 days', claims: 65, amount: 300000, avgAge: 3.6 },
      { bucket: '8-15 days', claims: 40, amount: 150000, avgAge: 11.1 },
      { bucket: '16-30 days', claims: 20, amount: 100000, avgAge: 24.0 },
      { bucket: '31-60 days', claims: 10, amount: 60000, avgAge: 45.5 },
      { bucket: '61-90 days', claims: 5, amount: 25000, avgAge: 73.0 },
      { bucket: '>90 days', claims: 2, amount: 10000, avgAge: 110.0 },
    ],
    'Bajaj Allianz': [
      { bucket: '0-7 days', claims: 50, amount: 200000, avgAge: 3.1 },
      { bucket: '8-15 days', claims: 30, amount: 100000, avgAge: 10.9 },
      { bucket: '16-30 days', claims: 20, amount: 80000, avgAge: 22.8 },
      { bucket: '31-60 days', claims: 9, amount: 50000, avgAge: 43.5 },
      { bucket: '61-90 days', claims: 3, amount: 20000, avgAge: 70.0 },
      { bucket: '>90 days', claims: 5, amount: 12000, avgAge: 109.0 },
    ],
  };

  const getCombinedData = () => {
    const isAllSelected = selectedCompanies.includes('ALL');
    const companies = isAllSelected ? insuranceCompanies : selectedCompanies;

    return buckets.map((bucket) => {
      let claims = 0;
      let amount = 0;
      let avgAgeTotal = 0;

      companies.forEach((company) => {
        const record = companyData[company].find((d) => d.bucket === bucket);
        if (record) {
          claims += record.claims;
          amount += record.amount;
          avgAgeTotal += record.avgAge;
        }
      });

      return {
        bucket,
        claims,
        amount,
        avgAge: +(avgAgeTotal / companies.length).toFixed(1),
      };
    });
  };

  const handleCompanyChange = (selected: string[]) => {
    if (selected.length === 0) {
      setSelectedCompanies(['NTR Vaidyaseva']);
    } else if (selected.includes('ALL')) {
      setSelectedCompanies(['ALL']);
    } else {
      setSelectedCompanies(selected);
    }
  };

  const data = getCombinedData();

  return (
    <Card
      elevation={3}
      sx={{
        bgcolor: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
        borderRadius: 3,
        boxShadow: 2,
        transition: 'transform 0.2s ease-in-out',
      }}
    >
      <CardHeader
        title={
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="medium">
              Aging Bucket Distribution
            </Typography>
            <Box sx={{ width: 250 }}>
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
      />
      <CardContent>
        <Box display="flex" gap={4} justifyContent="center" mt={1} mb={3} flexWrap="wrap">
          <Box display="flex" alignItems="center" gap={1}>
            <Box sx={{ width: 14, height: 14, bgcolor: '#3b82f6', borderRadius: 0.5 }} />
            <Typography variant="body2">Claims Count</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Box sx={{ width: 14, height: 14, bgcolor: '#10b981', borderRadius: 0.5 }} />
            <Typography variant="body2">Amount (₹L)</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                border: '2px solid #ef4444',
                bgcolor: 'transparent',
              }}
            />
            <Typography variant="body2">Average Age (Days)</Typography>
          </Box>
        </Box>

        <Box sx={{ position: 'relative', height: 420 }}>
          <BarChart
            height={420}
            margin={{ top: 20, bottom: 60, left: 60, right: 60 }}
            xAxis={[
              {
                id: 'bucket',
                data: buckets,
                scaleType: 'band',
                tickLabelStyle: {
                  angle: -30,
                  textAnchor: 'end',
                  fontSize: 12,
                },
              },
            ]}
            yAxis={[{ id: 'left-axis', label: 'Claims / Amount' }]}
            series={[
              {
                id: 'claims',
                data: data.map((d) => d.claims),
                color: '#3b82f6',
              },
              {
                id: 'amount',
                data: data.map((d) => +(d.amount / 100000).toFixed(2)),
                color: '#10b981',
              },
            ]}
            grid={{ horizontal: true }}
          />

          <LineChart
            height={420}
            margin={{ top: 20, bottom: 60, left: 60, right: 60 }}
            xAxis={[
              {
                id: 'bucket',
                data: buckets,
                scaleType: 'band',
              },
            ]}
            yAxis={[{ id: 'avg-age', label: 'Avg Age (Days)', position: 'right' }]}
            series={[
              {
                id: 'avgAge',
                data: data.map((d) => d.avgAge),
                color: '#ef4444',
                curve: 'monotoneX',
              },
            ]}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              pointerEvents: 'none',
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AgingBucketDistribution;
