import { useState, React } from "react";
import { useHistory, Redirect, Link } from 'react-router-dom'
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import BasicLayout from "layouts/docs/components/BasicLayout";
import SuiAvatar from "components/SuiAvatar";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

import imgMeetingList from "assets/screens/meeting-list.png";
import imgMeetingCreate from "assets/screens/meeting-create.png";
import imgDashboard from "assets/screens/dashboard.png";
import imgUserList from "assets/screens/user-list.png";
import imgZoomConnect from "assets/screens/zoom-connect.png";

import appLogin from "assets/screens/app/login.png";
import appHome from "assets/screens/app/meetings.png";
import appMeetingList from "assets/screens/app/meeting-list.png";
import appScan from "assets/screens/app/scan-qr.png";
import appMeetingStart from "assets/screens/app/meeting-start.png";

import axios from "axios";
const imgWidth = 600

function Documentation() {

  const policy = (
    <Card className="h-100">
          <SuiBox py={2} px={4}>
            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Connect Zoom account
            </SuiTypography>
            <SuiTypography  ml={3} align='justify' fontWeight='light' variant='h6' >
              <p>To access your meetings on ZOOMABLE, you need to connect your zoom account</p>
              <p>Open profile and click on <b>Connect Zoom</b>. you will be redirected to zoom for login and give access of your account to ZOOMABLE</p>
              <img
                  width={imgWidth}
                  src={imgZoomConnect}
                  alt="Create meeting"
                />
            </SuiTypography>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              User Management
            </SuiTypography>
            <SuiTypography   ml={3} align='justify' fontWeight='light' variant='h6' >
              With ZOOMABLE, you can share meetings with your staff or members in your team or organization. <br></br>
              To manage users, click on <b>Members</b> from navigation drawer and you will se list of members.<br></br>
              <img
                  width={imgWidth}
                  src={imgUserList}
                  alt="Create meeting"
                />
              Here you can,
              <ol>
                <li>See list of all members</li>
                <li>Add / Edit Members</li>
                <li>Create QR code for user to login into ZOOMABLE app on Google Glass EE2</li>
                <li>Activate, Deactivate or Delete members</li>
              </ol>
            </SuiTypography>


            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Zoom Meetings
            </SuiTypography>
            <SuiTypography ml={3} align='justify' fontWeight='light' variant='h6' >
              <ol>
                <li>Go to meetigns</li>
                <img
                  width={imgWidth}
                  src={imgMeetingList}
                  alt="Create meeting"
                />
                <li>Click on create meeting button at top right side</li>
                <li>Select users to add into meeting, enter meeting title, agenda, duration, date and time for meeting</li>
                <img
                  width={imgWidth}
                  src={imgMeetingCreate}
                  alt="Create meeting"
                />
              </ol>
              
            </SuiTypography>
            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Login into ZOOMABLE app on your Google Glass EE2
            </SuiTypography>
            <SuiTypography  ml={3} align='justify' fontWeight='light' variant='h6' >
              <ol>
                <li>Login your account on www.zoomable.tech</li>
                <li>On dashboard, you will see QR code of your account</li>
                <img
                  width={imgWidth}
                  src={imgDashboard}
                  alt="Create meeting"
                />
                <li>Open ZOOMABLE app on Google Glass EE2</li>
                <li>If user is not logged in, you will see login button on screen, tap on it to login</li>
                <img
                  width={imgWidth}
                  src={appLogin}
                  alt="Create meeting"
                />
                <li>Scan QR Code on Google Glass EE2 to login</li>
              </ol>
            </SuiTypography>
            <SuiTypography  mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Join Meeting on Google Glass EE2
            </SuiTypography>
            <SuiTypography ml={3} align='justify' fontWeight='light' variant='h6' >
              <ol>
                <li>Open ZOOMABLE app on your Google Glass EE2</li>
                <li>If you are logged into app then you will see menu options on home screen</li>
                <li>Select <b>My Meetings</b> to open meeting list. This screen will list all meetings created in ZOOMABLE web portal</li>
                <img
                  width={imgWidth}
                  src={appHome}
                  alt="Create meeting"
                />
                <li>Navigate into meeting list and tap on meeting you need to join</li>
                <img
                  width={imgWidth}
                  src={appMeetingList}
                  alt="Create meeting"
                />
                <li>Once meeting is started, you can use guestures to navigate between options shown in image below</li>
                <img
                  width={imgWidth}
                  src={appMeetingStart}
                  alt="Create meeting"
                />
              </ol>
            </SuiTypography>

            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Join meeting using QR Code
            </SuiTypography>
            <SuiTypography ml={3} align='justify' fontWeight='light' variant='h6' >
              You can join any zoom meeting on your Google Glass EE2 using ZOOMABLE.
              Follow following steps to join meeting
              <ol>
                <li>Create QR code using zoom meeting link. You can create QR code using any online tool such as <a href="https://www.qrcode-monkey.com/" target={"blank"}>qrcode-monkey</a> </li>
                <li>Open ZOOMABLE app on your Google Glass EE2 and select <b>Scan QR code</b> option</li>
                <img
                  width={imgWidth}
                  src={appScan}
                  alt="Create meeting"
                />
                <li>Now scan QR code created for your zoom meeting link and meeting will be joined</li>
              </ol>
            </SuiTypography>
            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              App guestures
            </SuiTypography>
            <SuiTypography ml={3} align='justify' fontWeight='light' variant='h6' >
              <ol>
                <li><b>Swipe Left / Right:</b> Navigate between options on screen</li>
                <li><b>Swipe Down:</b> Back or Exit from screen or app</li>
              </ol>
            </SuiTypography>
            <SuiTypography mt={2} variant="h4" fontWeight="medium" textTransform="capitalize">
              Voice Commands
            </SuiTypography>
            <SuiTypography ml={3} align='justify' fontWeight='light' variant='h6' >
              You can use voice commands to access app features. for every command you need to say wake-up keyword <b>"OK Glass"</b>
              <ol>
                <li><b>Ok Glass, My Meeting:</b> Open my meetings</li>
                <li><b>Ok Glass, (Meeting title):</b> In Meetings screen, you can say meeting title or name followed by wake up word to join meeting</li>
                <li><b>Ok Glass, Instant Meeting:</b> Start Instant Meeting</li>
                <li><b>Ok Glass, Scan QR:</b> Scan QR Code to join meeting</li>
                <li><b>Ok Glass, Logout:</b> Logout account from app</li>
                <li><b>Ok Glass, Back:</b> Back to previous screen</li>
              </ol>
            </SuiTypography>
          </SuiBox>
      </Card>
    )

  return (
    <BasicLayout
      title="HELP"
      description="ZOOMABLE"
      image={curved6}
    >
      <Card p={3}>
        {policy}
      </Card>
    </BasicLayout>
  );
}

export default Documentation;
