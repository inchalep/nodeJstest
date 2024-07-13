import React, { useEffect, useMemo } from "react";
import Login from "../../components/login";
import { useResolvedPath } from "react-router-dom";
import Registration from "../../components/registration";

const SignUpLogin = (props) => {
  const { pathname } = useResolvedPath();
  const isLoginPath = useMemo(
    () => (pathname === "/login" ? true : false),
    [pathname]
  );
  return (
    <div className='min-h-screen  bg-sky-900 flex justify-center items-center'>
      {isLoginPath ? <Login /> : <Registration />}
    </div>
  );
};

export default SignUpLogin;