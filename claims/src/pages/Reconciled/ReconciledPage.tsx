import { useState } from "react";
import { Filter, FilterList, Visibility } from "@mui/icons-material";
import { reconciledClaimsNTR, reconciledClaimsOther } from "./data";
import { DynamicTabs } from "../../Components/reusable/tabs";
import { DynamicClaimDialog } from "../../Components/reusable/dialog";
import { Box, Chip } from "@mui/material";
import DynamicTable from "../../Components/reusable/dynamicTable";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FilterDrawer } from "../../Components/reusable/filter";

export default function ReconciledPage() {
  const [activeTab, setActiveTab] = useState("ntr");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
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

  const statusColorMap: Record<"Settled" | "Pending" | "Rejected", string> = {
    Settled: "#48D56B", // green
    Pending: "#FACC15", // yellow
    Rejected: "#EF4444", // red
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
        return (formatDate(row.claimedDate));
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
        return (formatDate(row.depositDate) ?? "N/A");
      },
    },
  ];




  const dummyDialogData = {
    claimNumber: "CLM-001245",
    insuranceCompany: "ICICI Lombard",
    chequeNumber: "CHQ90887711",
    chequeReceivedDate: "19-06-2024",
    claimedDate: "01-06-2024",
    claimedAmount: 85000,
    approvedAmount: 80000,
    settledAmount: 78000,
    tds: 2000,
    utrNo: "UTR202406180001",
    paymentDate: "18-06-2024",
    hospitalName: "Apollo Hospitals, Hyderabad",
    patientName: "Ravi Kumar",
    diagnosis: "Acute Appendicitis",
    manualReconciled: true,
    timeline: [
      {
        label: "Claim Submitted",
        description: "Claim submitted by hospital to TPA",
        date: "01-06-2024",
      },
      {
        label: "Documents Verified",
        description: "All supporting documents verified by claim processor",
        date: "03-06-2024",
      },
      {
        label: "Approved",
        description: "Claim approved by insurance company",
        date: "06-06-2024",
      },
      {
        label: "NEFT Processed",
        description: "Amount processed through bank NEFT",
        date: "08-06-2024",
      },
      {
        label: "Settled",
        description: "Final settlement processed and amount credited",
        date: "09-06-2024",
      },
      {
        label: "Reconciled",
        description: "Hospital confirmed receipt of payment",
        date: "10-06-2024",
      },
    ],
  };


  const currentClaims =
    activeTab === "ntr" ? reconciledClaimsNTR : reconciledClaimsOther;

  console.log(columns, "ACTIVETAB");
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          flexWrap: "wrap",
          // mb: 1,
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
            // mt: '-10px',
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


      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onChange={setFilters}
        insuranceOptions={["ICICI", "Star", "Religare"]}
        pageType="reconciliation"
      />

      <DynamicTable
       setting={true}
      download={true}
        loading={false}
        key={activeTab}
        title={`Reconciled Claims - ${activeTab === "ntr" ? "NTR Vaidyaseva" : "Private Insurances"
          }`}
        countLabel={`${currentClaims.length} Claims`}
        columns={columns}
        data={currentClaims}
        actions={[
          {
            label: "View",
            icon: <Visibility fontSize="small" />,
            onClick: (row) => {
              setDialogOpen(true);
            },
          },
        ]}
        chipColor={"#48D56B"}
        Icon={CheckCircleIcon}
        iconColor={"#48D56B"}
        minColumns={8}
      />

      {dummyDialogData && (
        <DynamicClaimDialog
          open={dialogOpen}
          pageType="reconciliation"
          onClose={() => setDialogOpen(false)}
          title={`Claim Details - ${dummyDialogData.claimNumber}`}
          data={{
            claimInfo: {
              "Claim Number": dummyDialogData.claimNumber,
              Hospital: dummyDialogData.hospitalName,
              Patient: dummyDialogData.patientName ?? "N/A",
              Diagnosis: dummyDialogData.diagnosis ?? "N/A",
            },
            financialDetails: {
              "Claimed Amount": `₹${dummyDialogData.claimedAmount?.toLocaleString()}`,
              "Approved Amount": `₹${dummyDialogData.approvedAmount?.toLocaleString()}`,
              "Settled Amount": `₹${dummyDialogData.settledAmount?.toLocaleString()}`,
              TDS: `₹${dummyDialogData.tds?.toLocaleString()}`,
              "UTR Number": dummyDialogData.utrNo,
              "Payment Date": dummyDialogData.paymentDate,
            },
            timeline: dummyDialogData.timeline,
          }}
        />
      )}
    </>
  );
}
