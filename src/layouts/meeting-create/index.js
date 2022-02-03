// @mui material components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useState, useEffect, useRef } from "react";
import { useHistory, Redirect, Link } from 'react-router-dom'

import {Alert, AlertTitle} from "@mui/material";
import {progressDialog, alertDialog} from "utils/diloag"
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import ArrowBack from '@mui/icons-material/ArrowBack';

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
import {isAuthenticated, getUser, getUserEmail} from "utils/session" 

import Footer from "examples/Footer";
import Table from "examples/Table";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import Divider from "@mui/material/Divider";
import {generateSignature} from 'utils/zoom_api'
import {Typography } from "@mui/material";
import {dateToShowFormat, getTimeZone, dateToServerFormat} from "utils/ext"
import {meetingsApi, apiPostSecure} from "utils/api"

function showErrorAlert(msg) {
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

function showSuccessAlert(msg) {
  let view = null;

  if(msg) {
    view = (
      <Alert severity="success">
        <AlertTitle>Success!</AlertTitle>
         {msg}
      </Alert>
    )
  }

  return view;
}

function ZoomMeetings() {

  if(!isAuthenticated()) {
    return <Redirect to='/authentication/sign-in'  />
  }

  const history = useHistory();

  const [title, setTitle] = useState('')
  const [agenda, setAgenda] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [duration, setDuration] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState('');

  function showError(msg) {
    setError(msg);
    setTimeout( () => {setError('')}, 3000);
  }

  function showMessage(msg) {
    setMessage(msg);
    setTimeout( () => {setMessage('')}, 3000);
  }

  const timezoneOffset = getTimeZone();

  console.log('TZ > ',timezoneOffset);

  const createMeeting = () => {
    console.log('create meeting');

    if(title.trim() === "") {
      showErrorAlert('Enter meeting title')
      return
    }

    if(agenda.trim() === "") {
      showError('Enter meeting agenda')
      return
    }

    if(password.trim() === "") {
      showError('Enter password to join meeting')
      return
    }

    if(duration.trim() === "") {
      showError('Enter meeting duration in minutes')
      return
    }

    if(date.trim() === "") {
      showError('Enter meeting date')
      return
    }

    if(time.trim() === "") {
      showError('Enter meeting time')
      return
    }

    const email = getUserEmail();

    const body = {
        'username': email,
        'action': 'add',
        'topic': title, 
        'type': 2,
        'start_time': dateToServerFormat(date, time),
        'duration': duration,
        'schedule_for': email,
        'timezone': timezoneOffset,
        'password': password,
        'agenda': agenda,
    }

    console.log('body', body);

    setProgress('Creating Meeting')

    apiPostSecure(meetingsApi, body, 
      (response) => {
        setProgress('');
          if(response.code === 200) {
            setTitle('');
            setAgenda('');
            setDate('');
            setTime('');
            setPassword('');
            setDuration('');
            showMessage('Meeting Created Successfully')
            return
          }
          showError(response.data.message)
      },
      (err) => {
        setProgress('');
        showError(err.msg)
      })


  }

  function onBack() {
    console.log('on back');
    history.goBack();
  }

  const addView = (
    <Card className="h-100">
          <SuiBox pt={2} px={2}>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center">
              <SuiBox display="flex" flexDirection="row">
                <Button variant="text" fontWeight="medium" textColor="text" onClick={() => onBack()}>
                  <ArrowBack color="secondary" />
                </Button>
                <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                  Create Meeting
                </SuiTypography>
              </SuiBox>
            </SuiBox>
            <SuiBox opacity={0.3}>
              <Divider />
            </SuiBox>
            <Grid container spacing={6}>
              <Grid item  xs={12} md={6} xl={6}>
                <SuiBox  >
                  <SuiBox ml={0.5}>
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Topic
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="text" placeholder="Topic" value={title} onChange={(e) => setTitle(e.target.value)} />
                </SuiBox>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <SuiBox >
                  <SuiBox  ml={0.5}>
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Agenda
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="text" placeholder="Agenda" value={agenda} onChange={(e) => setAgenda(e.target.value)} />
                </SuiBox>          
              </Grid><Grid item  xs={12} md={6} xl={6}>
                <SuiBox  >
                  <SuiBox ml={0.5}>
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Password
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </SuiBox>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <SuiBox >
                  <SuiBox  ml={0.5}>
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Duration in minutes
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="text" pattern="[0-9]*" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </SuiBox>          
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <SuiBox >
                  <SuiBox ml={0.5}>
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Date
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
                </SuiBox>          
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <SuiBox >
                  <SuiBox  ml={0.5}>
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Time 
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="time" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} />
                </SuiBox>
              </Grid>
            </Grid>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" py={3}>
              <SuiBox display="flex" flexDirection="row" >
                <SuiButton variant="gradient" buttonColor="secondary"  onClick={() => {console.log('cancel')}} >
                  cancel
                </SuiButton>
                <SuiBox pl={2}>
                  <SuiButton variant="gradient" buttonColor="primary"  onClick={() => createMeeting()}  p={2} >
                    Create Meeting
                  </SuiButton>
                </SuiBox>
              </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>
      )
    
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          {showSuccessAlert(message)}
          {showErrorAlert(error)}
          {progressDialog(progress)}
          {addView}
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ZoomMeetings;
