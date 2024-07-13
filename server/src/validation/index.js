const Yup = require("yup");

const registrationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  dob: Yup.string().required("DOB is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  cPassword: Yup.string().required("Confirm password is required"),
});
module.exports = {
  registrationSchema,
};
