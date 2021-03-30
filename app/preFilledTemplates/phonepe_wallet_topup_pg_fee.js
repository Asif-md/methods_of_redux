export default Object.freeze({
    name: "Fee Payable To PG For PP Wallet Topup",
    entryFor: "TopUp Fee",
    transactionType: "TOPUP_FEE",
    filterExpression: "",
    entryType: "AP",
    fromPartyType: "INTERCHANGE",
    fromParty: "FXMPG_TOPUP",
    toExpression: true,
    toPartyType: "INTERCHANGE",
    toParty: '$.transaction.pgId',
    taxable: true,
    taxExemptionThreshold: 0
});