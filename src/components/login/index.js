import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { loginFormValidationSchema } from "../../utils/validations";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormValidationSchema),
  });
  const formHandler = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(formHandler)}
      className='p-7 py-12 shadow-lg rounded-md border border-gray-600 flex flex-col gap-y-6 w-4/12'
    >
      <h2 className='text-center text-gray-300 font-semibold text-xl'>Login</h2>
      <div className='flex flex-col relative'>
        <label className='text-gray-300 text-sm'>Email</label>
        <input
          {...register("email", { required: true })}
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
      <button
        type='submit'
        className='p-2 mt-5 bg-sky-800 text-gray-300 rounded-md'
      >
        Login
      </button>
      <p className='text-gray-400'>
        Don't have an account ?{" "}
        <Link className='underline' to={"/registration"}>
          click here.
        </Link>
      </p>
    </form>
  );
};

export default Login;
