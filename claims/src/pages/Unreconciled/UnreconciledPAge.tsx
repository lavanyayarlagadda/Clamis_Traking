import { useState } from "react";
import { FilterList } from "@mui/icons-material";
import { unreconciledClaimsData, unreconciledClaimsOther } from "./data";
import { DynamicTabs } from '../../components/reusable/tabs';
import { Chip, Typography, Box, Card, CardContent, Grid, Tooltip, Button } from "@mui/material";
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import DynamicTable from "../../components/reusable/dynamicTable";
import { DynamicClaimDialog } from "../../components/reusable/dialog";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { FilterDrawer } from "../../components/reusable/filter";
import ManualReconciliationDialog from "./Manual_reconciled_Dialog";

interface ClaimRow {
  claimId: string;
  insuranceCompanyName: string;
  claimCreationDate: string;
  claimedDate: string;
  approvedDate: string;
  claimedAmount: number;
  approvedAmount: number;
  differenceAmout: number;
  chequeNumber: string;
  exceptionType: string;
  reason: string;
  status: string;
  scheme: string;
}


export default function UnReconciledPage() {
  const [activeTab, setActiveTab] = useState("ntr");
  const [dialogData, setDialogData] = useState<ClaimRow | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"view" | "reconcile">("view");
  const [filterOpen, setFilterOpen] = useState(false);

const [open, setOpen] = useState(true);

  const hospitalDetails = [
    { label: "Hospital", value: "Max Healthcare" },
    { label: "Diagnosis", value: "Cardiovascular Surgery" },
    { label: "Exception Type", value: "Amount Mismatch", color: "error" },
    { label: "Claimed Amount", value: "₹150,000", color: "primary" },
    { label: "Approved Amount", value: "₹135,000", color: "green" },
    { label: "Difference", value: "₹15,000", color: "error" },
  ];

interface FilterValues {
  fromDate: Date | null;
  toDate: Date | null;
  insuranceCompanies: string[];
  reconciledBy: string;
}

   const [filters, setFilters] = useState<FilterValues>({
     fromDate: null,
     toDate: null,
     insuranceCompanies: [],
     reconciledBy: "",
   });

const statusColorMap: Record<"Settled" | "Exception" | "Rejected", string> = {
  Settled: "#48D56B",   // green
   Exception: "#fb923c",
   Rejected: "#EF4444",  // red
  };

  const columns = [
    {
      key: "claimId",
      label: "Claim ID",
      render: (row: any) => (
        <Typography
          sx={{ color: "primary.main", cursor: "pointer" }}
          onClick={() => {
            setDialogData(row);
            setDialogMode("view");
            setDialogOpen(true);
          }}
        >
          {row.claimId}
        </Typography>
      ),
    },
    { key: "insuranceCompanyName", label: "Insurance Company" },
    {
      key: "claimCreationDate",
      label: "Claim Creation Date",
      render: (row: any) => `${row.claimCreationDate}`,
    },
    {
      key: "claimedDate",
      label: "Claimed Date",
      render: (row: any) => `${row.claimedDate}`,
    },
    {
      key: "approvedDate",
      label: "Approved Date",
      render: (row: any) => `${row.approvedDate}`,
    },
    {
      key: "claimedAmount",
      label: "Claimed Amount",
      render: (r: any) => `₹${r.claimedAmount.toLocaleString()}`,
    },
    {
      key: "approvedAmount",
      label: "Approved Amount",
      render: (r: any) => `₹${r.approvedAmount.toLocaleString()}`,
    },
    {
      key: "differenceAmout",
      label: "Difference Amount",
      render: (r: any) => `₹${r.differenceAmout.toLocaleString()}`,
    },
    { key: "chequeNumber", label: "Cheque No." },
    { key: "exceptionType", label: "Exception Type" },
    {
      key: "reason", label: "Reason", render: (row: any) => {
        const fullText = row.reason || "";
        const truncated = fullText.split(" ").slice(0, 2).join(" ") + (fullText.split(" ").length > 2 ? "..." : "");
        return (
          <Tooltip title={fullText} arrow>
            <Typography variant="body2" noWrap>
              {truncated}
            </Typography>
          </Tooltip>
        )
      }
    },

    {
      key: "status",
      label: "Status",
      render: (row: any) => {
    const backgroundColor = statusColorMap[row.status as keyof typeof statusColorMap] || "#E5E7EB"; // default gray
    return (
      <Chip
        label={row.status}
        size="small"
        sx={{
          backgroundColor,
          color: "#fff",
          fontWeight: 500,
        }}
      />
    );
      },
    },
  ];
  console.log("dialogData", dialogData)

  const currentClaims =
    activeTab === "ntr" ? unreconciledClaimsData : unreconciledClaimsOther;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 2,
          
        }}
      >
        <Box sx={{            mt:1}}>
        <DynamicTabs
          tabs={[
            { label: "NTR Vaidyaseva", value: "ntr" },
            { label: "Other Schemes", value: "other" },
          ]}
          currentValue={activeTab}
          onChange={setActiveTab}
        />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            px: 1,
            py: 0.5,
            borderRadius: 2,
            backgroundColor: "white",
            color: "#2563EB",
            fontSize: "14px",
            fontWeight: 500,
            '&:hover': {
              backgroundColor: "#BAE6FD",
            },
            mt: 0
          }}
          onClick={() => setFilterOpen(true)}
        >
          <FilterList fontSize="small" />
          Filter Claims
        </Box>
        </Box>
      <DynamicTable
        // title="Unreconciled Claims - NTR Vaidyaseva"
        title={`Unreconciled Claims - ${activeTab === "ntr" ? "NTR Vaidyaseva" : "Other Schemes"
          }`}
        countLabel={`${currentClaims.length} Claims`}
        columns={columns}
        data={currentClaims}
        chipColor={"#EF4444"}
        iconColor={"#EF4444"}
        Icon={ReportProblemOutlinedIcon}
        actions={[
          {
            label: "Start Manual Reconcilation",

            icon: <PlayArrowOutlinedIcon fontSize="small" />,
            onClick: (row) => {
              setDialogData(row);

              setOpen(true);
            },
          },
        ]}
      />
<ManualReconciliationDialog
      open={open}
      onClose={() => setOpen(false)}
      hospitalDetails={hospitalDetails}
      assignees={["John", "Jane", "Support Team"]}
      reasons={["Typo", "System Error", "Manual Override"]}
      priorities={["High", "Medium", "Low"]}
    />
   
      {dialogData && (
        <DynamicClaimDialog
          open={dialogOpen}
          pageType="unreconciliation"
          onClose={() => {
            setDialogOpen(false);
            // setdummyDialogData(null); // Optional: reset dialog data
          }}
          title={`Claim Details - ${dialogData.claimId}`}
          data={{
            claimInfo: {
              "Claim ID": dialogData.claimId,
              "Insurance Company": dialogData.insuranceCompanyName,
              "Cheque Number": dialogData.chequeNumber,
              "Scheme": dialogData.scheme,
              "status": dialogData.status,

            },
            exceptionDetails: {
              "Exception Type": dialogData.exceptionType,
              " Exception Reason": dialogData.reason,
            },
            financialDetails: {
              "Claimed Amount": `₹${dialogData.claimedAmount?.toLocaleString()}`,
              "Approved Amount": `₹${dialogData.approvedAmount?.toLocaleString()}`,
              "Difference": `₹${dialogData.differenceAmout?.toLocaleString()}`,

            },
            timeline: [
              {
                label: "Claim Created",
                description: "Claim created in system",
                date: dialogData.claimCreationDate,
              },
              {
                label: "Claim Submitted",
                description: "Initial claim submission received",
                date: dialogData.claimedDate,
              },
              {
                label: "Approved",
                description: "Claim approved for settlement",
                date: dialogData.approvedDate,
              },
              {
                label: "Exception Raised",
                description: dialogData.reason,
                date:dialogData. claimCreationDate,
              },
            ],
          }}
        />
      )}

    <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
  filters={filters}
  onChange={setFilters}
        pageType="unreconciliation"
        insuranceOptions={[
          "ICICI Lombard",
          "Star Health",
          "HDFC ERGO",
          "United India",
        ]}
        reconciledOptions={['Manual', 'Arogya Setu']}
/>

    </>
  );
}