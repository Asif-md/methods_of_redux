export default Object.freeze({
    name: "FREECHARGE_WALLET_REDEMPTION_RULE",
    entryFor: "Redemption Fee",
    transactionType: "REVENUE",
    filterExpression: "",
    entryType: "AR",
    fromExpression: true,
    fromPartyType: "MERCHANT",
    fromParty: "$.transaction.merchant",
    toExpression: false,
    toPartyType: "INTERCHANGE",
    toParty: "PhonePe Private Limited",
    taxable: true,
    taxExemptionThreshold: 0
});