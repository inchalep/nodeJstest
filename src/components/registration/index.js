import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signUpFormValidationSchema } from "../../utils/validations";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpFormValidationSchema),
  });
  console.log(errors, "errors--");
  const formHandler = (data) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(formHandler)}
      className='p-7 py-12 shadow-lg rounded-md border border-gray-600 flex flex-col gap-y-6 w-full md:w-7/12 lg:w-4/12'
    >
      <h2 className='text-center text-gray-300 font-semibold text-xl'>
        Sign Up
      </h2>
      <div className='flex flex-col relative'>
        <label className='text-gray-300 text-sm'>Name</label>
        <input
          type='text'
          {...register("name")}
          className='input-element peer text-sm'
        />
        {errors.name ? (
          <span className='err'>{errors.name.message}</span>
        ) : null}
      </div>
      <div className='flex flex-col relative'>
        <label className='text-gray-300 text-sm'>DOB</label>
        <input
          type='date'
          {...register("dob")}
          className='input-element peer text-sm uppercase'
        />
        {errors.dob ? <span className='err'>{errors.dob.message}</span> : null}
      </div>
      <div className='flex flex-col relative'>
        <label className='text-gray-300 text-sm'>Mobile</label>
        <input
          type='text'
          {...register("mobile")}
          className='input-element peer text-sm'
        />
        {errors.mobile ? (
          <span className='err'>{errors.mobile.message}</span>
        ) : null}
      </div>
      <div className='flex flex-col relative'>
        <label className='text-gray-300 text-sm'>Email</label>
        <input
          type='text'
          {...register("email")}
          className='input-element peer text-sm'
        />
        {errors.email ? (
          <span className='err'>{errors.email.message}</span>
        ) : null}
      </div>
      <div className='flex flex-col relative'>
        <label className='text-gray-300 text-sm'>Password</label>
        <input
          type='password'
          {...register("password")}
          className='input-element peer text-sm'
        />
        {errors.password ? (
          <span className='err'>{errors.password.message}</span>
        ) : null}
      </div>
      <div className='flex flex-col relative'>
        <label className='text-gray-300 text-sm'>Confirm password</label>
        <input
          type='password'
          {...register("cPassword")}
          className='input-element peer text-sm'
        />
        {errors.cPassword ? (
          <span className='err'>{errors.cPassword.message}</span>
        ) : null}
      </div>
      <button
        type='submit'
        className='p-2 mt-5 bg-sky-800 text-gray-300 rounded-md'
      >
        Sign Up
      </button>
      <p className='text-gray-400'>
        You have an account ?{" "}
        <Link className='underline' to={"/login"}>
          click here.
        </Link>
      </p>
    </form>
  );
};

export default Registration;
