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
            <SuiTypography align='justify' mt={2} fontWeight='light' variant='h6' ><p>ZOOMABLE is a Singapore-headquartered developer of applied AI and robotics technology for a variety of different environments including home, school, healthcare, industrial, F&B, and retail. The distributor in Singapore for MI Robots, Ohmnilabs telepresence robot, Niryo education robot and Google Glass EE2, reseller of temi robot. Providers of AI-related customize software development and associated IT services for advanced robotics applications.</p></SuiTypography>
            <SuiTypography align='justify' mt={2} fontWeight='light' variant='h6' ><p>Founded in June 2018, ZOOMABLE is a Singapore-headquartered developer of applied AI and robotics technology for a variety of different environments including home, school, healthcare, industrial, F&B, and retail. The distributor in Singapore for MI Robots, Niryo education robot and Ohmnilabs telepresence robot. As well as Google Glass EE2. ZOOMABLE is provider of AI-related customize software development and associated IT services for advanced robotics applications.</p></SuiTypography>
            <SuiTypography align='justify' mt={2} fontWeight='light' variant='h6' ><p>ZOOMABLE works with Chinese/Taiwanese/USA/France manufacturers for different type of robots and is the re-seller of temi. The company creates state-of-the-art robotics products that meet customers’ exacting requirements, solving robotics problems using the latest cutting edge technologies. Offering innovative products to help customers’ run their businesses more effectively and save costing, ZOOMABLE delivers the solutions which allow today’s advanced personal robots to integrate into all aspects of our everyday lives, both at home and in the workplace.</p></SuiTypography>
            <SuiTypography align='justify' mt={2} fontWeight='light' variant='h6' ><p>The company’s bespoke robotics systems encompass such advanced applied technologies as AI Systematic assessments. By grading user responses by speech, text, and visual feedback, ZOOMABLE can deliver emotional analysis, textual analysis, grammatical evaluation, and image-to text-representation.</p></SuiTypography>
            <SuiTypography align='justify' mt={2} fontWeight='light' variant='h6' ><p>ZOOMABLE also provides web development and integration and Android & iOS mobile application development to grow robot-enabled businesses, allowing early-stage entrepreneurs to transform their raw ideas into reality using cutting-edge robotic technologies.</p></SuiTypography>
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