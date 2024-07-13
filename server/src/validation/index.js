const Yup = require("yup");
const moment = require("moment");

Yup.addMethod(Yup.string, "isValidDate", function (errorMessage) {
  return this.test("isValidDate", errorMessage, function (value) {
    const { path, createError } = this;
    return (
      moment(value, "YYYY-MM-DD", true).isValid() ||
      createError({ path, message: errorMessage })
    );
  });
});

Yup.addMethod(Yup.string, "isValidAge", function (errorMessage) {
  return this.test("isValidAge", errorMessage, function (value) {
    const { path, createError } = this;
    const birthDate = moment(value, "YYYY-MM-DD");
    const currentAge = moment().diff(birthDate, "years");
    return (
      (currentAge >= 23 && currentAge <= 56) ||
      createError({ path, message: errorMessage })
    );
  });
});

const registrationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  dob: Yup.string().required("DOB is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  cPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const illustrationSchema = Yup.object().shape({
  dob: Yup.string()
    .required("DOB is required")
    .isValidDate("Date must be in the format YYYY-MM-DD")
    .isValidAge("min age is 23 and max age is 56"),
  sumAssured: Yup.number().required("Sum Assured is required"),
  modalPremium: Yup.number().required("Premium is required"),
  premiumFrequency: Yup.string()
    .required("Frequency is required")
    .oneOf(["halfYearly", "yearly"]),
  ppt: Yup.number().required("PPT is required").min(5).max(10),
  pt: Yup.number()
    .required("PT is required")
    .min(10)
    .max(20)
    .test("ppt", "Premium term must be greater PPT", function (value) {
      const { ppt } = this.parent;
      return ppt <= value;
    }),
});

module.exports = {
  registrationSchema,
  loginSchema,
  illustrationSchema,
};
