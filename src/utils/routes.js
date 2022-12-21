import Register from "../pages/Register";
import Signup from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Paramettres from "../pages/Paramettres";
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
  {
    name: "Paramettres",
    path: "/Paramettres",
    element: Paramettres,
  },
];

export default routes;
