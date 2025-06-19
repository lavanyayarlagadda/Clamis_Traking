export const unreconciledClaimsData = [
    {
        claimId: "CLM009",
        ihxRefId: "IHX2024009",
        hospitalName: "Max Healthcare",
        diagnosis: "Cardiovascular Surgery",
        claimedAmount: 150000,
        approvedAmount: 135000,
        differenceAmout: 15000,
        exceptionType: "Amount Mismatch",
        reason: "Claimed amount exceeds approved limit",
        status: "Exception"
    },
    {
        claimId: "CLM010",
        ihxRefId: "IHX2024010",
        hospitalName: "Continental Hospitals",
        diagnosis: "Orthopedic Surgery",
        claimedAmount: 120000,
        approvedAmount: 120000,
        differenceAmout: 0,
        exceptionType: "Documents",
        reason: "Discharge Summary not provided",
        status: "Exception"
    },
    {
        claimId: "CLM011",
        ihxRefId: "IHX2024011",
        hospitalName: "CARE Hospitals",
        diagnosis: "General Surgery",
        claimedAmount: 95000,
        approvedAmount: 85000,
        differenceAmout: 10000,
        exceptionType: "Manual Review Requied",
        reason: "Policy Verification required",
        status: "Exception"
    },
];