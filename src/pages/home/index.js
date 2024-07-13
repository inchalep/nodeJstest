import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { _get } from "../../utils/apiUtil";
import CalculationForm from "../../components/CalculationForm";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [policiesData, setPoliciesData] = useState([]);
  const [currentPolicy, setCurrentPolicy] = useState({});
  const user = useSelector((state) => state.user.data);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const { data } = await _get("policy/get-all-policies");
      setPoliciesData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrPolicy = (e) => {
    setCurrentPolicy(
      policiesData.find((item) => item.policyId === e.target.value)
    );
  };
  const logout = () => {
    dispatch({ type: "SIGNOUT_REQUEST" });
    navigate("/login");
  };

  const renderCalculationForm = useCallback(() => {
    return <CalculationForm currentPolicy={currentPolicy} />;
  }, [currentPolicy]);

  return (
    <div className='min-h-screen  bg-sky-900 p-6'>
      <div>
        <div className='flex flex-col md:flex-row items-end md:items-center justify-end mb-2'>
          <div className='order-1 md:order-2'>
            <p className='w-full text-gray-200 leading-3'>
              Welcome {user.name}
            </p>
            <p className='w-full text-gray-200 leading-6 text-xs'>
              {user.email}
            </p>
            <button className='text-red-300' onClick={logout}>
              logout
            </button>
          </div>
          <h2 className='w-full text-gray-300 text-4xl font-semibold md:w-8/12 order-2 md:order-1 text-center'>
            Policies List
          </h2>
        </div>

        <div className='w-full text-gray-300 pt-11 flex flex-col gap-x-5 sm:flex-row justify-start items-start'>
          <div className='w-full md:w-6/12'>
            <div className='mb-5 flex flex-col md:flex-row gap-x-5 md:items-center'>
              <label className='text-gray-300 text-xl'>Select policy</label>
              <select
                onChange={getCurrPolicy}
                className='py-1 px-2 outline-none border-0 rounded-md shadow-md text-black'
              >
                <option value=''>---Select---</option>
                {policiesData.map((item, index) => {
                  return (
                    <option value={item.policyId} key={index}>
                      {item.policyName}
                    </option>
                  );
                })}
              </select>
            </div>
            {Object.values(currentPolicy).length > 0 ? (
              <>
                <h2>
                  <span className='text-green-500'>Name:</span>{" "}
                  {currentPolicy?.policyName}
                </h2>
                <p>
                  {" "}
                  <span className='text-green-500'>Term:</span>{" "}
                  {currentPolicy?.term}
                </p>
                <p>
                  {" "}
                  <span className='text-green-500'>Sum Assured:</span>{" "}
                  {currentPolicy?.coverageAmount}
                </p>
                <p>
                  <span className='text-green-500'>Description: </span>
                  {currentPolicy?.description}
                </p>
                <p className='font-semibold text-green-500'>benefits:</p>
                {currentPolicy.benefits?.map((item, index) => (
                  <p key={index} className='pl-2'>
                    {" "}
                    - {item}
                  </p>
                ))}
              </>
            ) : null}
          </div>

          {Object.values(currentPolicy).length > 0 ? (
            <div className='w-full md:w-6/12 pt-5 md:pt-0 shadow-lg'>
              {renderCalculationForm()}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
