/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
// import TableList from "views/TableList.jsx";
// import Typography from "views/Typography.jsx";
// import Icons from "views/Icons.jsx";
// import Maps from "views/Maps/Maps.jsx";
// import Notifications from "views/Notifications.jsx";
import CompanyList from 'views/Company/CompanyList';
import ProjectList from 'views/Project/ProjectList';
import CompanyDetails from 'views/Company/CompanyDetails';
import ProjectDetails from 'views/Project/ProjectDetails';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/project",
    name: "Projects",
    icon: "pe-7s-note2",
    component: ProjectList,
    layout: "/admin"
  },
  {
    path: "/project-info",
    name: "Project Details",
    icon: "pe-7s-note2",
    component: ProjectDetails,
    layout: "/admin"
  },
  {
    path: "/company",
    name: "Company",
    icon: "pe-7s-portfolio",
    component: CompanyList,
    layout: "/admin"
  },
  {
    path: "/company-info",
    name: "Company Details",
    icon: "pe-7s-portfolio",
    component: CompanyDetails,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },
  // {
  //   path: "login",
  //   name: "Login",
  //   icon: "pe-7s-science",
  //   component: LoginPage,
  //   layout: "/"
  // },
  // {
  //   path: "register",
  //   name: "Register",
  //   icon: "pe-7s-science",
  //   component: LoginPage,
  //   layout: "/"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "pe-7s-bell",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "pe-7s-news-paper",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "pe-7s-science",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "pe-7s-map-marker",
  //   component: Maps,
  //   layout: "/admin"
  // },
];

export default dashboardRoutes;
