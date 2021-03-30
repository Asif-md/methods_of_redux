import PHONEPE_WALLET_TOPUP_PG_FEE from './phonepe_wallet_topup_pg_fee';
import EXTERNAL_WALLET_TOPUP_PG_FEE from './external_wallet_topup_pg_fee';
import DEFAULT_WALLET_TOPUP_PG_FEE from './default_wallet_topup_pg_fee';
import PG_DC_PAYMENT_FEE_RULE from './pg_redemption_dc'
import PG_CC_PAYMENT_FEE_RULE from "./pg_redemption_cc";
import FREECHARGE_WALLET_REDEMPTION_RULE from "./freecharge_wallet_rule"

//List of prefill templates available
const templateList = [
    'PHONEPE_WALLET_TOPUP_PG_FEE',
    'EXTERNAL_WALLET_TOPUP_PG_FEE',
    'PG_DC_PAYMENT_FEE_RULE',
    'PG_CC_PAYMENT_FEE_RULE',
    // 'FREECHARGE_WALLET_REDEMPTION_RULE'
];
//List of rule set which need to show templates available
const templateRuleSetList = [
    'BASIC_RATE_CARD_RULE',
    'COUNT_BASED_RATE_CARD_RULE'
];

//Templates values
const templateListValue = {
    'PHONEPE_WALLET_TOPUP_PG_FEE': PHONEPE_WALLET_TOPUP_PG_FEE,
    'EXTERNAL_WALLET_TOPUP_PG_FEE': EXTERNAL_WALLET_TOPUP_PG_FEE,
    'PG_DC_PAYMENT_FEE_RULE': PG_DC_PAYMENT_FEE_RULE,
    "PG_CC_PAYMENT_FEE_RULE": PG_CC_PAYMENT_FEE_RULE,
    // "FREECHARGE_WALLET_REDEMPTION_RULE": FREECHARGE_WALLET_REDEMPTION_RULE,
    'DEFAULT': DEFAULT_WALLET_TOPUP_PG_FEE
};

export default {
    templateList,
    templateRuleSetList,
    templateListValue
}