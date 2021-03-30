export default Object.freeze({
    name: "PG_DC_PAYMENT_FEE_RULE",
    entryFor: "Payable to PG",
    transactionType: "PG_REDEMPTION_FEE",
    filterExpression: "",
    entryType: "AP",
    fromPartyType: "INTERCHANGE",
    fromParty: "FXMPG",
    toExpression: false,
    toPartyType: "INTERCHANGE",
    toParty: '',
    taxable: true,
    taxExemptionThreshold: 200000
});