import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import SignUpLogin from "../pages/signup-login";
import IllustrationView from "../template";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <SignUpLogin />,
  },
  {
    path: "/registration",
    element: <SignUpLogin />,
  },
  {
    path: "illustration",
    element: <IllustrationView />,
  },
]);
