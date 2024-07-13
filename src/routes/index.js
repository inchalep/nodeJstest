import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/home';
import SignUpLogin from '../pages/signup-login';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <SignUpLogin/>,
  },
  {
    path: "/registration",
    element: <SignUpLogin/>,
  },
]);
