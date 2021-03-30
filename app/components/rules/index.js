import * as rules from "components/rules/rule_types";
import FixedCommissionRule from "components/rules/fixed_commission_rule";
import FixedInterchangeFeeRule from "components/rules/fixed_interchange_fee_rule";
import SlabbedFixedCommissionRule from "components/rules/slabbed_fixed_commission_rule";
import SlabbedFixedInterchangeFeeRule from "components/rules/slabbed_fixed_interchange_fee_rule";
import AccountingEntryRule from "components/rules/accounting_entry_rule";
import AccountingPreCalculatedRateRule from "components/rules/accounting_pre_calculated_entry_rule"


//Rate Card Ruleset
import BasicRateCardRule from "components/rules/basic_rate_card_rule";
import CountBasedRateCardRule from "components/rules/count_based_rate_card_rule";

//Composed Merchant Ruleset
import ComposedMerchantRuleSet from "components/rules/composed_merchant_rule_set";
import CampaignRuleSet from "components/rules/composed_campaign_rule_set";


export default function getRuleComponent(ruleType) {
  switch(ruleType) {
    case rules.FIXED_COMMISSION_RULE:
    case rules.FIXED_RATE_COMMISSION_RULE:
      return FixedCommissionRule;
    
    case rules.FIXED_INTERCHANGE_FEE_RULE:
    case rules.FIXED_RATE_INTERCHANGE_FEE_RULE:
      return FixedInterchangeFeeRule;
    
    case rules.SLABBED_FIXED_COMMISSION_RULE:
    case rules.SLABBED_FIXED_RATE_COMMISSION_RULE:
      return SlabbedFixedCommissionRule;
    
    case rules.SLABBED_FIXED_INTERCHANGE_FEE_RULE:
    case rules.SLABBED_FIXED_RATE_INTERCHANGE_FEE_RULE:
      return SlabbedFixedInterchangeFeeRule;
    
    case rules.ACCOUNT_ENTRY_RULE:
      return AccountingEntryRule;

    case rules.BASIC_RATE_CARD_RULE:
      return BasicRateCardRule;
   
      case rules.COUNT_BASED_RATE_CARD_RULE:
      return CountBasedRateCardRule;

    case rules.PRE_CALCULATED_RATE_CARD_RULE:
      return AccountingPreCalculatedRateRule;
      
      case rules.COMPOSED_MERCHANT_RULE_SET:
      return ComposedMerchantRuleSet;

      case rules.COMPOSED_CAMPAIGN_RULE_SET:
      return CampaignRuleSet;

    default:
      return null;
  }
};
