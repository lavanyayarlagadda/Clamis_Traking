import { useState } from "react";
import { FilterList, Visibility } from "@mui/icons-material";
import { unreconciledClaimsData, unreconciledClaimsOther } from "./data";
import { DynamicTabs } from "../../Components/reusable/tabs";
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
import DynamicTable from "../../Components/reusable/dynamicTable";
import { DynamicClaimDialog } from "../../Components/reusable/dialog";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import { FilterDrawer } from "../../Components/reusable/filter";
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
    "Approved": "#3B82F6", // blue - for approved claims
    "Settled": "#10B981", // green - for fully settled claims
    "Enhancement Approved": "#8B5CF6", // purple/violet - for special approval cases
    "Deposit Not Found": "#F59E0B", // orange/yellow - requires attention
  };


  const columns = [
    { key: "claimNumber", label: "Claim #" },
    ...(activeTab === "ntr"
      ? [
        {
          key: "cardNumber",
          label: "Card #",
          render: (row: any) => row.cardNumber ?? "N/A",
        },
      ]
      : []),
    { key: "chequeNumber", label: "Cheque #" },
    {
      key: "claimedAmount",
      label: "Claimed Amount",
      render: (row: any) => (
        <span style={{ color: "#3B82F6", fontWeight: 500 }}>
          ₹{row.claimedAmount?.toLocaleString() ?? "0"}
        </span>
      ),
    },
    {
      key: "approvedAmount",
      label: "Approved Amount",
      render: (row: any) => (
        <span style={{ color: "#059669", fontWeight: 500 }}>
          ₹{row.approvedAmount?.toLocaleString() ?? "0"}
        </span>
      ),
    },
    {
      key: "settledAmount",
      label: "Settled Amount",
      render: (row: any) => (
        <span style={{ color: "#3B82F6", fontWeight: 500 }}>
          ₹{row.settledAmount?.toLocaleString() ?? "0"}
        </span>
      ),
    },

    {
      key: "depositAmount",
      label: "Deposit Amount",
      render: (row: any) => (
        <span style={{ color: "#3B82F6", fontWeight: 500 }}>
          ₹{row.depositAmount?.toLocaleString() ?? "0"}
        </span>
      ),
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
        return (
          <span style={{ color: "#3B82F6", fontWeight: 500 }}>
            {diff === 0 ? "₹0" : display}
          </span>
        );
      },
    },
    {
      key: "claimAge",
      label: "Claim Age",
    },
    { key: "insuranceCompany", label: "Insurance Company" },
    {
      key: "chequeReceivedDate", label: "Cheque Received Date", render: (row: any) => {
        const formatDate = (dateString: string) => {
          const date = new Date(dateString);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
        };
        return (formatDate(row.chequeReceivedDate));
      },
    },
    {
      key: "claimedDate", label: "Claimed Date", render: (row: any) => {
        const formatDate = (dateString: string) => {
          const date = new Date(dateString);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
        };
        return (formatDate(row.claimedDate ?? 'N/A'));
      },
    },
    {
      key: "depositDate",
      label: "Deposit Date",
      render: (row: any) => {
        const formatDate = (dateString: string) => {
          const date = new Date(dateString);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
        };
        return (formatDate(row.depositDate ?? "N/A"))
      },
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
    const formatDate = (dateStr: string | null | undefined): string => {
      if (!dateStr) return "N/A";
      const date = new Date(dateStr);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const baseTimeline: TimelineStep[] = [
      {
        label: "Claim Created",
        description: "Claim created in system",
        date: formatDate(dialogData.claimCreationDate),
      },
      {
        label: "Claim Submitted",
        description: "Initial claim submission received",
        date: formatDate(dialogData.claimedDate),
      },
    ];

    if (dialogData.status === "Approved") {
      baseTimeline.push({
        label: "Approved",
        description: "Claim approved for settlement",
        date: formatDate(dialogData.approvalDate),
      });
    }

    if (dialogData.status === "Settled") {
      baseTimeline.push(
        {
          label: "Claim Approved",
          description: "Claim approved for settlement",
          date: formatDate(dialogData.approvalDate),
        },
        {
          label: "Claim Settled",
          description: "The claim amount has been settled successfully.",
          date: formatDate(dialogData.settledData || ''),
        }
      );
    }

    if (dialogData.status === "Enhancement Approved") {
      baseTimeline.push(
        {
          label: "Claim Approved",
          description: "Claim approved for settlement",
          date: formatDate(dialogData.approvalDate),
        },
        {
          label: "Enhancement Submitted",
          description: "An enhancement request has been submitted for additional claim amount.",
          date: formatDate(dialogData.enhancementSubmittedDate || ''),
        },
        {
          label: "Enhancement Approved",
          description: "The enhancement request has been approved and added to the claim.",
          date: formatDate(dialogData.enhancementApprovedDate || ''),
        }
      );
    }
    console.log(dialogData)
    if (dialogData.status === 'Deposit Not Found') {
      baseTimeline.push(
        {
          label: "Claim Approved",
          description: "Claim approved for settlement",
          date: formatDate(dialogData.approvalDate),
        },
        {
          label: "Claim Settled",
          description: "The claim amount has been settled successfully.",
          date: formatDate(dialogData.settledData || ''),
        },
        {
          label: "Deposit Not Found",
          description: "The claim was marked as settled, but the deposit could not be confirmed in the beneficiary's account.",
          date: formatDate(dialogData.depositNotFoundDate || ''),
        }
      );
    }

    if (dialogData.status === "Exception") {
      baseTimeline.push({
        label: "Exception Raised",
        description: dialogData.reason || "Exception raised",
        date: formatDate(dialogData.claimCreationDate),
        color: "error",
      });
    }

    if (dialogData.status === "Rejected") {
      baseTimeline.push({
        label: "Rejected",
        description: dialogData.reason || "Claim rejected by insurer",
        date: formatDate(dialogData.rejectedDate || dialogData.claimCreationDate),
        color: "error",
      });
    }

    if (dialogData.status === "In Progress") {
      baseTimeline.push({
        label: "In Progress",
        description: "Claim processing is underway",
        date: formatDate(dialogData.inProgressDate || dialogData.claimCreationDate),
      });
    }

    if (dialogData.status === "To Do") {
      baseTimeline.push({
        label: "To Do",
        description: "Awaiting submission of documents/processing",
        date: formatDate(dialogData.claimCreationDate),
      });
    }

    return baseTimeline;
  };


  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          flexWrap: "wrap",
          // mb: 2,
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

        {/* Filter Button */}
        <Box
          sx={{
            display: "flex",
            alignSelf: { xs: "flex-end", sm: "center" },
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1,
            // mt:'-10px',
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
          }}
          onClick={() => setFilterOpen(true)}
        >
          <FilterList fontSize="small" />
          Filter Claims
        </Box>
      </Box>
      <DynamicTable
        key={activeTab}
        loading={false}
        title={`Unreconciled Claims - ${activeTab === "ntr" ? "NTR Vaidyaseva" : "Private Insurances"
          }`}
        countLabel={`${currentClaims.length} Claims`}
        columns={columns}
        data={currentClaims}
        chipColor={"#EF4444"}
        iconColor={"#EF4444"}
        Icon={ReportProblemOutlinedIcon}
        actions={[
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
