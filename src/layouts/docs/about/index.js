import { useState, React } from "react";
import { useHistory, Redirect, Link } from 'react-router-dom'
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import BasicLayout from "layouts/docs/components/BasicLayout";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

import axios from "axios";

function About() {

  const policy = (
    <Card className="h-100">
          <SuiBox p={3} px={2}>
              <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="h6">
                What is ZOOMABLE?
              </SuiTypography>
              <SuiBox opacity={0.3}>
                <Divider />
              </SuiBox>
              <SuiTypography align='justify' fontWeight='light' variant='h6' >
                Using ZOOMABLE, you can access all of your Zoom meeting on Google Glass EE2. You can create meeting by login on zoomable.com, here you can create and manage users / staff in your business and create meeting. We provide simple and easy to use UI on Google Glass EE2 for Zoom meeting. Also you can join any Zoom meeting by just scanning QR code via Google Glass EE2 and join the meeting.
              </SuiTypography>
          </SuiBox>
      </Card>
    )

  return (
    <BasicLayout
      title="ABOUT US"
      description="ZOOMABLE"
      image={curved6}
    >
      <Card>
        {policy}
      </Card>
    </BasicLayout>
  );
}

export default About;