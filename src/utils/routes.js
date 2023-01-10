import Register from "../pages/Register";
import Signup from "../pages/SignUp";
import Shops from "../pages/Shops";
import Categories from "../pages/Categories";
import UserProfile from "../pages/UserProfile";
import DetailsShop from "../pages/DetailsShop";
import DetailsCategory from "../pages/DetailsCategory";
import Products from "../pages/Products";
import Home from "../pages/Home";
import Users from "../pages/Users";

const routes = [
  {
    name: "Home",
    path: "/Home",
    element: Home,
  },
  {
    name: "user",
    path: "/Users",
    element: Users,
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
    name: "DetailsShop",
    path: "/detailsshop/:id",
    element: DetailsShop,
  },
  {
    name: "DetailsCategory",
    path: "/detailscategory/:id",
    element: DetailsCategory,
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
