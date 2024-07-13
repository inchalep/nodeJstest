const Policy = require("../../../models/policies");
const getAllPolicies = async (req, res) => {
  try {
    const data = await Policy.find();
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = {
  getAllPolicies,
};
