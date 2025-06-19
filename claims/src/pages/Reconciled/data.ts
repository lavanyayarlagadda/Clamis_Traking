type Claim = {
  claimId: string;
  ihxRefId: string;
  hospitalName: string;
  admissionDate: string;
  dischargeDate: string;
  claimedAmount: number;
  approvedAmount: number;
  settledAmount: number;
  tds: number;
  utrNo: string;
  status: string;
  diagnosis: string;
  paymentDate: string;
};

export const reconciledClaims: Claim[] = [
  {
    claimId: "CLM001",
    ihxRefId: "IHX2024001",
    hospitalName: "Apollo Hospitals",
    admissionDate: "2024-01-15",
    dischargeDate: "2024-01-20",
    claimedAmount: 125000,
    approvedAmount: 120000,
    settledAmount: 118000,
    tds: 2000,
    utrNo: "UTR2024001",
    status: "Settled",
    diagnosis: "Cardiac Surgery",
    paymentDate: "2024-01-25",
  },
  {
    claimId: "CLM002",
    ihxRefId: "IHX2024002",
    hospitalName: "Fortis Healthcare",
    admissionDate: "2024-01-10",
    dischargeDate: "2024-01-18",
    claimedAmount: 85000,
    approvedAmount: 80000,
    settledAmount: 78000,
    tds: 2000,
    utrNo: "UTR2024002",
    status: "Settled",
    diagnosis: "Orthopedic Surgery",
    paymentDate: "2024-01-23",
  },
  {
    claimId: "CLM003",
    ihxRefId: "IHX2024003",
    hospitalName: "Max Healthcare",
    admissionDate: "2024-01-12",
    dischargeDate: "2024-01-16",
    claimedAmount: 65000,
    approvedAmount: 65000,
    settledAmount: 63500,
    tds: 1500,
    utrNo: "UTR2024003",
    status: "Settled",
    diagnosis: "General Surgery",
    paymentDate: "2024-01-21",
  },
];
