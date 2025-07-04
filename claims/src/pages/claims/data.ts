export const unreconciledClaimsData = [
  {
    claimNumber: "CLM001",
    insuranceCompany: "ICICI Lombard",
    chequeNumber: "CHQ001",
    chequeReceivedDate: "2024-06-12",
    claimedDate: "2024-06-01",
    claimedAmount: 85000,
    approvedAmount: 80000,
    settledAmount: 78000,
    differenceAmount: 7000,
    status: "To Do",
    manualReconciled: false,
  },
  {
    claimNumber: "CLM002",
    insuranceCompany: "Star Health",
    chequeNumber: "CHQ002",
    chequeReceivedDate: "2024-05-27",
    claimedDate: "2024-05-15",
    claimedAmount: 60000,
    approvedAmount: 58000,
    settledAmount: 57000,
    differenceAmount: 3000,
    status: "In Progress",
    manualReconciled: false,
  },
  {
    claimNumber: "CLM003",
    insuranceCompany: "Religare",
    chequeNumber: "CHQ003",
    chequeReceivedDate: "2024-04-22",
    claimedDate: "2024-04-10",
    claimedAmount: 95000,
    approvedAmount: 90000,
    settledAmount: 88000,
    differenceAmount: 7000,
    status: "Rejected",
    manualReconciled: false,
  },
  {
    claimNumber: "CLM004",
    insuranceCompany: "ICICI Lombard",
    chequeNumber: "CHQ004",
    chequeReceivedDate: "2024-03-11",
    claimedDate: "2024-03-01",
    claimedAmount: 70000,
    approvedAmount: 68000,
    settledAmount: 67000,
    differenceAmount: 3000,
    status: "Exception",
    manualReconciled: false,
  },
  {
    claimNumber: "CLM005",
    insuranceCompany: "Star Health",
    chequeNumber: "CHQ005",
    chequeReceivedDate: "2024-02-27",
    claimedDate: "2024-02-15",
    claimedAmount: 40000,
    approvedAmount: 39000,
    settledAmount: 38000,
    differenceAmount: 2000,
    status: "To Do",
    manualReconciled: false,
  },
];




export const unreconciledClaimsOther = [
  {
    claimNumber: "CLM-OTH-001",
    insuranceCompany: "New India Assurance",
    chequeNumber: "CHQ1001",
    chequeReceivedDate: "2024-06-18",
    claimedDate: "2024-04-10",
    claimedAmount: 120000,
    approvedAmount: 110000,
    settledAmount: 105000,
    status: "To Do", // unreconciled
    manualReconciled: false,
  },
  {
    claimNumber: "CLM-OTH-002",
    insuranceCompany: "HDFC Ergo",
    chequeNumber: "CHQ1002",
    chequeReceivedDate: "2024-06-19",
    claimedDate: "2024-05-05",
    claimedAmount: 100000,
    approvedAmount: 95000,
    settledAmount: 94000,
    status: "In Progress", // unreconciled
    manualReconciled: false,
  },
  {
    claimNumber: "CLM-OTH-003",
    insuranceCompany: "Oriental Insurance",
    chequeNumber: "CHQ1003",
    chequeReceivedDate: "2024-06-20",
    claimedDate: "2024-03-12",
    claimedAmount: 85000,
    approvedAmount: 80000,
    settledAmount: 78000,
    status: "Exception", // unreconciled
    manualReconciled: false,
  },
  {
    claimNumber: "CLM-OTH-004",
    insuranceCompany: "Bajaj Allianz",
    chequeNumber: "CHQ1004",
    chequeReceivedDate: "2024-06-15",
    claimedDate: "2024-02-28",
    claimedAmount: 95000,
    approvedAmount: 91000,
    settledAmount: 90000,
    status: "Rejected", // unreconciled
    manualReconciled: false,
  },
  {
    claimNumber: "CLM-OTH-005",
    insuranceCompany: "National Insurance",
    chequeNumber: "CHQ1005",
    chequeReceivedDate: "2024-06-16",
    claimedDate: "2024-01-15",
    claimedAmount: 72000,
    approvedAmount: 70000,
    settledAmount: 69000,
    status: "In Progress", // unreconciled
    manualReconciled: false,
  },
];

export const claimsData  = [
  {
    claimNumber: "CLM-1001",
    chequeNumber: "CHQ-982347",
    claimedAmount: 25000,
    approvedAmount: 24000,
    settledAmount: 24000,
    depositAmount: 24000,
    varianceAmount: 1000,
    status: "Settled",
    claimAge: "0-15 days",
    insuranceCompany: "HDFC Ergo",
    chequeReceivedDate: "2025-06-10",
    claimedDate: "2025-05-26",
    depositDate: "2025-06-15",
    cardNumberUhid: "UHID-859102",
  },
  {
    claimNumber: "CLM-1002",
    chequeNumber: "CHQ-892347",
    claimedAmount: 30000,
    approvedAmount: 28000,
    settledAmount: 27000,
    depositAmount: 27000,
    varianceAmount: 2000,
    status: "Approved",
    claimAge: "15-30 days",
    insuranceCompany: "ICICI Lombard",
    chequeReceivedDate: "2025-06-12",
    claimedDate: "2025-05-23",
    depositDate: "2025-06-18",
    cardNumberUhid: "UHID-184275",
  },
  {
    claimNumber: "CLM-1003",
    chequeNumber: "CHQ-782347",
    claimedAmount: 18000,
    approvedAmount: 18000,
    settledAmount: 18000,
    depositAmount: null,
    varianceAmount: 0,
    status: "Pending",
    claimAge: "0-10 days",
    insuranceCompany: "Bajaj Allianz",
    chequeReceivedDate: "2025-06-18",
    claimedDate: "2025-06-10",
    depositDate: null,
    cardNumberUhid: "UHID-376492",
  },
  {
    claimNumber: "CLM-1004",
    chequeNumber: "CHQ-679821",
    claimedAmount: 42000,
    approvedAmount: 40000,
    settledAmount: 40000,
    depositAmount: 40000,
    varianceAmount: 2000,
    status: "Settled",
    claimAge: "15-25 days",
    insuranceCompany: "Tata AIG",
    chequeReceivedDate: "2025-06-05",
    claimedDate: "2025-05-20",
    depositDate: "2025-06-10",
    cardNumberUhid: "UHID-940152",
  },
];
