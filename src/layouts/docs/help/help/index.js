import { useState, React } from "react";
import { useHistory, Redirect, Link } from 'react-router-dom'

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import SuiBox from "components/SuiBox";
import Card from "@mui/material/Card";
import BasicLayout from "layouts/docs/components/BasicLayout";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import {content} from '../content'
import {isAuthenticated} from "utils/session" 


function Help() {


  if(isAuthenticated()) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          <Card p={3}>
            {content()}
          </Card>
        </SuiBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <BasicLayout
      title="HELP"
      description="ZOOMABLE"
      image={curved6}
    >
      <Card p={3}>
        {content()}
      </Card>
    </BasicLayout>
  );
}

export default Help;
