/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SuiButton from "components/SuiButton";

import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";
// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import {zoomConnectUrl} from '../../../../utils/api'

// Soft UI Dashboard PRO React example components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Custom styles for Header
import styles from "layouts/profile/components/Header/styles";

// Images
import jovy from "assets/images/team-1.jpg";
import {getCompanyId, isZoomConnected, isAdmin} from "../../../../utils/session"

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const classes = styles();

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  function openInNewTab() {
    const win = window.open(`${zoomConnectUrl}${getCompanyId()}`);
    win.focus();
  }

  function getConnectView() {
    console.log('zoom', isZoomConnected())
    if (!isZoomConnected()) {
        if(isAdmin()) {
          return (
            <Grid item xs={12} md={6} lg={4} fullWidth  className="ml-auto" style={{ display: "flex" }}>
              <SuiButton style={{ marginLeft: "auto" }} variant="gradient" buttonColor="info" onClick={() => openInNewTab()} >
                  Connect Zoom
              </SuiButton>
            </Grid>
          )
        }

        return (
          <Grid item xs={12} md={6} lg={4} fullWidth  className="ml-auto" style={{ display: "flex" }}>
            <SuiTypography style={{ marginLeft: "auto" }} variant="button" textColor="text" fontWeight="medium" >
              Zoom not connected
            </SuiTypography>
          </Grid>
        )
    }
    return (
      <Grid item xs={12} md={6} lg={4} fullWidth  className="ml-auto" style={{ display: "flex" }}>
        <SuiTypography style={{ marginLeft: "auto" }} variant="button" textColor="text" fontWeight="medium" >
            Zoom Connected
        </SuiTypography>
      </Grid>
    )
  }

  return (
    <SuiBox position="relative">
      <DashboardNavbar absolute light />
      <SuiBox customClass={classes.profileHeader_background} />
      <Card className={classes.profileHeader_profile}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <SuiAvatar
              src={jovy}
              alt="profile-image"
              variant="rounded"
              size="xl"
              customClass="shadow-sm"
            />
          </Grid>
          <Grid item>
            <SuiBox height="100%" mt={0.5} lineHeight={1}>
              <SuiTypography variant="h5" fontWeight="medium">
                Jovy Chiu
              </SuiTypography>
              <SuiTypography variant="button" textColor="text" fontWeight="medium">
                CEO / Founder
              </SuiTypography>
            </SuiBox>
          </Grid>
          {getConnectView()}
        </Grid>
      </Card>
    </SuiBox>
  );
}

export default Header;
