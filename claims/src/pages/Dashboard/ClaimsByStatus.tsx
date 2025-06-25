// components/dashboard/ClaimsByStatus.tsx

import React, { useRef } from 'react';
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
    'ALL'
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeft = useRef(0);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    startX.current = e.clientX;
    startY.current = e.clientY;
    scrollLeft.current = scrollRef.current.scrollLeft;
    isDragging.current = false;

    scrollRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    const dx = e.clientX - startX.current;
    const dy = Math.abs(e.clientY - startY.current);

    if (dy > 10) {
      scrollRef.current.releasePointerCapture(e.pointerId);
      return;
    }

    if (Math.abs(dx) > 5) {
      isDragging.current = true;
      scrollRef.current.scrollLeft = scrollLeft.current - dx;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    scrollRef.current.releasePointerCapture(e.pointerId);
    isDragging.current = false;
  };
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
             direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
             alignItems={{ xs: 'flex-start', sm: 'center' }}
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
            <Box  sx={{ width: { xs: '100%', sm: 250 } }}>
              <MultiSelect
                options={insuranceCompanies}
                selected={selectedCompanies}
                onChange={handleCompanyChange}
                // width={250}
                width="100%"
                includeAllOption
                placeholder="Select insurance companies"
              />
            </Box>
          </Stack>
        }
        sx={{ px: 3, pt: 3, pb: 0 }}
      />
      <CardContent 
      sx={{ px: { xs: 2, sm: 3 }, pt: 1, pb: 3 }}
      // sx={{ px: 3, pt: 1, pb: 3 }}
      >
         <Box
                ref={scrollRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                sx={{
                  width: '100%',
                  overflowX: 'auto',
                  overflowY: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  touchAction: 'pan-y',
                  cursor: { xs: 'auto', sm: 'grab' },
                  userSelect: isDragging.current ? 'none' : 'auto',
                  scrollbarWidth: 'thin',
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
              minWidth: 320,
              width: { xs: 320, sm: 400, md: 450 }, 
              height: { xs: 240, sm: 280, md: 300 },
            }}
          >
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
                '.MuiChartsLegend-series text': {
                  fontSize: 13,
                },
                '.MuiChartsArcLabel-root': {
                  fontSize: 11,
                },
              }}
            />
          </Box>
        </Box>

      </CardContent>
    </Card>
  );
};

export default ClaimsByStatus;
