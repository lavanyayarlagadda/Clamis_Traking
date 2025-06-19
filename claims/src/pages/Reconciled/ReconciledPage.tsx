import { useState } from "react";
import { Visibility } from "@mui/icons-material";
import { reconciledClaims } from "./data"; 
import { DynamicTabs } from '../../components/reusable/tabs';
import { DynamicFilterBar } from "../../components/reusable/filter";
import { DynamicDialog } from "../../components/reusable/dialog";
import DynamicTable from "../../reusable/dynamicTable";
import { Chip } from "@mui/material";

export default function ReconciledPage() {
  const [activeTab, setActiveTab] = useState("ntr");
  const [dialogData, setDialogData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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



  return (
    <>
      <DynamicTabs
        tabs={[
          { label: "NTR Vaidyaseva", value: "ntr" },
          { label: "Other Schemes", value: "other" },
        ]}
        currentValue={activeTab}
        onChange={setActiveTab}
      />

      <DynamicFilterBar
        filters={[
          {
            type: "select",
            label: "Hospital",
            value: "",
            options: ["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare"],
            onChange: () => {},
          },
          {
            type: "date",
            label: "Date Range",
            value: "",
            onChange: () => {},
          },
          {
            type: "select",
            label: "Status",
            value: "",
            options: ["Settled"],
            onChange: () => {},
          },
        ]}
        onApply={() => {}}
        onExport={() => {}}
      />

<DynamicTable
      title="Reconciled Claims - NTR Vaidyaseva"
      countLabel={`${reconciledClaims.length} Claims`}
      columns={columns}
      data={reconciledClaims}
      actions={[
        {
          label: "View Timeline",
         icon: <Visibility fontSize="small" />,
            onClick: (row) => {
              setDialogData(row);
              setDialogOpen(true);
            },
          },        
      ]}
    />

      <DynamicDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Claim Timeline"
        data={dialogData}
      />
    </>
  );
}
