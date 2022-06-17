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
            <SuiTypography align='justify' fontWeight='light' variant='h6' ><p>MI Robotic is a Singapore-headquartered developer of applied AI and robotics technology for a variety of different environments including home, school, healthcare, industrial, F&B, and retail. The distributor in Singapore for MI Robots, Ohmnilabs telepresence robot, Niryo education robot and Google Glass EE2, reseller of temi robot. Providers of AI-related customize software development and associated IT services for advanced robotics applications.</p></SuiTypography>
            <SuiTypography align='justify' mt={2} fontWeight='light' variant='h6' ><p>Founded in June 2018, MI Robotic is a Singapore-headquartered developer of applied AI and robotics technology for a variety of different environments including home, school, healthcare, industrial, F&B, and retail. The distributor in Singapore for MI Robots, Niryo education robot and Ohmnilabs telepresence robot. As well as Google Glass EE2. MI Robotic is provider of AI-related customize software development and associated IT services for advanced robotics applications.</p></SuiTypography>
            <SuiTypography align='justify' mt={2} fontWeight='light' variant='h6' ><p>MI Robotic works with Chinese/Taiwanese/USA/France manufacturers for different type of robots and is the re-seller of temi. The company creates state-of-the-art robotics products that meet customers’ exacting requirements, solving robotics problems using the latest cutting edge technologies. Offering innovative products to help customers’ run their businesses more effectively and save costing, MI Robotic delivers the solutions which allow today’s advanced personal robots to integrate into all aspects of our everyday lives, both at home and in the workplace.</p></SuiTypography>
            <SuiTypography align='justify' mt={2} fontWeight='light' variant='h6' ><p>The company’s bespoke robotics systems encompass such advanced applied technologies as AI Systematic assessments. By grading user responses by speech, text, and visual feedback, MI Robotic can deliver emotional analysis, textual analysis, grammatical evaluation, and image-to text-representation.</p></SuiTypography>
            <SuiTypography align='justify' mt={2} fontWeight='light' variant='h6' ><p>MI Robotic also provides web development and integration and Android & iOS mobile application development to grow robot-enabled businesses, allowing early-stage entrepreneurs to transform their raw ideas into reality using cutting-edge robotic technologies.</p></SuiTypography>
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