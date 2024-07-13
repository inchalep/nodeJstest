import * as yup from "yup";

export const loginFormValidationSchema = yup.object({
  email: yup.string().required("Email is required."),
  password: yup.string().required("Password is required."),
});

export const signUpFormValidationSchema = yup.object({
  email: yup.string().required("Email is required."),
  name: yup.string().required("Name is required."),
  mobile: yup.string().required("Mobile no. is required."),
  dob: yup.string().required("DOB is required."),
  password: yup.string().required("Password is required."),
  cPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const policyIllustrationSchema = yup.object({
  dob: yup.string().required("Gender is required."),
  sumAssured: yup.string().required("Sum Assured is required."),
  gender: yup.string().required("Gender is required."),
  premium: yup.string().required("Premium amount is required."),
  frequency: yup.string().required("Frequency is required."),
  pt: yup.string().required("Premium term is required."),
  ppt: yup.string().required("Premium paid term is required."),
});
