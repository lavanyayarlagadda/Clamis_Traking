import React, { useRef } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
  useTheme,
  Tooltip,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import MultiSelect from '../../components/reusable/MultiSelect';

const insuranceCompanies = [
  'NTR Vaidyaseva',
  'ICICI Lombard',
  'Star Health',
  'HDFC ERGO',
  'Bajaj Allianz',
];

const InsurancePerformance: React.FC = () => {
  const theme = useTheme();
  const [selectedCompanies, setSelectedCompanies] = React.useState<string[]>([
    'ALL'
  ]);
 const scrollRef = useRef<HTMLDivElement>(null);

const isDragging = useRef(false);
const startX = useRef(0);
const startY = useRef(0);
const scrollLeft = useRef(0);
const scrollTop = useRef(0); 

const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
  if (!scrollRef.current) return;
  startX.current = e.clientX;
  startY.current = e.clientY;
  scrollLeft.current = scrollRef.current.scrollLeft;
  scrollTop.current = scrollRef.current.scrollTop; // ✅ Capture vertical scroll
  isDragging.current = true;
  scrollRef.current.setPointerCapture(e.pointerId);
};


const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
  if (!isDragging.current || !scrollRef.current) return;

  const dx = e.clientX - startX.current;
  const dy = e.clientY - startY.current;

  scrollRef.current.scrollLeft = scrollLeft.current - dx;
  scrollRef.current.scrollTop = scrollTop.current - dy; 
};


  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    scrollRef.current.releasePointerCapture(e.pointerId);
    isDragging.current = false;
  };
  const formatCurrency = (value: number) => `₹${(value / 100000).toFixed(1)}L`;

  const allTimeData = [
    { name: 'NTR Vaidyaseva', amount: 1245678, percentage: 28, claims: 450 },
    { name: 'ICICI Lombard', amount: 1245678, percentage: 28, claims: 425 },
    { name: 'Star Health', amount: 1023456, percentage: 23, claims: 380 },
    { name: 'HDFC ERGO', amount: 876543, percentage: 19, claims: 320 },
    { name: 'Bajaj Allianz', amount: 745321, percentage: 17, claims: 275 },
    { name: 'Others', amount: 576892, percentage: 13, claims: 180 },
  ];

  const getData = () => {
    const isAllSelected = selectedCompanies.includes('ALL');
    const companiesToShow = isAllSelected
      ? insuranceCompanies
      : selectedCompanies;

    const filtered = allTimeData.filter((d) =>
      companiesToShow.includes(d.name)
    );

    return [...filtered]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5); // Top 5
  };

  const data = getData();

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

  const truncatedLabels = data.map((item) => ({
    full: item.name,
    short: item.name.length > 10 ? item.name.slice(0, 10) + '…' : item.name,
  }));

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
              sx={{ color: theme.palette.text.primary, letterSpacing: 0.3 }}
            >
              Top 5 Insurance Companies Performance
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
              // minWidth: data.length * 100,
              // height: { xs: 260, sm: 300, md: 320 },
              minWidth:{xs:500,sm:450},
              height: 'auto',
              maxHeight: 400,
            }}>
            <LineChart
              height={300}
              xAxis={[
                {
                  id: 'company',
                  data: truncatedLabels.map((label) => label.short),
                  scaleType: 'point',
                  label: 'Insurance Company',
                  valueFormatter: (value) =>
                    value.length > 12 ? `${value.slice(0, 10)}…` : value,
                },
              ]}
              series={[
                {
                  id: 'amount',
                  data: data.map((d) => d.amount),
                  label: 'Settlement Amount',
                  color: '#3b82f6',
                },
                {
                  id: 'claims',
                  data: data.map((d) => d.claims),
                  label: 'Claims Count',
                  color: '#10b981',
                },
              ]}
              yAxis={[
                {
                  id: 'y-left',
                  valueFormatter: formatCurrency,
                },
              ]}
              margin={{ top: 20, bottom: 60, left: 60, right: 20 }}
              sx={{
                '.MuiChartsAxis-tickLabel': {
                  fontSize: 12,
                  fill: '#4b5563',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  maxWidth: 60,
                  cursor: 'default',
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default InsurancePerformance;
