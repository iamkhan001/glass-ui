import { useState, useEffect, React } from "react";
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
import {getDateTimeNow} from "utils/ext" 

// Soft UI Dashboard React base styles
import {isAuthenticated, getUser} from "utils/session" 
import {countsApi, apiCallSecureGet} from "utils/api"

// Dashboard layout components
import QrLogin from "./components/qrLogin";
import ContactUs from "./components/contactUs";

// Data
function Dashboard() {

  console.log('screen dashboard');

  if(!isAuthenticated()) {
    return <Redirect to='/authentication/sign-in'  />
  }
  

  const [counts, setCounts] = useState({
    'meetings': 0,
    'users': 1,
  })

  const [loadCounts, setLoadCounts] = useState(true);

  const loadCountsFromServer = () => {
      apiCallSecureGet(`${countsApi}?date=${getDateTimeNow()}`, (response) => {
        setLoadCounts(false);
        setCounts(response.data);
      }, (error) => {
        setLoadCounts(false);
      })
  }

  useEffect(() => {loadCountsFromServer();}, [loadCounts])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Upcoming meetings" }}
                count={counts.meetings}
                icon={{ color: "info", component: "today" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Users" }}
                count={counts.users}
                icon={{ color: "info", component: "group" }}
              />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={9}>
              <QrLogin />
            </Grid>
            <Grid item xs={12} lg={3}>
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
