import Dashboard from "layouts/dashboard";
import Meetings from "layouts/meetings";
import Users from "layouts/users";
import Licenses from "layouts/licenses";
import Profile from "layouts/profile";
import SignOut from "layouts/authentication/sign-out";
import SignIn from "layouts/authentication/sign-in";
import Activate from "layouts/authentication/activate";
import Zoom from "layouts/authentication/zoom";
import SignUp from "layouts/authentication/sign-up";
import Wifi from "layouts/wifi";
import ZoomMeetingCreate from "layouts/meeting-create";
import ZoomMeetingInfo from "layouts/meeting-details";
import ContactUs from "layouts/docs/contact";
import Privacy from "layouts/docs/privacy";
import TOU from "layouts/docs/tou";
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import Help from "layouts/docs/help/help";
import About from "layouts/docs/about";
import Home from "layouts/home";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import LogoutIcon from '@mui/icons-material/Logout';

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: Dashboard,
    noCollapse: true,
    visible: true,
  },
  {
    type: "collapse",
    name: "My meeting",
    key: "meeting",
    route: "/meeting",
    icon: <Office size="12px" />,
    component: Meetings,
    noCollapse: true,
    visible: true,
  },
  {
    type: "collapse",
    name: "members",
    key: "members",
    route: "/members",
    icon: <CreditCard size="12px" />,
    component: Users,
    noCollapse: true,
    visible: true,
  },
  {
    type: "collapse",
    name: "Licenses",
    key: "licenses",
    route: "/licenses",
    icon: <Cube size="12px" />,
    component: Licenses,
    noCollapse: true,
    visible: false,
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
    visible: true,
  },
  {
    type: "collapse",
    name: "Connect Wifi",
    key: "wifi",
    route: "/wifi",
    icon: <CustomerSupport size="12px" />,
    component: Wifi,
    noCollapse: true,
    visible: true,
  },
  {
    type: "collapse",
    name: "Help",
    key: "help",
    route: "/help",
    icon: <HelpCenterIcon size="12px" />,
    component: Help,
    noCollapse: true,
    visible: true,
  },
  {
    type: "collapse",
    name: "Contact Us",
    key: "contact",
    route: "/contact",
    icon: <SupportAgentIcon size="12px" />,
    component: ContactUs,
    noCollapse: true,
    visible: true,
  },
  {
    type: "collapse",
    name: "Sign Out",
    key: "sign-out",
    route: "/authentication/sign-out",
    icon: <LogoutIcon size="12px" />,
    component: SignOut,
    noCollapse: true,
    visible: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: SignIn,
    noCollapse: false,
    visible: false,
  },
  {
    type: "collapse",
    name: "Activate",
    key: "activate",
    route: "/authentication/activate",
    icon: <Document size="12px" />,
    component: Activate,
    noCollapse: false,
    visible: false,
  },
  {
    type: "collapse",
    name: "Activate",
    key: "activate",
    route: "/authentication/zoom",
    icon: <Document size="12px" />,
    component: Zoom,
    noCollapse: false,
    visible: false,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <Document size="12px" />,
    component: SignUp,
    noCollapse: false,
    visible: false,
  },
  {
    type: "collapse",
    name: "meeting",
    key: "meeting",
    route: "/create-meeting",
    icon: <Document size="12px" />,
    component: ZoomMeetingCreate,
    noCollapse: false,
    visible: false,
  },
  {
    type: "collapse",
    name: "meeting",
    key: "meeting",
    route: "/meeting-info",
    icon: <Document size="12px" />,
    component: ZoomMeetingInfo,
    noCollapse: false,
    visible: false,
  },
  {
    type: "collapse",
    name: "privacy",
    key: "privacy",
    route: "/privacy",
    icon: <Document size="12px" />,
    component: Privacy,
    noCollapse: false,
    visible: false,
  },
  {
    type: "collapse",
    name: "tos",
    key: "tos",
    route: "/terms-of-use",
    icon: <Document size="12px" />,
    component: TOU,
    noCollapse: false,
    visible: false,
  },
  {
    type: "collapse",
    name: "tos",
    key: "about",
    route: "/about",
    icon: <Document size="12px" />,
    component: About,
    noCollapse: false,
    visible: false,
  },

  {
    type: "collapse",
    name: "home",
    key: "home",
    route: "/home",
    icon: <Document size="12px" />,
    component: Home,
    noCollapse: false,
    visible: false,
  },
];

export default routes;
