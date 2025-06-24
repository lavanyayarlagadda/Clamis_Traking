import { useState } from "react";
import { FilterList, Visibility } from "@mui/icons-material";
import { unreconciledClaimsData, unreconciledClaimsOther } from "./data";
import { DynamicTabs } from "../../components/reusable/tabs";
import {
  Chip,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Tooltip,
  Button,
} from "@mui/material";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import DynamicTable from "../../components/reusable/dynamicTable";
import { DynamicClaimDialog } from "../../components/reusable/dialog";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import { FilterDrawer } from "../../components/reusable/filter";
import ManualReconciliationDialog from "./Manual_reconciled_Dialog";

export interface ClaimRow {
  claimNumber: string; // replaces claimNumber
  insuranceCompany: string;
  claimCreationDate?: string; // if you have it, else remove or make optional
  claimedDate: string;
  approvedDate?: string;
  rejectedDate?: string;
  inProgressDate?: string;

  claimedAmount: number;
  approvedAmount: number;
  differenceAmount: number;

  chequeNumber?: string;
  exceptionType?: string;
  reason?: string;

  status: "To Do" | "In Progress" | "Exception" | "Rejected" | "Settled";

  scheme?: string; // optional if you have it
}

export default function UnReconciledPage() {
  const [activeTab, setActiveTab] = useState("ntr");
  const [dialogData, setDialogData] = useState<ClaimRow | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"view" | "reconcile">("view");
  const [filterOpen, setFilterOpen] = useState(false);

  const [open, setOpen] = useState(false);

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
  }

  const [filters, setFilters] = useState<FilterValues>({
    fromDate: null,
    toDate: null,
    insuranceCompanies: [],
  });

  const statusColorMap: Record<string, string> = {
    "To Do": "#9CA3AF", // gray
    "In Progress": "#3B82F6", // blue
    Exception: "#F59E0B", // orange
    Rejected: "#EF4444", // red
    Settled: "#10B981", // green (for reconciled)
  };


  const columns = [
    { key: "claimNumber", label: "Claim Number" },
    ...(activeTab === "ntr"
      ? [
        {
          key: "cardNumber",
          label: "Card Number",
          render: (row: any) => row.cardNumber ?? "N/A",
        },
      ]
      : []),
    { key: "chequeNumber", label: "Cheque No." },
    {
      key: "claimedAmount",
      label: "Claimed Amount",
      render: (row: any) => `₹${row.claimedAmount?.toLocaleString()}`,
    },
    {
      key: "approvedAmount",
      label: "Approved Amount",
      render: (row: any) => `₹${row.approvedAmount?.toLocaleString()}`,
    },
    {
      key: "settledAmount",
      label: "Settled Amount",
      render: (row: any) => `₹${row.settledAmount?.toLocaleString()}`,
    },

    {
      key: "depositAmount",
      label: "Deposit Amount",
      render: (row: any) =>
        row.depositAmount ? `₹${row.depositAmount?.toLocaleString()}` : "N/A",
    },
    {
      key: "status",
      label: "Status",
      render: (row: any) => {
        const backgroundColor =
          statusColorMap[row.status as keyof typeof statusColorMap] ||
          "#E5E7EB";
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
    {
      key: "differenceAmount",
      label: "Variance Amount",
      render: (row: any) => {
        const diff = (row.claimedAmount ?? 0) - (row.settledAmount ?? 0);
        const display = `₹${Math.abs(diff).toLocaleString()}`;
        return diff === 0 ? "₹0" : display;
      },
    },
    {
      key: "claimAge",
      label: "Claim Age",
    },
    { key: "insuranceCompany", label: "Insurance Company" },
    { key: "chequeReceivedDate", label: "Cheque Received Date" },
    { key: "claimedDate", label: "Claimed Date" },
    {
      key: "depositDate",
      label: "Deposit Date",
      render: (row: any) => row.depositDate ?? "N/A",
    },
  ];

  const currentClaims =
    activeTab === "ntr" ? unreconciledClaimsData : unreconciledClaimsOther;

  type TimelineStep = {
    label: string;
    description: string;
    date: string;
    color?: "error" | "success" | "warning" | "info";
  };

  const getTimeline = (dialogData: any): TimelineStep[] => {
    const baseTimeline: TimelineStep[] = [
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
    ];

    if (dialogData.status === "Approved" || dialogData.status === "Settled") {
      baseTimeline.push({
        label: "Approved",
        description: "Claim approved for settlement",
        date: dialogData.approvedDate,
      });
    }

    if (dialogData.status === "Exception") {
      baseTimeline.push({
        label: "Exception Raised",
        description: dialogData.reason || "Exception raised",
        date: dialogData.claimCreationDate,
        color: "error", // This will be used to style red in UI
      });
    }

    if (dialogData.status === "Rejected") {
      baseTimeline.push({
        label: "Rejected",
        description: dialogData.reason || "Claim rejected by insurer",
        date: dialogData.rejectedDate || dialogData.claimCreationDate,
        color: "error",
      });
    }

    if (dialogData.status === "In Progress") {
      baseTimeline.push({
        label: "In Progress",
        description: "Claim processing is underway",
        date: dialogData.inProgressDate || dialogData.claimCreationDate,
      });
    }

    if (dialogData.status === "To Do") {
      baseTimeline.push({
        label: "To Do",
        description: "Awaiting submission of documents/processing",
        date: dialogData.claimCreationDate,
      });
    }

    return baseTimeline;
  };

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
        <Box sx={{ mt: 1 }}>
          <DynamicTabs
            tabs={[
              { label: "NTR Vaidyaseva", value: "ntr" },
              { label: "Private Insurances", value: "other" },
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
            "&:hover": {
              backgroundColor: "#BAE6FD",
            },
            mt: 0,
          }}
          onClick={() => setFilterOpen(true)}
        >
          <FilterList fontSize="small" />
          Filter Claims
        </Box>
      </Box>
      <DynamicTable
        // title="Unreconciled Claims - NTR Vaidyaseva"
        title={`Unreconciled Claims - ${activeTab === "ntr" ? "NTR Vaidyaseva" : "Private Insurances"
          }`}
        countLabel={`${currentClaims.length} Claims`}
        columns={columns}
        data={currentClaims}
        chipColor={"#EF4444"}
        iconColor={"#EF4444"}
        Icon={ReportProblemOutlinedIcon}
        actions={[
          // {
          //   label: "Start Manual Reconcilation",

          //   icon: <PlayArrowOutlinedIcon fontSize="small" />,
          //   onClick: (row) => {
          //     setDialogData(row);

          //     setOpen(true);
          //   },
          // },
          {
            label: "View",
            icon: <Visibility fontSize="small" />,
            onClick: (row) => {
              setDialogData(row);
              setDialogMode("view");
              setDialogOpen(true);
            },
          },
        ]}
        minColumns={8}
      />
      {open && (
        <ManualReconciliationDialog
          open={open}
          onClose={() => setOpen(false)}
          hospitalDetails={hospitalDetails}
          assignees={["John", "Jane", "Support Team"]}
          reasons={["Typo", "System Error", "Manual Override"]}
          priorities={["High", "Medium", "Low"]}
        />
      )}

      {dialogData && (
        <DynamicClaimDialog
          open={dialogOpen}
          pageType="unreconciliation"
          onClose={() => {
            setDialogOpen(false);
            // setdummyDialogData(null); // Optional: reset dialog data
          }}
          title={`Claim Details - ${dialogData.claimNumber}`}
          data={{
            claimInfo: {
              "Claim ID": dialogData.claimNumber,
              "Insurance Company": dialogData.insuranceCompany,
              "Cheque Number": dialogData.chequeNumber,
              Scheme: dialogData.scheme,
              Status: dialogData.status,
            },
            exceptionDetails:
              dialogData.status === "Exception"
                ? {
                  "Exception Type": dialogData.exceptionType || "N/A",
                  "Exception Reason": dialogData.reason || "N/A",
                }
                : undefined,
            financialDetails: {
              "Claimed Amount": `₹${dialogData.claimedAmount?.toLocaleString() || 0
                }`,
              "Approved Amount": `₹${dialogData.approvedAmount?.toLocaleString() || 0
                }`,
             " Variance": `₹${dialogData.differenceAmount?.toLocaleString() || 0
                }`,
            },
            timeline: getTimeline(dialogData),
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
      />
    </>
  );
}
