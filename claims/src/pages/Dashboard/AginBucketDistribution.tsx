import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
  Tooltip,
  useTheme
} from "@mui/material";
import { BarChart, LineChart } from "@mui/x-charts";
import MultiSelect from "../../components/reusable/MultiSelect";

const insuranceCompanies = [
  "NTR Vaidyaseva",
  "ICICI Lombard",
  "Star Health",
  "HDFC ERGO",
  "Bajaj Allianz",
];

const AgingBucketDistribution: React.FC = () => {
  const theme = useTheme();
  const [selectedCompanies, setSelectedCompanies] = React.useState<string[]>(["ALL"]);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [tooltipData, setTooltipData] = React.useState<{
    bucket: string;
    claims: number;
    amount: number;
    x: number;
    y: number;
  } | null>(null);

  const buckets = [
    "0-7 days",
    "8-15 days",
    "16-30 days",
    "31-60 days",
    "61-90 days",
    ">90 days",
  ];

  const companyData: Record<string, { bucket: string; claims: number; amount: number }[]> = {
    "NTR Vaidyaseva": [
      { bucket: "0-7 days", claims: 356, amount: 1367890 },
      { bucket: "8-15 days", claims: 184, amount: 745678 },
      { bucket: "16-30 days", claims: 106, amount: 523456 },
      { bucket: "31-60 days", claims: 59, amount: 256789 },
      { bucket: "61-90 days", claims: 35, amount: 128234 },
      { bucket: ">90 days", claims: 13, amount: 61234 },
    ],
    "ICICI Lombard": [
      { bucket: "0-7 days", claims: 80, amount: 400000 },
      { bucket: "8-15 days", claims: 40, amount: 200000 },
      { bucket: "16-30 days", claims: 40, amount: 100000 },
      { bucket: "31-60 days", claims: 20, amount: 100000 },
      { bucket: "61-90 days", claims: 10, amount: 50000 },
      { bucket: ">90 days", claims: 5, amount: 30000 },
    ],
    "Star Health": [
      { bucket: "0-7 days", claims: 90, amount: 450000 },
      { bucket: "8-15 days", claims: 50, amount: 250000 },
      { bucket: "16-30 days", claims: 30, amount: 150000 },
      { bucket: "31-60 days", claims: 20, amount: 80000 },
      { bucket: "61-90 days", claims: 8, amount: 40000 },
      { bucket: ">90 days", claims: 6, amount: 20000 },
    ],
    "HDFC ERGO": [
      { bucket: "0-7 days", claims: 65, amount: 300000 },
      { bucket: "8-15 days", claims: 40, amount: 150000 },
      { bucket: "16-30 days", claims: 20, amount: 100000 },
      { bucket: "31-60 days", claims: 10, amount: 60000 },
      { bucket: "61-90 days", claims: 5, amount: 25000 },
      { bucket: ">90 days", claims: 2, amount: 10000 },
    ],
    "Bajaj Allianz": [
      { bucket: "0-7 days", claims: 50, amount: 200000 },
      { bucket: "8-15 days", claims: 30, amount: 100000 },
      { bucket: "16-30 days", claims: 20, amount: 80000 },
      { bucket: "31-60 days", claims: 9, amount: 50000 },
      { bucket: "61-90 days", claims: 3, amount: 20000 },
      { bucket: ">90 days", claims: 5, amount: 12000 },
    ],
  };

  const getCombinedData = () => {
    const isAll = selectedCompanies.includes("ALL");
    const companies = isAll ? insuranceCompanies : selectedCompanies;

    return buckets.map((bucket) => {
      let claims = 0;
      let amount = 0;
      companies.forEach((company) => {
        const record = companyData[company].find((d) => d.bucket === bucket);
        if (record) {
          claims += record.claims;
          amount += record.amount;
        }
      });
      return { bucket, claims, amount };
    });
  };

  const handleCompanyChange = (selected: string[]) => {
    if (selected.length === 0) {
      setSelectedCompanies(["NTR Vaidyaseva"]);
    } else if (selected.includes("ALL")) {
      setSelectedCompanies(["ALL"]);
    } else {
      setSelectedCompanies(selected);
    }
  };

  const formatAmount = (value: number): string => {
    if (value >= 1_00_00_000) return `${(value / 1_00_00_000).toFixed(1)}Cr`;
    if (value >= 1_00_000) return `${(value / 1_00_000).toFixed(1)}L`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
    return `${value}`;
  };

  const data = getCombinedData();

  const handleMouseEnter = (
    event: React.MouseEvent<SVGRectElement>,
    index: number
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredIndex(index);
    setTooltipData({
      ...data[index],
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  return (
    <Card
      elevation={3}
      sx={{
        bgcolor: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
        borderRadius: 3,
        boxShadow: 2,
        transition: "transform 0.2s ease-in-out",
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
              sx={{ color: theme.palette.text.primary, letterSpacing: 0.3 }}>
              Aging Bucket Distribution
            </Typography>
            <Box sx={{ width: { xs: '100%', sm: 250 } }}>
              <MultiSelect
                options={insuranceCompanies}
                selected={selectedCompanies}
                onChange={handleCompanyChange}
                includeAllOption
                width="100%"
                placeholder="Select insurance companies"
              />
            </Box>
          </Stack>
        }
        sx={{ px: { xs: 2, sm: 3 }, pt: 2, pb: 0 }}
      />
      <CardContent sx={{ px: { xs: 2, sm: 3 }, pt: 1, pb: 3 }}>
        <Box display="flex" gap={3} justifyContent="center" mb={3} flexWrap="wrap">
          <Box display="flex" alignItems="center" gap={1}>
            <Box sx={{ width: 14, height: 14, bgcolor: "#3b82f6", borderRadius: 0.5 }} />
            <Typography variant="body2">Claims Count</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Box sx={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid #ef4444" }} />
            <Typography variant="body2">Amount</Typography>
          </Box>
        </Box>

        {/* SCROLLABLE CHART WRAPPER */}
        <Box
          sx={{
            width: '100%',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x pan-y',
          }}
        >
          <Box
            sx={{
              minWidth: 640,
              position: "relative",
              height: 420,
            }}
          >
            <BarChart
              height={420}
              margin={{ top: 20, bottom: 60, left: 60, right: 60 }}
              xAxis={[
                {
                  id: "bucket",
                  data: buckets,
                  scaleType: "band",
                  tickLabelStyle: {
                    angle: -30,
                    textAnchor: "end",
                    fontSize: 12,
                  },
                },
              ]}
              yAxis={[{ id: "left-axis", label: "Claims Count" }]}
              series={[{ id: "claims", data: data.map(d => d.claims), color: "#3b82f6" }]}
              grid={{ horizontal: true }}
              slotProps={{
                bar: {
                  onMouseEnter: (event: React.MouseEvent<SVGRectElement>) => {
                    const svgRect = event.currentTarget.closest("svg")?.getBoundingClientRect();
                    const barWidth = svgRect?.width ? svgRect.width / buckets.length : 0;
                    const mouseX = event.clientX - (svgRect?.left || 0);
                    const index = Math.floor(mouseX / barWidth);
                    if (index >= 0 && index < buckets.length) {
                      handleMouseEnter(event, index);
                    }
                  },
                  onMouseLeave: () => {
                    setHoveredIndex(null);
                    setTooltipData(null);
                  },
                },
                tooltip: { trigger: "none" },
              }}
            />

            <LineChart
              height={420}
              margin={{ top: 20, bottom: 60, left: 130, right: 60 }}
              xAxis={[{ id: "bucket", data: buckets, scaleType: "band" }]}
              yAxis={[{
                id: "amount-axis",
                label: "Amount (₹)",
                position: "right",
                valueFormatter: formatAmount,
              }]}
              series={[{
                id: "amount-line",
                data: data.map((d) => d.amount),
                color: "#ef4444",
                curve: "monotoneX",
              }]}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                pointerEvents: "none",
              }}
            />

            {hoveredIndex !== null && tooltipData && (
              <Tooltip
                open
                title={
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {data[hoveredIndex].bucket}
                    </Typography>
                    <Typography variant="body2">
                      Claims: <strong>{data[hoveredIndex].claims}</strong>
                    </Typography>
                    <Typography variant="body2">
                      Amount: <strong>₹{formatAmount(data[hoveredIndex].amount)}</strong>
                    </Typography>
                  </Box>
                }
                arrow
                placement="top"
                PopperProps={{
                  anchorEl: {
                    getBoundingClientRect: () => ({
                      top: tooltipData.y,
                      left: tooltipData.x,
                      right: tooltipData.x,
                      bottom: tooltipData.y,
                      width: 0,
                      height: 0,
                      x: tooltipData.x,
                      y: tooltipData.y,
                      toJSON: () => ({}),
                    }),
                  },
                }}
              >
                <div style={{ display: "none" }} />
              </Tooltip>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AgingBucketDistribution;
