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
import AdminDashboard from "views/Dashboard/AdminDashboard.jsx";
import UserDashboard from "views/Dashboard/UserDashboard.jsx";

import UserProfile from "views/UserProfile/UserProfile.jsx";
// import TableList from "views/TableList.jsx";
// import Typography from "views/Typography.jsx";
// import Icons from "views/Icons.jsx";
// import Maps from "views/Maps/Maps.jsx";
// import Notifications from "views/Notifications.jsx";
import CompanyList from 'views/Company/CompanyList';
// import AdminProjectList from 'views/Project/AdminProjectList';
// import UserProjectList from 'views/Project/UserProjectList';

import CompanyDetails from 'views/Company/CompanyDetails';
import ProjectDetails from 'views/Project/ProjectDetails';

import AdminLighthouse from 'views/Lighthouse/AdminLighthouseProject';
import UserLighthouse from 'views/Lighthouse/UserLighthouseProject';

import LighthouseDetails from 'views/Lighthouse/LighthouseDetails';
import UserLighthouseDetails from 'views/Lighthouse/UserLighthouseDetails';

import Account from "views/Account/Account";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: AdminDashboard,
    layout: "/admin",
    invisible: false,
  },
  {
    path: "/company",
    name: "Company",
    icon: "pe-7s-portfolio",
    component: CompanyList,
    layout: "/admin",
    invisible: false,
  },
  {
    path: "/company-info/:companyid",
    name: "Company Details",
    icon: "pe-7s-portfolio",
    component: CompanyDetails,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/lighthouse",
    name: "Lighthouse",
    icon: "pe-7s-magic-wand",
    component: AdminLighthouse,
    layout: "/admin",
    invisible: false,
  },
  {
    path: "/lighthouse-info/:lighthouseid",
    name: "Lighthouse Details",
    icon: "pe-7s-magic-wand",
    component: LighthouseDetails,
    layout: "/admin",
    invisible: true,
  },
  // {
  //   path: "/project",
  //   name: "Projects",
  //   icon: "pe-7s-note2",
  //   component: AdminProjectList,
  //   layout: "/admin",
  //   invisible: false,
  // },
  {
    path: "/project-info/:projectid",
    name: "Project Details",
    icon: "pe-7s-note2",
    component: ProjectDetails,
    layout: "/admin",
    invisible: true,
  },
 
  {
    path: "/account",
    name: "Accounts",
    icon: "pe-7s-users",
    component: Account,
    layout: "/admin",
    invisible: false,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin",
    invisible: false,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: UserDashboard,
    layout: "/user",
    invisible: false,
  },
  {
    path: "/lighthouse",
    name: "Lighthouse",
    icon: "pe-7s-magic-wand",
    component: UserLighthouse,
    layout: "/user",
    invisible: false,
  },
  {
    path: "/lighthouse-info/:lighthouseid",
    name: "Lighthouse Details",
    icon: "pe-7s-magic-wand",
    component: UserLighthouseDetails,
    layout: "/user",
    invisible: true,
  },
  // {
  //   path: "/project",
  //   name: "Projects",
  //   icon: "pe-7s-server",
  //   component: UserProjectList,
  //   layout: "/user",
  //   invisible: false,
  // },
  {
    path: "/project-info/:projectid",
    name: "Project Details",
    icon: "pe-7s-note2",
    component: ProjectDetails,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/user",
    invisible: false,
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
