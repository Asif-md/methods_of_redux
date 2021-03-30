import ShowFixedCommissionRule from "components/show_rules/show_fixed_commission_rule";
import ShowFixedInterchangeFeeRule from "components/show_rules/show_fixed_interchange_fee_rule";
import ShowAccountingEntryRule from "components/show_rules/show_accounting_entry_rule";
import ShowSlabbedFixedCommissionRule from "components/show_rules/show_slabbed_fixed_commission_rule";
import ShowSlabbedFixedInterchangeFeeRule from "components/show_rules/show_slabbed_fixed_interchange_fee_rule";
import ShowAccountingPreCalEntryRule from "components/show_rules/show_accounting_pre_cal_rule";

export default function getRuleComponentForShow(ruleType) {
  switch (ruleType) {
    case "FIXED_COMMISSION_RULE":
    case "FIXED_RATE_COMMISSION_RULE":
      return ShowFixedCommissionRule;
    case "FIXED_INTERCHANGE_FEE_RULE":
    case "FIXED_RATE_INTERCHANGE_FEE_RULE":
      return ShowFixedInterchangeFeeRule;
    case "SLABBED_FIXED_COMMISSION_RULE":
    case "SLABBED_FIXED_RATE_COMMISSION_RULE":
      return ShowSlabbedFixedCommissionRule;
    case "SLABBED_FIXED_INTERCHANGE_FEE_RULE":
    case "SLABBED_FIXED_RATE_INTERCHANGE_FEE_RULE":
      return ShowSlabbedFixedInterchangeFeeRule;
    case "ACCOUNT_ENTRY_RULE_V2":
      return ShowAccountingEntryRule;
      case "PRE_CALCULATED_RATE_CARD_RULE_V2":
        return ShowAccountingPreCalEntryRule;
    default:
      return null;
  }
}
