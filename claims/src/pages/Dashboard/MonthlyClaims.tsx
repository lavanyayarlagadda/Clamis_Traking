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
import { LineChart } from '@mui/x-charts/LineChart';
import MultiSelect from '../../components/reusable/MultiSelect';

const insuranceCompanies = [
  'NTR Vaidyaseva',
  'ICICI Lombard',
  'Star Health',
  'HDFC ERGO',
  'Bajaj Allianz'
];

interface MonthlyData {
  months: string[];
  totalClaims: number[];
  reconciledClaims: number[];
}

const MonthlyClaimsTrend: React.FC = () => {
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
  // Sample data for each insurance company
  const companyData: Record<string, MonthlyData> = {
    'NTR Vaidyaseva': {
      months: ['JAN', 'FEB', 'MAR', 'APR'],
      totalClaims: [800, 900, 950, 850],
      reconciledClaims: [700, 800, 750, 700]
    },
    'ICICI Lombard': {
      months: ['JAN', 'FEB', 'MAR', 'APR'],
      totalClaims: [356, 389, 397, 397],
      reconciledClaims: [300, 300, 250, 300]
    },
    'Star Health': {
      months: ['JAN', 'FEB', 'MAR', 'APR'],
      totalClaims: [280, 310, 320, 300],
      reconciledClaims: [250, 280, 290, 270]
    },
    'HDFC ERGO': {
      months: ['JAN', 'FEB', 'MAR', 'APR'],
      totalClaims: [200, 220, 230, 210],
      reconciledClaims: [180, 200, 210, 190]
    },
    'Bajaj Allianz': {
      months: ['JAN', 'FEB', 'MAR', 'APR'],
      totalClaims: [150, 170, 180, 160],
      reconciledClaims: [130, 150, 160, 140]
    }
  };

  // Combine data for selected companies
  const getCombinedData = () => {
    const isAllSelected = selectedCompanies.includes('ALL');
    const companiesToProcess = isAllSelected ? insuranceCompanies : selectedCompanies;

    if (companiesToProcess.length === 0) {
      return {
        months: companyData['NTR Vaidyaseva'].months, // Default months
        totalClaims: [],
        reconciledClaims: []
      };
    }

    const months = companyData[companiesToProcess[0]].months;

    const combinedData = {
      months,
      totalClaims: Array(months.length).fill(0),
      reconciledClaims: Array(months.length).fill(0)
    };

    companiesToProcess.forEach(company => {
      const data = companyData[company];
      for (let i = 0; i < months.length; i++) {
        combinedData.totalClaims[i] += data.totalClaims[i];
        combinedData.reconciledClaims[i] += data.reconciledClaims[i];
      }
    });

    return combinedData;
  };

  const { months, totalClaims, reconciledClaims } = getCombinedData();

  const handleCompanyChange = (selected: string[]) => {
    // Prevent empty selection
    if (selected.length === 0) {
      setSelectedCompanies(['NTR Vaidyaseva']);
      return;
    }

    // If ALL is selected, replace current selection with ALL
    if (selected.includes('ALL')) {
      setSelectedCompanies(['ALL']);
      return;
    }

    // If ALL was previously selected and now something else is selected
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
      }}
    >
      <CardHeader
        title={
          <
            Stack direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ color: theme.palette.text.primary, letterSpacing: 0.3 }}>
              Monthly Claims Trend
            </Typography>
            <Box sx={{ width: { xs: '100%', sm: 250 } }}>
              <MultiSelect
                options={insuranceCompanies}
                selected={selectedCompanies}
                onChange={handleCompanyChange}
                width="100%"
                includeAllOption={true}
                placeholder="Select insurance companies"
              />
            </Box>
          </Stack>
        }
        sx={{ px: 3, pt: 3, pb: 0 }}
      />

      <CardContent sx={{ px: { xs: 2, sm: 3 }, pt: 1, '&:last-child': { paddingBottom: 0 } }}>
   <Box
  ref={scrollRef}
  onPointerDown={handlePointerDown}
  onPointerMove={handlePointerMove}
  onPointerUp={handlePointerUp}
  sx={{
    width: '100%',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    touchAction: 'none',
    cursor: { xs: 'grab', sm: 'grab' },
    userSelect: isDragging.current ? 'none' : 'auto',
    scrollbarWidth: 'thin',
    "&::-webkit-scrollbar": {
      height: 6,
      width: 6,
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
              minWidth: `${months.length * 80}px`,
              width: '100%',
              height:  350 ,
            }}
          >
            <LineChart
              xAxis={[{ id: 'months', data: months, scaleType: 'point', label: 'Month' }]}
              series={[
                {
                  id: 'totalClaims',
                  data: totalClaims,
                  label: 'Total Claims',
                  color: '#3b82f6',
                },
                {
                  id: 'reconciledClaims',
                  data: reconciledClaims,
                  label: 'Reconciled Claims',
                  color: '#10b981',
                },
              ]}
              height={300}
              margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthlyClaimsTrend;