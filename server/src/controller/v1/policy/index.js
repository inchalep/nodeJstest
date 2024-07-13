const Policy = require("../../../models/policies");
const getAllPolicies = async (req, res) => {
  try {
    const data = await Policy.find();
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const calculateBenifitIllustration = async (req, res) => {
  const { dob, sumAssured, modalPremium, premiumFrequency, pt, ppt } = req.body;
  try {
    const currentYear = new Date().getFullYear();
    const birthYear = parseInt(dob.split("-")[0], 10);
    const age = currentYear - birthYear;
    const annualBonusRate = 8.4;

    let totalPremiumsPaid = 0;
    let totalBenefit = sumAssured;
    const annualBonus = sumAssured * annualBonusRate;
    const halfYearlyBonus = annualBonus / 2;

    let resultArray = [];

    for (let year = 1; year <= pt; year++) {
      let premiumThisYear = 0;
      let bonusAmount = 0;

      if (premiumFrequency === "yearly") {
        if (year <= ppt) {
          premiumThisYear = modalPremium;
          totalPremiumsPaid += modalPremium;
        }
        if (year <= pt) {
          bonusAmount = annualBonus;
          totalBenefit += annualBonus;
        }
      } else if (premiumFrequency === "halfYearly") {
        if (year <= ppt * 2) {
          premiumThisYear = modalPremium / 2;
          totalPremiumsPaid += modalPremium / 2;
          totalPremiumsPaid += modalPremium / 2;
        }
        if (year <= pt) {
          bonusAmount = halfYearlyBonus * 2;
          totalBenefit += halfYearlyBonus;
          totalBenefit += halfYearlyBonus;
        }
      }

      let netCashflows = premiumThisYear - bonusAmount;

      resultArray.push({
        "Policy Year": year,
        Premium: premiumThisYear,
        "Sum Assured": sumAssured,
        "Bonus Rate": annualBonusRate,
        "Bonus Amount": bonusAmount,
        "Total Benefit": totalBenefit,
        "Net Cashflows": netCashflows,
      });
    }

    res.status(200).json({
      success: true,
      data: resultArray,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllPolicies,
  calculateBenifitIllustration,
};
