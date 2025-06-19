import { useState } from "react";
import { Visibility } from "@mui/icons-material";
import { unreconciledClaimsData } from "./data";
import { DynamicTabs } from '../../Components/reusable/tabs';
import { DynamicFilterBar } from "../../Components/reusable/filter";


import { Chip } from "@mui/material";
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import DynamicTable from "../../Components/reusable/dynamicTable";
import { DynamicClaimDialog } from "../../Components/reusable/dialog";


export default function UnReconciledPage() {
  const [activeTab, setActiveTab] = useState("ntr");
  const [dialogData, setDialogData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const statusColorMap: Record<  "Rejected" |"Exception", "success" | "warning" | "error"> = {
    Exception: "error",
    Rejected: "warning",
  };

  const columns = [
    { key: "claimId", label: "Claim ID" },
    { key: "ihxRefId", label: "IHX Ref ID" },
    {key:"hospitalName", label:"Hospital Name"},
    {key:"diagnosis", label:"Diagnosis"},
    {
      key: "claimedAmount",
      label: "Claimed Amount",
      render: (r: any) => `₹${r.claimedAmount.toLocaleString()}`,
    },
    {
      key: "approvedAmount",
      label: "Approved Amount",
      render: (r: any) => `₹${r.approvedAmount.toLocaleString()}`,
    },{
      key: "differenceAmout",
      label: "Difference Amount",
      render: (r: any) => `₹${r.differenceAmout.toLocaleString()}`,
    },
    { key: "exceptionType", label: "Exception Type" },
    { key: "reason", label: "Reason" },

    {
      key: "status",
      label: "Status",
      render: (row: any) => {
        const color = statusColorMap[row.status as keyof typeof statusColorMap] || "default";
        return <Chip label={row.status} color={color} size="small" />;
      },
    },
  ];



  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <DynamicFilterBar
          filters={[
            {
              type: "select",
              label: "Hospital",
              value: "",
              options: ["Max Healthcare", "Continental Hospitals", "CARE Hospitals", "Yashoda Hospitals", "Rainbow Hospitals"],
              onChange: () => { },
            },
            {
              type: "date",
              label: "Date Range",
              value: "",
              onChange: () => { },
            },
            {
              type: "select",
              label: "Status",
              value: "",
              options: ["Exception"],
              onChange: () => { },
            },
          ]}
          onApply={() => { }}
          onExport={() => { }}
          title={"Filter Unreconciled Claims"}
        />
      </div>

      <DynamicTabs
        tabs={[
          { label: "NTR Vaidyaseva", value: "ntr" },
          { label: "Other Schemes", value: "other" },
        ]}
        currentValue={activeTab}
        onChange={setActiveTab}
      />


      <DynamicTable
        title="Unreconciled Claims - NTR Vaidyaseva"
        countLabel={`${unreconciledClaimsData.length} Claims`}
        columns={columns}
        data={unreconciledClaimsData}
        chipColor={"error"}
        iconColor={"error"}
        Icon={ReportProblemOutlinedIcon}
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

      <DynamicClaimDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Claim Timeline"
        // data={dialogData}
      />
    </>
  );
}