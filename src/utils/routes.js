import Register from "../pages/Register";
import Signup from "../pages/SignUp";
import Shops from "../pages/Shops";
import Categories from "../pages/Categories";
import UserProfile from "../pages/UserProfile";
import DetailsShop from "../pages/DetailsShop";
import Products from "../pages/Products";
import Home from "../pages/Home";

const routes = [
  {
    name: "Home",
    path: "/Home",
    element: Home,
  },
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
    name: "Shops",
    path: "/Shops",
    element: Shops,
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
    name: "Categories",
    path: "/Categories",
    element: Categories,
  },
  {
    name: "Products",
    path: "/products",
    element: Products,
  },
];

export default routes;
