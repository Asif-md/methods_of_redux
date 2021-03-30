export default Object.freeze({
    name:  "Fee Payable To PG For Ext Wallet Topup",
    entryFor: "TopUp Fee",
    transactionType: "TOPUP_FEE",
    filterExpression: "",
    entryType: "AP",
    fromPartyType: "INTERCHANGE",
    fromParty: "FXMPG",
    toExpression: true,
    toPartyType: "INTERCHANGE",
    toParty: '$.transaction.pgId',
    taxable: true
});