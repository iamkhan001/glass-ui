import Card from "@mui/material/Card";
import { useHistory, Redirect, useLocation, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from "react";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import { func } from "prop-types";
import { from } from "stylis";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import {isAuthenticated, getUser, getUserEmail} from "utils/session" 
import {Alert, AlertTitle} from "@mui/material";
import {progressDialog, alertDialog, showToastMessage} from "utils/diloag"
import ArrowBack from '@mui/icons-material/ArrowBack';

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Table";
import SuiButton from "components/SuiButton";
import Icon from "@material-ui/core/Icon";
import {meetingsApi, usersApi, apiCallSecureGet, apiPostSecure} from "utils/api"
import {dateToShowFormat, dateToServerFormat} from "utils/ext"
import data from "layouts/dashboard/components/Projects/data";

// Custom styles for the Tables

// Data

function getAlert(msg) {
  let view = null;

  if(msg) {
    view = (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
         {msg}
      </Alert>
    )
  }

  return view;
}

function Tables() {

  if(!isAuthenticated()) {
    return <Redirect to='/authentication/sign-in'  />
  }

  const history = useHistory();
  const location = useLocation();

  const [error, setError] = useState('');
  const [progressTitle, setProgressTitle] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [loadMeetings, setLoadMeetings] = useState(true);
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [meetingId, setMeetingId] = useState(location.state.meetingId);


  const handleClose = (event, reason) => {
    
    if (reason === 'clickaway') {
      return;
    }
    setShowToast(false);
  };


  function onCopyText(text) {
    navigator.clipboard.writeText(text);
    console.log('copy >> ', text);
    setShowToast(true)
  }

  function copyJoinDetails(mDetails) {
      onCopyText(
        `Agenda: ${mDetails.agenda}\nMeeting Id: ${mDetails.id}\nTime: ${dateToShowFormat(mDetails.start_time, mDetails.timezone)}\nPassword: ${mDetails.password}\nJoin Url: ${mDetails.join_url}`
      )
  }

  function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }
 
  function MeetingInfoCard({details, info}) {
    const labels = [];
    const values = [];
  
    // Convert this form `objectKey` of the object key in to this `object key`
    Object.keys(info).forEach((el) => {
      if (el.match(/[A-Z\s]+/)) {
        const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
        const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);
  
        labels.push(newElement);
      } else {
        labels.push(el);
      }
    });
  
    // Push the object values into the values array
    Object.values(info).forEach((el) => values.push(el));
  
    // Render the card info items
    const renderItems = labels.map((label, key) => (
      <SuiBox key={label} display="flex" py={1} pr={2}>
        <SuiTypography variant="button" fontWeight="bold" textTransform="capitalize">
          {label}: &nbsp;
        </SuiTypography>
        <SuiTypography variant="button" fontWeight="regular" textColor="text">
          &nbsp;{values[key]}
        </SuiTypography>
      </SuiBox>
    ));
  
    return (
      <SuiBox className="h-100">
        <SuiBox>
         {renderItems}
        </SuiBox>
        <SuiBox display="flex" justifyContent="end" alignItems="center" p={2} px={2}>
          <SuiButton onClick={() => {copyJoinDetails(details)}}>Copy Join Detail</SuiButton>
          <SuiBox mx={2}>
            <SuiButton buttonColor='info' mx={2} onClick={() => {openInNewTab(details.start_url)}} >Start Meeting</SuiButton>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    );
  }
  

function setMeetingData(info) {

}

function getMeetingDetails(details) {
  if(details === null) {
    return null
  }
  const meetingInfo = {
      'Id': details.id,
      'PMI': details.pmi,
      'Password': details.password,
      'Host': details.host_email,
      'Time': dateToShowFormat(details.start_time, details.timezone),
      'Time Zone': details.timezone,
      'Duration': details.duration,
      'Topic': details.topic,
      'Agenda': details.agenda,
      'Join Url': details.join_url,
  }
  return (
    <MeetingInfoCard details={details} info= {meetingInfo} />
  )
}

const loadZoomMeetings = async () => {
    console.log('loadZoomMeetings');
    const body = {
      'action': 'info',
      'meeting': meetingId
    }
    apiPostSecure(meetingsApi, body,
    (response) => {
        if(response.code === 200) {
          setMeetingDetails(response.data)
        }else {
          setError(response.data)
        }
        setProgressTitle("")
        setLoadMeetings(false);
    },
    (errorMsg) => {
      setProgressTitle("")
        console.log('error >>> ', errorMsg);
        setLoadMeetings(false);
        setError('Something went wrong!');
        setInterval( () => {setError('')}, 3000);
        console.log('ui error', errorMsg||'Error');
      }
    )
}
console.log('meeting', meetingId)

function onBack() {
  console.log('on back');
  history.goBack();
}

useEffect(() => {loadZoomMeetings();}, [loadMeetings])

  return (
    <DashboardLayout>
    <DashboardNavbar />
    <SuiBox py={3}>
      <SuiBox mb={3}>
      {showToastMessage(showToast, "success", "copied to clipboard!", handleClose)}
      {getAlert(error)}
      {progressDialog(progressTitle)}
      <Card className="h-100">
          <SuiBox pt={2} px={2}>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center">
              <SuiBox display="flex" flexDirection="row">
                <Button variant="text" fontWeight="medium" textColor="text" onClick={() => onBack()}>
                  <ArrowBack color="secondary" />
                </Button>
                <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                  Meeting Detail
                </SuiTypography>
              </SuiBox>
            </SuiBox>
            <SuiBox opacity={0.3}>
              <Divider />
            </SuiBox>
            {getMeetingDetails(meetingDetails)}
          </SuiBox>
      </Card>
      </SuiBox>
    </SuiBox>
    <Footer />
  </DashboardLayout>
  );
}

export default Tables;
