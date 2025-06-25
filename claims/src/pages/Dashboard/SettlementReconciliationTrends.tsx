// components/dashboard/SettlementReconciliationTrends.tsx

import React, { useRef } from 'react';
import {
  ChartContainer,
  ChartsXAxis,
  ChartsYAxis,
  ChartsTooltip,
  ChartsLegend,
  ChartsGrid,
  AreaPlot,
} from '@mui/x-charts';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
  useTheme,
} from '@mui/material';
import MultiSelect from '../../components/reusable/MultiSelect';

const insuranceCompanies = [
  'NTR Vaidyaseva',
  'ICICI Lombard',
  'Star Health',
  'HDFC ERGO',
  'Bajaj Allianz',
];

const SettlementReconciliationTrends: React.FC = () => {
  const theme = useTheme();

  const [selectedCompanies, setSelectedCompanies] = React.useState<string[]>([
    'ALL'
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    scrollRef.current.setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };
  
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.clientX - startX.current;
    scrollRef.current.scrollLeft = scrollLeft.current - dx;
  };
  
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    isDragging.current = false;
    scrollRef.current.releasePointerCapture(e.pointerId);
  };
  const formatCurrency = (value: number) => `₹${(value / 100000).toFixed(1)}L`;

  // Sample company-wise data
  const companyData: Record<
    string,
    { month: string; settled: number; reconciled: number }[]
  > = {
    'NTR Vaidyaseva': [
      { month: 'Jan', settled: 2845678, reconciled: 2523456 },
      { month: 'Feb', settled: 3123456, reconciled: 2867890 },
      { month: 'Mar', settled: 3467891, reconciled: 3123678 },
      { month: 'Apr', settled: 2987456, reconciled: 2645234 },
    ],
    'ICICI Lombard': [
      { month: 'Jan', settled: 500000, reconciled: 450000 },
      { month: 'Feb', settled: 550000, reconciled: 500000 },
      { month: 'Mar', settled: 600000, reconciled: 550000 },
      { month: 'Apr', settled: 480000, reconciled: 430000 },
    ],
    'Star Health': [
      { month: 'Jan', settled: 250000, reconciled: 200000 },
      { month: 'Feb', settled: 270000, reconciled: 230000 },
      { month: 'Mar', settled: 300000, reconciled: 250000 },
      { month: 'Apr', settled: 260000, reconciled: 220000 },
    ],
    'HDFC ERGO': [
      { month: 'Jan', settled: 200000, reconciled: 180000 },
      { month: 'Feb', settled: 210000, reconciled: 190000 },
      { month: 'Mar', settled: 220000, reconciled: 200000 },
      { month: 'Apr', settled: 190000, reconciled: 170000 },
    ],
    'Bajaj Allianz': [
      { month: 'Jan', settled: 180000, reconciled: 160000 },
      { month: 'Feb', settled: 190000, reconciled: 170000 },
      { month: 'Mar', settled: 200000, reconciled: 180000 },
      { month: 'Apr', settled: 170000, reconciled: 150000 },
    ],
  };

  const getCombinedData = () => {
    const isAllSelected = selectedCompanies.includes('ALL');
    const companiesToUse = isAllSelected ? insuranceCompanies : selectedCompanies;

    const months = ['Jan', 'Feb', 'Mar', 'Apr'];
    const combined = months.map((month, i) => ({
      month,
      settled: 0,
      reconciled: 0,
    }));

    companiesToUse.forEach((company) => {
      const data = companyData[company];
      data.forEach((entry, i) => {
        combined[i].settled += entry.settled;
        combined[i].reconciled += entry.reconciled;
      });
    });

    return combined;
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
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ color: theme.palette.text.primary, letterSpacing: 0.3 }}
            >
              Settlement vs Reconciliation Trends
            </Typography>
            <Box sx={{ width: { xs: '100%', sm: 250 } }}>
              <MultiSelect
                options={insuranceCompanies}
                selected={selectedCompanies}
                onChange={handleCompanyChange}
                width="100%"
                includeAllOption
                placeholder="Select insurance companies"
              />
            </Box>
          </Stack>
        }
        sx={{ px: { xs: 2, sm: 3 }, pt: 3, pb: 0 }}
      />
      <CardContent sx={{ px: { xs: 2, sm: 3 }, pt: 1, pb: 3 }}>
        <Box

          ref={scrollRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          sx={{
            width: "100%",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y", // Prevent conflict with vertical scrolling
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              height: 6,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: 6,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c1c1c1",
              borderRadius: 6,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#999",
            },
          }}
        >
          <Box
            sx={{
              minWidth: 500, // Ensure enough space for small devices
              width: '100%',
            }}
          >
            <ChartContainer
              series={[
                {
                  type: 'line',
                  id: 'settled',
                  label: 'Settled',
                  dataKey: 'settled',
                  color: '#3b82f6',
                  area: true,
                },
                {
                  type: 'line',
                  id: 'reconciled',
                  label: 'Reconciled',
                  dataKey: 'reconciled',
                  color: '#10b981',
                  area: true,
                },
              ]}
              xAxis={[{ scaleType: 'point', dataKey: 'month' }]}
              yAxis={[{ valueFormatter: formatCurrency }]}
              dataset={data}
              height={320}
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
            >
              <ChartsGrid horizontal vertical />
              <ChartsXAxis />
              <ChartsYAxis />
              <ChartsTooltip />
              <ChartsLegend />
              <AreaPlot />
            </ChartContainer>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SettlementReconciliationTrends;