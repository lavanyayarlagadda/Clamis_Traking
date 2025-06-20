import { useState } from "react";
import { FilterList } from "@mui/icons-material";
import { unreconciledClaimsData, unreconciledClaimsOther } from "./data";
import { DynamicTabs } from '../../Components/reusable/tabs';
// import { DynamicFilterBar } from "../../Components/reusable/filter";
import ReusableDialog from "../../Components/reusable/ReusableDialog";



import { Chip, Typography, Box, Card, CardContent, Grid, Tooltip, Button } from "@mui/material";
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import DynamicTable from "../../Components/reusable/dynamicTable";
import { DynamicClaimDialog } from "../../Components/reusable/dialog";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { FilterDrawer } from "../../Components/reusable/filter";

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
}


export default function UnReconciledPage() {
  const [activeTab, setActiveTab] = useState("ntr");
  const [dialogData, setDialogData] = useState<ClaimRow | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"view" | "reconcile">("view");
  const [filterOpen, setFilterOpen] = useState(false);
  interface FilterState {
    // dateRange: { startDate: string; endDate: string } | null;
    dateRange: {
      startDate?: string;
      endDate?: string;
    } | null;
    insuranceCompanies: string[];
    reconciliationStatus: 'Manual Reconciled' | 'Agent Reconciled' | null;
  }

  const [filters, setFilters] = useState<FilterState>({
    dateRange: null,
    insuranceCompanies: [],
    reconciliationStatus: null,
  });

  const statusColorMap: Record<"Rejected" | "Exception", "success" | "warning" | "error"> = {
    Exception: "error",
    Rejected: "warning",
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
        const color = statusColorMap[row.status as keyof typeof statusColorMap] || "default";
        return <Chip label={row.status} color={color} size="small" />;
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
          mb: 1,
        }}
      >

        <DynamicTabs
          tabs={[
            { label: "NTR Vaidyaseva", value: "ntr" },
            { label: "Other Schemes", value: "other" },
          ]}
          currentValue={activeTab}
          onChange={setActiveTab}
        />

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
        chipColor={"error"}
        iconColor={"error"}
        Icon={ReportProblemOutlinedIcon}
        actions={[
          {
            label: "Start Manual Reconcilation",

            icon: <PlayArrowOutlinedIcon fontSize="small" />,
            onClick: (row) => {
              setDialogData(row);
              setDialogMode("reconcile");
              setDialogOpen(true);
            },
          },
        ]}
      />

      <ReusableDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={
          dialogMode === "view"
            ? `Claim Details - ${dialogData?.claimId ?? ""}`
            : `Start Manual Reconciliation - ${dialogData?.claimId ?? ""}`
        }
      >
        {dialogMode === "view" ? (
          <Card sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>Basic Information</Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Claim ID:</strong> {dialogData?.claimId}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Status:</strong> {dialogData?.status}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Insurance Company:</strong> {dialogData?.insuranceCompanyName}
            </Typography>
          </Card>
        ) : (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Start Manual Reconciliation
            </Typography>
            {/* Custom Reconciliation UI */}
            <Typography variant="body2" gutterBottom>
              Claim ID: {dialogData?.claimId}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Exception Type: {dialogData?.exceptionType}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => {
                // Handle reconciliation logic here
                console.log("Reconciliation started for", dialogData?.claimId);
              }}
            >
              Start Reconciliation
            </Button>
          </Box>
        )}
      </ReusableDialog>

      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onChange={setFilters}
        includeExtraFilters={true}
         pageType="unreconciliation"
        insuranceOptions={[
          "ICICI Lombard",
          "Star Health",
          "HDFC ERGO",
          "United India",
        ]}
      />

    </>
  );
}