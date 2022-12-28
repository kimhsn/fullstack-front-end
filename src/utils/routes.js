import Register from "../pages/Register";
import Signup from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Paramettres from "../pages/Paramettres";
import UserProfile from "../pages/UserProfile";
import DetailsShop from "../pages/DetailsShop";
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
    name: "Dashboard",
    path: "/detailsshop/:id",
    element: DetailsShop,
  },
  {
    name: "UserProfile",
    path: "/userprofile",
    element: UserProfile,
  },
  {
    name: "Paramettres",
    path: "/Paramettres",
    element: Paramettres,
  },
];

export default routes;
