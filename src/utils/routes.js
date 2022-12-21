import Register from "../pages/Register";
import Signup from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
const routes = [
  {
    name: "Register",
    path: "/",
    element: Register,
  },
  {
    name: "SignupPage",
    path: "/signup",
    element: Signup,
  },
  {
    name: "Dashboard",
    path: "/Dashboard",
    element: Dashboard,
  },
];

export default routes;
