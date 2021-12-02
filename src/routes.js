// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Meetings from "layouts/meetings";
import Users from "layouts/users";
import Licenses from "layouts/licenses";
import Profile from "layouts/profile";
import SignOut from "layouts/authentication/sign-out";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Wifi from "layouts/wifi";
import Account from "layouts/account";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";


const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: Dashboard,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "My Meetings",
    key: "meetings",
    route: "/meetings",
    icon: <Office size="12px" />,
    component: Meetings,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    route: "/users",
    icon: <CreditCard size="12px" />,
    component: Users,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Licenses",
    key: "licenses",
    route: "/licenses",
    icon: <Cube size="12px" />,
    component: Licenses,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: Profile,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Connect Wifi",
    key: "wifi",
    route: "/wifi",
    icon: <CustomerSupport size="12px" />,
    component: Wifi,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Account",
  //   key: "account",
  //   route: "/account",
  //   icon: <CustomerSupport size="12px" />,
  //   component: Account,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Sign Out",
    key: "sign-out",
    route: "/authentication/sign-out",
    icon: <Document size="12px" />,
    component: SignOut,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: SignIn,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <Document size="12px" />,
    component: SignUp,
    noCollapse: true,
  },
];

export default routes;
