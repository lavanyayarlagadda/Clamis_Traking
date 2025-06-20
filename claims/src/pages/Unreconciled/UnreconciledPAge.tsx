import { useState } from "react";
import { Visibility } from "@mui/icons-material";
import { unreconciledClaimsData, unreconciledClaimsOther } from "./data";
import { DynamicTabs } from '../../components/reusable/tabs';
import { DynamicFilterBar } from "../../components/reusable/filter";
import ReusableDialog from "../../components/reusable/ReusableDialog";


import { Chip, Typography, Box, Card, CardContent, Grid } from "@mui/material";
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import DynamicTable from "../../components/reusable/dynamicTable";
import { DynamicClaimDialog } from "../../components/reusable/dialog";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

interface ClaimRow {
  approvedAmount: number;
  claimId: string;
  claimedAmount: number;
  diagnosis: string;
  differenceAmout: number;
  exceptionType: string;
  hospitalName: string;
  ihxRefId: string;
  reason: string;
  status: string;
}


export default function UnReconciledPage() {
  const [activeTab, setActiveTab] = useState("ntr");
  const [dialogData, setDialogData] = useState<ClaimRow | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const statusColorMap: Record<"Rejected" | "Exception", "success" | "warning" | "error"> = {
    Exception: "error",
    Rejected: "warning",
  };

  const columns = [
    { key: "claimId", label: "Claim ID" },
    { key: "ihxRefId", label: "IHX Ref ID" },
    { key: "hospitalName", label: "Hospital Name" },
    { key: "diagnosis", label: "Diagnosis" },
    {
      key: "claimedAmount",
      label: "Claimed Amount",
      render: (r: any) => `₹${r.claimedAmount.toLocaleString()}`,
    },
    {
      key: "approvedAmount",
      label: "Approved Amount",
      render: (r: any) => `₹${r.approvedAmount.toLocaleString()}`,
    }, {
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
  console.log("dialogData", dialogData)

const currentClaims =
  activeTab === "ntr" ? unreconciledClaimsData : unreconciledClaimsOther;
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
            label: "View",
            icon: <Visibility fontSize="small" />,
            onClick: (row) => {
              setDialogData(row);
              setDialogOpen(true);
            },
          },
          {
            label: "Start Manual Reconcilation",

            icon: <PlayArrowOutlinedIcon fontSize="small" />,
            onClick: (row) => {
              setDialogData(row);
              setDialogOpen(true);
            },
          },
        ]}
      />

      <ReusableDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={`Claim Details - ${dialogData?.claimId ?? ''}`}

      >

        <Card p-2>
          <Typography style={{ padding: "10px", fontWeight: "600" }}>Basic Information</Typography>
          <div style={{ padding: "10px" }}>
            <Typography variant="body1" gutterBottom>
              <strong>Claim ID:</strong> {dialogData?.claimId}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Status:</strong> {dialogData?.status}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Hospital:</strong> {dialogData?.hospitalName}
            </Typography>
          </div>
        </Card>

      </ReusableDialog>


    </>
  );
}