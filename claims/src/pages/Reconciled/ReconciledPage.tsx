import { useState } from "react";
import { Filter, FilterList, Visibility } from "@mui/icons-material";
import { reconciledClaimsNTR,reconciledClaimsOther } from "./data"; 
import { DynamicTabs } from '../../components/reusable/tabs';
import { DynamicFilterBar } from "../../components/reusable/filter";
import { DynamicClaimDialog } from "../../components/reusable/dialog";
import { Box, Chip } from "@mui/material";
import DynamicTable from "../../components/reusable/dynamicTable";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ReconciledPage() {
  const [activeTab, setActiveTab] = useState("ntr");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);


  const statusColorMap: Record<"Settled" | "Pending" | "Rejected", "success" | "warning" | "error"> = {
  Settled: "success",
  Pending: "warning",
  Rejected: "error",
};

const columns = [
  { key: "claimId", label: "Claim ID" },
  { key: "ihxRefId", label: "IHX Ref ID" },
  {
    key: "admissionDischarge",
    label: "Admission / Discharge",
    render: (row: any) => `${row.admissionDate} - ${row.dischargeDate}`,
  },
  {
    key: "claimedVsApproved",
    label: "Claimed vs Approved",
    render: (row: any) =>
      `₹${row.claimedAmount.toLocaleString()} / ₹${row.approvedAmount.toLocaleString()}`,
  },
  {
    key: "settledAmount",
    label: "Settled",
    render: (r: any) => `₹${r.settledAmount.toLocaleString()}`,
  },
  {
    key: "tds",
    label: "TDS",
    render: (r: any) => `₹${r.tds.toLocaleString()}`,
  },
  { key: "utrNo", label: "UTR No." },
  { key: "chequeNumber", label: "Cheque No." },
  { key: "insuranceCompany", label: "Insurance Company" },

  {
    key: "status",
    label: "Status",
    render: (row: any) => {
      const color = statusColorMap[row.status as keyof typeof statusColorMap] || "default";
      return <Chip label={row.status} color={color} size="small" />;
    },
  },

  { key: "paymentDate", label: "Payment Date" },
];
const dummyDialogData = {
  claimId: "CLM-001245",
  ihxRefId: "IHX-789654",
  hospitalName: "Apollo Hospitals, Hyderabad",
  patientName: "Ravi Kumar",
  diagnosis: "Acute Appendicitis",
  claimedAmount: 85000,
  approvedAmount: 80000,
  settledAmount: 78000,
  tds: 2000,
  utrNo: "UTR202406180001",
  chequeNumber: "CHQ90887711",
  insuranceCompany: "ICICI Lombard",
  paymentDate: "2024-06-18",
  timeline: [
    {
      label: "Claim Submitted",
      description: "Claim submitted by hospital to TPA",
      date: "2024-06-01",
    },
    {
      label: "Documents Verified",
      description: "All supporting documents verified by claim processor",
      date: "2024-06-03",
    },
    {
      label: "Approved",
      description: "Claim approved by insurance company",
      date: "2024-06-06",
    },
    {
      label: "NEFT Processed",
      description: "Amount processed through bank NEFT",
      date: "2024-06-08",
    },
    {
      label: "Reconciled",
      description: "Hospital confirmed receipt of payment",
      date: "2024-06-10",
    },
  ],
};

const currentClaims =
  activeTab === "ntr" ? reconciledClaimsNTR : reconciledClaimsOther;


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
        mt:0
      }}
      onClick={() => setFilterOpen((prev) => !prev)}
    >
      <FilterList fontSize="small" />
      Filter Claims
    </Box>
  </Box>




<DynamicTable
  title={`Reconciled Claims - ${
    activeTab === "ntr" ? "NTR Vaidyaseva" : "Other Schemes"
  }`}
  countLabel={`${currentClaims.length} Claims`}
  columns={columns}
  data={currentClaims}
  actions={[
    {
      label: "View Timeline",
      icon: <Visibility fontSize="small" />,
      onClick: (row) => {
        // setDialogData(row);
        setDialogOpen(true);
      },
    },
  ]}
 chipColor={"success"}
        Icon={CheckCircleIcon}
        iconColor={"success"}
/>


{dummyDialogData && (
  <DynamicClaimDialog
    open={dialogOpen}
    onClose={() => {
      setDialogOpen(false);
      // setdummyDialogData(null); // Optional: reset dialog data
    }}
    title={`Claim Details - ${dummyDialogData.claimId}`}
    data={{
      claimInfo: {
        "Claim ID": dummyDialogData.claimId,
        "IHX Ref ID": dummyDialogData.ihxRefId,
        "Hospital": dummyDialogData.hospitalName,
        "Patient": dummyDialogData.patientName ?? "N/A",
        "Diagnosis": dummyDialogData.diagnosis ?? "N/A",
      },
      financialDetails: {
        "Claimed Amount": `₹${dummyDialogData.claimedAmount?.toLocaleString()}`,
        "Approved Amount": `₹${dummyDialogData.approvedAmount?.toLocaleString()}`,
        "Settled Amount": `₹${dummyDialogData.settledAmount?.toLocaleString()}`,
        "TDS": `₹${dummyDialogData.tds?.toLocaleString()}`,
        "UTR Number": dummyDialogData.utrNo,
        "Payment Date": dummyDialogData.paymentDate,
      },
      timeline: [
        {
          label: "Claim Submitted",
          description: "Initial claim submission received",
          date: "2024-01-15",
        },
        {
          label: "Approved",
          description: "Claim approved for settlement",
          date: "2024-01-20",
        },
        {
          label: "Reconciled",
          description: "Reconciled with bank",
          date: "2024-01-25",
        },
      ],
    }}
  />
)}


    </>
  );
}
