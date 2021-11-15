import { useState, React } from "react";
import { Redirect, Link } from 'react-router-dom'

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Soft UI Dashboard React base styles
import {isAuthenticated, getUser} from "utils/session" 

// Dashboard layout components
import QrLogin from "./components/qrLogin";
import ContactUs from "./components/contactUs";

// Data
function Dashboard() {

  if(!isAuthenticated()) {
    return <Redirect to='/authentication/sign-in'  />
  }
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Today's meetings" }}
                count="2"
                icon={{ color: "info", component: "today" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total users" }}
                count="4"
                icon={{ color: "info", component: "group" }}
              />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <QrLogin />
            </Grid>
            <Grid item xs={12} lg={5}>
              <ContactUs />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
