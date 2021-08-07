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
import CompanyList from 'views/Company/CompanyList';

import CompanyDetails from 'views/Company/CompanyDetails';
import ProjectDetails from 'views/Project/ProjectDetails';
import AdminProjectDetails from 'views/Project/AdminProjectDetails';

import AdminLighthouse from 'views/Lighthouse/AdminLighthouseProject';
import UserLighthouse from 'views/Lighthouse/UserLighthouseProject';
import UserAddLighthouse from 'views/Lighthouse/UserAddLighthouse';

import AdminLighthouseDetails from 'views/Lighthouse/AdminLighthouseDetails';
import UserLighthouseDetails from 'views/Lighthouse/UserLighthouseDetails';

import Account from "views/Account/Account";
import ProjectUpdate from "views/Project/ProjectUpdate";
import AdminProjectUpdate from "views/Project/AdminProjectUpdate";
import AddProject from "views/Project/AddProject";

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
    path: "/add-company",
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
    component: AdminLighthouseDetails,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/project-info/:projectid",
    name: "Project Details",
    icon: "pe-7s-note2",
    component: AdminProjectDetails,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/add-project/:lighthouseid",
    name: "Add Project",
    icon: "pe-7s-note2",
    component: AddProject,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/project-update/:projectId",
    name: "Projects",
    icon: "pe-7s-server",
    component: AdminProjectUpdate,
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
  {
    path: "/add-lighthouse/:companyId",
    name: "Add New Lighthouse",
    icon: "pe-7s-magic-wand",
    component: UserAddLighthouse,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/project-update/:projectId",
    name: "Projects",
    icon: "pe-7s-server",
    component: ProjectUpdate,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/project-info/:projectid",
    name: "Project Details",
    icon: "pe-7s-note2",
    component: ProjectDetails,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/add-project/:lighthouseid",
    name: "Add Project",
    icon: "pe-7s-note2",
    component: AddProject,
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
];

export default dashboardRoutes;
