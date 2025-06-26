import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
  useTheme,
} from "@mui/material";
import ApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import MultiSelect from "../../components/reusable/MultiSelect";

// Type for each aging bucket data item
type BucketData = {
  bucket: string;
  claims: number;
  amount: number;
};

// All company data
const companyData: Record<string, BucketData[]> = {
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

const insuranceCompanies = Object.keys(companyData);
const buckets = [
  "0-7 days",
  "8-15 days",
  "16-30 days",
  "31-60 days",
  "61-90 days",
  ">90 days",
];

const formatAmount = (value: number): string => {
  if (value >= 1_00_00_000) return `${(value / 1_00_00_000).toFixed(1)}Cr`;
  if (value >= 1_00_000) return `${(value / 1_00_000).toFixed(1)}L`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return `${value}`;
};

const AgingBucketDistribution: React.FC = () => {
  const theme = useTheme();
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(["ALL"]);

  const getCombinedData = () => {
    const isAll = selectedCompanies.includes("ALL");
    const companies = isAll ? insuranceCompanies : selectedCompanies;

    return buckets.map((bucket) => {
      let claims = 0;
      let amount = 0;
      companies.forEach((company) => {
        const record = companyData[company]?.find((d) => d.bucket === bucket);
        if (record) {
          claims += record.claims;
          amount += record.amount;
        }
      });
      return { bucket, claims, amount };
    });
  };

  const data = getCombinedData();

  const handleCompanyChange = (selected: string[]) => {
    if (selected.length === 0) {
      setSelectedCompanies(["NTR Vaidyaseva"]);
    } else if (selected.includes("ALL")) {
      setSelectedCompanies(["ALL"]);
    } else {
      setSelectedCompanies(selected);
    }
  };

  const chartOptions: ApexOptions = {
    chart: {
      height: 400,
      type: "line" as const,
      toolbar: { show: false },
      zoom: {
        enabled: false,
      },
    },

    stroke: {
      width: [0, 3],
      curve: "smooth",
    },
    markers: {
      size: 6,
      strokeColors: "#ef4444",
      fillOpacity: 1,
      shape: "circle",
    },
    dataLabels: {
      enabled: false,
      enabledOnSeries: [1],
    },
    labels: data.map((d) => d.bucket),
    xaxis: {
      categories: data.map((d) => d.bucket),
      labels: {
        rotate: -30,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: [
      {
        title: { text: "Claims Count" },
      },
      {
        opposite: true,
        title: { text: "Amount (₹)" },
        labels: {
          formatter: (value: number) => formatAmount(value),
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: [
        {
          formatter: (val: number) => `Claims: ${val}`,
        },
        {
          formatter: (val: number) => `₹${formatAmount(val)}`,
        },
      ],
    },
    legend: {
      position: "top",
    },
    colors: ["#3b82f6", "#ef4444"],
  };

  const chartSeries = [
    {
      name: "Claims",
      type: "column" as const,
      data: data.map((d) => d.claims),
    },
    {
      name: "Amount",
      type: "line" as const,
      data: data.map((d) => d.amount),
    },
  ];

  return (
    <Card elevation={3} sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardHeader
        title={
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Aging Bucket Distribution
            </Typography>
            <Box sx={{ width: { xs: "100%", sm: 250 } }}>
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
        <Box
          sx={{
            overflowX: "auto",
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
              overflowX: "auto",
              width: "100%",
            }}
          >
            <Box
              sx={{
                minWidth: 500,
                height: 450,
              }}
            >
              <ApexChart
                type="line"
                height={420}
                options={chartOptions}
                series={chartSeries}
              />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AgingBucketDistribution;
