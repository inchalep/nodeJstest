import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { policyIllustrationSchema } from "../../utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { _post } from "../../utils/apiUtil";
import { useDispatch, useSelector } from "react-redux";
import { setIllustrationdata } from "../../store/slices/illustration";
import { useNavigate } from "react-router-dom";

const CalculationForm = ({ currentPolicy }) => {
  const userData = useSelector((state) => state.user.data);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(policyIllustrationSchema),
    defaultValues: {
      dob: userData.dob,
      gender: "",
      sumAssured: currentPolicy.coverageAmount,
      premium: 10000,
      frequency: "",
      pt: 10,
      ppt: 5,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formValues = watch();

  useEffect(() => {
    setValue("sumAssured", currentPolicy.coverageAmount);
  }, [currentPolicy]);

  const formHandler = async (data) => {
    const payload = {
      dob: data.dob,
      sumAssured: parseInt(data.sumAssured),
      modalPremium: parseInt(data.premium),
      premiumFrequency: data.frequency,
      pt: parseInt(data.pt),
      ppt: parseInt(data.ppt),
    };
    try {
      const { data } = await _post(
        "policy/calculate-policy-projected-benefits",
        payload
      );
      dispatch(setIllustrationdata(data));
      navigate("/illustration");
    } catch (error) {
      dispatch(setIllustrationdata([]));
    }
  };
  return (
    <form
      onSubmit={handleSubmit(formHandler)}
      className='p-6 rounded-md border border-gray-400 w-full flex flex-col gap-y-3 bg-sky-900 text-gray-300'
    >
      <div className='flex flex-col relative w-full'>
        <label className='text-sm'>DOB</label>
        <input
          type='date'
          name='dob'
          {...register("dob")}
          className='input-element peer text-sm uppercase'
        />
        {errors.dob ? <span className='err'>{errors.dob.message}</span> : null}
      </div>
      <div className='flex flex-col relative w-full'>
        <label className='text-sm'>Gender</label>
        <select
          name='gender'
          className='text-sm p-1 outline-none border-none text-black'
          {...register("gender")}
        >
          <option value=''>---Select---</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
        {errors.gender ? (
          <span className='err'>{errors.gender.message}</span>
        ) : null}
      </div>
      <div className='flex flex-col relative w-full'>
        <label className='text-sm'>Sum Assured</label>
        <input
          name='sumAssured'
          {...register("sumAssured", { required: true })}
          type='text'
          disabled
          className='input-element peer text-sm'
        />
        {errors.sumAssured ? (
          <span className='err'>{errors.sumAssured.message}</span>
        ) : null}
      </div>
      <div className='flex flex-col relative w-full'>
        <label className='text-sm'>Premium</label>
        <div className='relative'>
          <p className='absolute -top-3 right-0 text-xs'>
            {formValues.premium}
          </p>
          <input
            name='premium'
            {...register("premium", { required: true })}
            type='range'
            min={10000}
            max={50000}
            className='input-element peer text-sm w-full'
          />
        </div>
        {errors.premium ? (
          <span className='err'>{errors.premium.message}</span>
        ) : null}
      </div>
      <div className='flex flex-col relative w-full'>
        <label className='text-sm'>Frequency</label>
        <select
          name='frequency'
          className='text-sm p-1 w-full outline-none border-none text-black'
          {...register("frequency")}
        >
          <option value=''>---Select---</option>
          <option value='halfYearly'>Half Yearly</option>
          <option value='yearly'>Yearly</option>
        </select>
        {errors.frequency ? (
          <span className='err'>{errors.frequency.message}</span>
        ) : null}
      </div>
      <div className='flex flex-col relative w-full'>
        <label className='text-sm'>PT</label>
        <div className='relative'>
          <p className='absolute -top-3 right-0 text-xs'>{formValues.pt}</p>
          <input
            name='pt'
            {...register("pt", { required: true })}
            type='range'
            value={formValues.pt}
            min={10}
            max={20}
            className='input-element peer text-sm w-full'
          />
        </div>
        {errors.pt ? <span className='err'>{errors.pt.message}</span> : null}
      </div>
      <div className='flex flex-col relative w-full'>
        <label className='text-sm'>PPT</label>
        <div className='relative'>
          <p className='absolute -top-3 right-0 text-xs'>{formValues.ppt}</p>
          <input
            name='ppt'
            {...register("ppt", { required: true })}
            type='range'
            value={formValues.ppt}
            min={5}
            max={10}
            className='input-element peer text-sm w-full'
          />
        </div>
        {errors.ppt ? <span className='err'>{errors.ppt.message}</span> : null}
      </div>
      <button
        type='submit'
        className='p-2 mt-5 bg-sky-800 rounded-md text-gray-300'
      >
        Calculate
      </button>
    </form>
  );
};

export default CalculationForm;
