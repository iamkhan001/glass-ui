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
          <SuiBox py={2} px={4}>
            <SuiTypography align='justify' fontWeight='light' variant='h6' >
              <p>At zoomable.tech, accessible from https://zoomable.tech, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by zoomable.tech and how we use it.</p>
              <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>
              <p>This Privacy Policy applies only to our online activities and is valid for users of our website with regards to the information that they shared and/or collect in zoomable.tech. This policy is not applicable to any information collected offline or via channels other than this website. </p>
            </SuiTypography>
            <SuiBox opacity={0.3}>
              <Divider />
            </SuiBox>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Consent
            </SuiTypography>
            <SuiTypography align='justify' fontWeight='light' variant='h6' >
              <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
            </SuiTypography>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Information we collect
            </SuiTypography>
            <SuiTypography align='justify' fontWeight='light' variant='h6' >
              <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
              <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
              <p>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>
            </SuiTypography>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              How we use your information
            </SuiTypography>
            <SuiTypography align='justify' fontWeight='light' variant='h6' >
              <p>We use the information we collect in various ways, including to:</p>
              <ul>
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
              </ul>
            </SuiTypography>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Log Files
            </SuiTypography>
            <SuiTypography align='justify' fontWeight='light' variant='h6' >
              <p>zoomable.tech follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>
            </SuiTypography>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Cookies and Web Beacons
            </SuiTypography>
            <SuiTypography align='justify' fontWeight='light' variant='h6' >
              <p>Like any other website, zoomable.tech uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
            </SuiTypography>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Advertising Partners Privacy Policies
            </SuiTypography>
            <SuiTypography align='justify' fontWeight='light' variant='h6' >
              <p>You may consult this list to find the Privacy Policy for each of the advertising partners of zoomable.tech. </p>
              <p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on zoomable.tech, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
              <p>Note that zoomable.tech has no access to or control over these cookies that are used by third-party advertisers.</p>
            </SuiTypography>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Third Party Privacy Policies
            </SuiTypography>
            <SuiTypography align='justify' fontWeight='light' variant='h6' >
              <p>zoomable.tech's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p>
              <p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>
            </SuiTypography>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              CCPA Privacy Rights (Do Not Sell My Personal Information)
            </SuiTypography>
            <SuiTypography align='justify' fontWeight='light' variant='h6' >
              <p>Under the CCPA, among other rights, California consumers have the right to:</p>
              <p>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>
              <p>Request that a business delete any personal data about the consumer that a business has collected.</p>
              <p>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</p>
              <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
            </SuiTypography>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              GDPR Data Protection Rights
            </SuiTypography>
            <SuiTypography align='justify' fontWeight='light' variant='h6' >
              <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
              <p>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</p>
              <p>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</p>
              <p>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</p>
              <p>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</p>
              <p>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</p>
              <p>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</p>
              <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
            </SuiTypography>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Children's Information
            </SuiTypography>
            <SuiTypography align='justify' fontWeight='light' variant='h6' >
              <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
              <p>zoomable.tech does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
            </SuiTypography>
          </SuiBox>
      </Card>
    )

  return (
    <BasicLayout
      title="PRIVACY POLICY"
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
