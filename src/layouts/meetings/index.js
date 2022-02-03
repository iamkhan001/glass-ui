import Card from "@mui/material/Card";
import { useHistory, Redirect, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from "react";


import { from } from "stylis";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import {isAuthenticated, getUser, getUserEmail} from "utils/session" 
import {Alert, AlertTitle} from "@mui/material";
import {progressDialog, alertDialog, showToastMessage} from "utils/diloag"

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Table";
import SuiButton from "components/SuiButton";
import Icon from "@material-ui/core/Icon";
import {meetingsApi, usersApi, apiCallSecureGet, apiPostSecure} from "utils/api"
import {dateToShowFormat, dateToServerFormat} from "utils/ext"

import {getColoumns, getMeetingRows} from "./data/meetingsTableData";

// Custom styles for the Tables
import styles from "./styles";

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

  const classes = styles();
  const history = useHistory();

  const [error, setError] = useState('');
  const [progressTitle, setProgressTitle] = useState('');
  const [showAlertCancel, setShowAlertCancel] = useState(false);
  const [showAlertTitle, setShowAlertTitle] = useState('');
  const [showAlertMessage, setShowAlertMessage] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  const [meetingId, setMeetingId] = useState('');

  const [loadMeetings, setLoadMeetings] = useState(true);
  const [meetings, setMeetings] = useState([]);

  const columns = getColoumns();

  function showAlert(cancel, title, message) {
    setShowAlertTitle(title);
    setShowAlertMessage(message);
    setShowAlertCancel(cancel);
  }

  const setCreateMeeting = () => {
      history.push('/create-meeting');
  }


  const handleClose = (event, reason) => {
    
    if (reason === 'clickaway') {
      return;
    }
    setShowToast(false);
  };


  function onCopyLink(id, url) {
      // navigator.clipboard.writeText(url);
      // console.log('copy >> ', url);
      // setShowToast(true)
      history.push({
        pathname: '/meeting-info',
        state: { 
          meetingId: id, 
        },
      });
  }

  function onEdit(id, title) {
    console.log('edit >> ', id, title);
  }

  function onDelete(id, title) {
    setMeetingId(id);
    setShowAlertMessage(`Do you want to delete ${title} meeting?`)
    console.log('onDelete >> ', meetingId, title);
  }

  function onAlertOk() {
    setShowAlertMessage('')
    
    const data = {
      'action': 'delete',
      'meeting': meetingId
    }

    console.log(`OK ${meetingId}`);
    setProgressTitle('Deleting Meeting')
    apiPostSecure(meetingsApi,  data,
      (response) => {
        setProgressTitle('')
        if(response.data.code === 204){
          setLoadMeetings(true)
        }
        setToastMessage(response.data.message)
      },
      (errorMsg) => {
        setProgressTitle('')
        setShowToast(errorMsg.msg)
      }
      )

  }

  function onAlertCancel() {
    setShowAlertMessage('')
    console.log('onAlertCancel');
  }

  const loadZoomMeetings = async () => {
    console.log('loadZoomMeetings');
    setProgressTitle("Loading meetings!")
    apiCallSecureGet(`${meetingsApi}?email=${getUserEmail()}`,
    (response) => {
      setProgressTitle("")
        setLoadMeetings(false);
        setMeetings(getMeetingRows(response.data.meetings, onCopyLink, onEdit, onDelete));
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

useEffect(() => {loadZoomMeetings();}, [loadMeetings])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
          {showToastMessage(showToast, "success", "Meeting link copied!", handleClose)}
          {getAlert(error)}
          {progressDialog(progressTitle)}
          {alertDialog(true, "Delete Meeting?", showAlertMessage, onAlertOk, onAlertCancel)}
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">My meetings</SuiTypography>
              <SuiButton variant="gradient" buttonColor="dark"  onClick={() => setCreateMeeting()}>
                  <Icon className="material-icons-round font-bold">add</Icon>
                  &nbsp;Create Meeting
              </SuiButton>
            </SuiBox>
            <SuiBox customClass={classes.tables_table}>
              <Table columns={columns} rows={meetings} />
            </SuiBox>
          </Card>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
