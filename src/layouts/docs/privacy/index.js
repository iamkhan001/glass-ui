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
import { Box } from "@mui/material";

function Privacy() {

  const policy = (
    <Card className="h-100">
          <SuiBox py={2} px={4}>
            <SuiTypography  align='justify' fontWeight='light' variant='h6' >
              <p>At ZCONNECT accessible from <a href="https://ZCONNECT.tech">ZCONNECT.tech</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ZCONNECT.tech and how we use it.</p>
              <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>
              <p>This Privacy Policy applies only to our online activities and is valid for users of our website with regards to the information that they shared and/or collect in ZCONNECT.tech. This policy is not applicable to any information collected offline or via channels other than this website. </p>
            </SuiTypography>
            <SuiBox opacity={0.3}>
              <Divider />
            </SuiBox>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Consent
            </SuiTypography>
            <SuiTypography ml={3} align='justify' fontWeight='light' variant='h6' >
              <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
            </SuiTypography>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Information we collect
            </SuiTypography>
            <SuiTypography ml={3} align='justify' fontWeight='light' variant='h6' >
              <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
              <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
              <p>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>
            </SuiTypography>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              How we use your information
            </SuiTypography>
            <SuiTypography ml={3} align='justify' fontWeight='light' variant='h6' >
              <p>We use the information we collect in various ways, including to:</p>
              <Box ml={2}>
                <ul >
                  <li>Provide, operate, and maintain our website</li>
                  <li>Improve, personalize, and expand our website</li>
                  <li>Understand and analyze how you use our website</li>
                  <li>Develop new products, services, features, and functionality</li>
                  <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                  <li>Send you emails</li>
                  <li>Find and prevent fraud</li>
                </ul>
              </Box>
            </SuiTypography>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Log Files
            </SuiTypography>
            <SuiTypography ml={3} align='justify' fontWeight='light' variant='h6' >
              <p>ZCONNECT.tech follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>
            </SuiTypography>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Cookies and Web Beacons
            </SuiTypography>
            <SuiTypography ml={3} align='justify' fontWeight='light' variant='h6' >
              <p>Like any other website, ZCONNECT.tech uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
            </SuiTypography>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Advertising Partners Privacy Policies
            </SuiTypography>
            <SuiTypography ml={3} align='justify' fontWeight='light' variant='h6' >
              <p>You may consult this list to find the Privacy Policy for each of the advertising partners of ZCONNECT.tech. </p>
              <p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on ZCONNECT.tech, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
              <p>Note that ZCONNECT.tech has no access to or control over these cookies that are used by third-party advertisers.</p>
            </SuiTypography>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Third Party Privacy Policies
            </SuiTypography>
            <SuiTypography ml={3} align='justify' fontWeight='light' variant='h6' >
              <p>ZCONNECT.tech's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p>
              <p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>
            </SuiTypography>
          </SuiBox>
      </Card>
    )

  return (
    <BasicLayout
      title="PRIVACY POLICY"
      description="ZCONNECT"
      image={curved6}
    >
      <Card p={3}>
        {policy}
      </Card>
    </BasicLayout>
  );
}

export default Privacy;
