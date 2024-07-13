const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  policyId: {
    type: String,
    required: true,
    unique: true,
  },
  policyName: {
    type: String,
    required: true,
  },
  policyType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverageAmount: {
    type: Number,
    required: true,
  },
  premium: {
    type: Number,
    required: true,
  },
  term: {
    type: String,
    required: true,
  },
  benefits: {
    type: [String],
    required: true,
  },
  exclusions: {
    type: [String],
    required: true,
  },
  riders: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        sumAssured: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("policies", policySchema);
