import { useState } from "react";
import { Visibility } from "@mui/icons-material";
import { reconciledClaims } from "./data"; 
import { DynamicTabs } from '../../reusable/tabs';
import { DynamicFilterBar } from "../../reusable/filter";
import { DynamicDialog } from "../../reusable/dialog";
import DynamicTable from "../../reusable/dynamicTable";

export default function ReconciledPage() {
  const [activeTab, setActiveTab] = useState("ntr");
  const [dialogData, setDialogData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const columns = [
    { key: "claimId", label: "Claim ID" },
    { key: "ihxRefId", label: "IHX Ref ID" },
    { key: "hospitalName", label: "Hospital" },
    {
      key: "admissionDischarge",
      label: "Admission/Discharge",
      render: (row: any) => `${row.admissionDate} - ${row.dischargeDate}`,
    },
    {
      key: "claimedVsApproved",
      label: "Claimed vs Approved",
      render: (row: any) =>
        `₹${row.claimedAmount.toLocaleString()} / ₹${row.approvedAmount.toLocaleString()}`,
    },
    { key: "settledAmount", label: "Settled", render: (r: any) => `₹${r.settledAmount}` },
    { key: "tds", label: "TDS", render: (r: any) => `₹${r.tds}` },
    { key: "utrNo", label: "UTR No." },
    { key: "status", label: "Status" },
    { key: "diagnosis", label: "Diagnosis" },
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
