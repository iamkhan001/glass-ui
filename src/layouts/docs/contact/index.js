import { useState, React } from "react";
import { useHistory, Redirect, Link } from 'react-router-dom'
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import BasicLayout from "layouts/docs/components/BasicLayout";
import Grid from "@mui/material/Grid";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

import axios from "axios";

import {progressDialog, alertDialog} from "utils/diloag"
import {Alert, AlertTitle} from "@mui/material";

import { apiPostUnsecure, contactUsApi } from "utils/api";
import validator from 'validator'

function useQueryParams() {
    const params = new URLSearchParams(
      window ? window.location.search : {}
    );

    return new Proxy(params, {
        get(target, prop) {
            return target.get(prop)
        },
    });
}

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

function ContactUs() {

  // if(!isAuthenticated()) {
  //   return <Redirect to='/authentication/sign-in'  />
  // }
  
  const history = useHistory();

  const [progressTitle, setProgressTitle] = useState('');
  const [showAlertTitle, setShowAlertTitle] = useState('');
  const [error, setError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const { code, state } = useQueryParams();

  console.log('code', code)
  console.log('state', state)

  function showProgress(title) {
    setProgressTitle(title)
  }

  function hideProgress() {
    setProgressTitle('')
  }

  function onAlertOk() {
    setShowAlertTitle('');
    history.push('/dashboard');
  }

  console.log('screen login');

  function showError(msg) {
    setError(msg);
    setTimeout( () => {setError('')}, 3000);
  }

  const sendMessage = async () => {

    if(firstName.trim() === "") {
      showError('Enter first name')
      return
    }
    if(lastName.trim() === "") {
      showError('Enter last name')
      return
    }
    if(email.trim() === "") {
      showError('Enter email')
      return
    }
    if(!validator.isEmail(email)) {
      showError('Invalid email')
      return
    }   
    if(phone.trim() === "") {
      showError('Enter phone')
      return
    }
    if(message.trim() === "") {
      showError('Enter message')
      return
    }
    
    showProgress('Please wait!');
    const data = { 
       'name': `${firstName} ${lastName}`,
       'email': email,
       'phone': phone,
       'message': message,
     }

    apiPostUnsecure(contactUsApi, data,
      (response) => {
        hideProgress();
        setShowAlertTitle('Message sent successfully. Our representative will connect with you soon.');
     },
     (errorMsg) => {
        hideProgress();
        setStatus(errorMsg);
     }
   )
}

const contact = (
  <Card className="h-100">
        <SuiBox py={2} px={2}>
        {getAlert(error)}
          <SuiBox display="flex" justifyContent="space-between" alignItems="center">
            <SuiTypography mt={2} variant="h6" fontWeight="medium" textTransform="capitalize">
              Contact Us
            </SuiTypography>
          </SuiBox>
          <SuiBox opacity={0.3}>
            <Divider />
          </SuiBox>
          <Grid container spacing={6}>
            <Grid item  xs={12} md={6} xl={6}>
              <SuiBox  >
                <SuiBox ml={0.5}>
                  <SuiTypography component="label" variant="caption" fontWeight="bold">
                    First Name
                  </SuiTypography>
                </SuiBox>
                <SuiInput type="text" placeholder="first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </SuiBox>
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <SuiBox >
                <SuiBox  ml={0.5}>
                  <SuiTypography component="label" variant="caption" fontWeight="bold">
                    Last Name
                  </SuiTypography>
                </SuiBox>
                <SuiInput type="text" placeholder="last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </SuiBox>          
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <SuiBox >
                <SuiBox ml={0.5}>
                  <SuiTypography component="label" variant="caption" fontWeight="bold">
                    Email
                  </SuiTypography>
                </SuiBox>
                <SuiInput type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </SuiBox>          
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <SuiBox >
                <SuiBox  ml={0.5}>
                  <SuiTypography component="label" variant="caption" fontWeight="bold">
                    Phone
                  </SuiTypography>
                </SuiBox>
                <SuiInput type="phone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </SuiBox>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} xl={12}>
              <SuiBox >
                <SuiBox  ml={0.5}>
                  <SuiTypography component="label" variant="caption" fontWeight="bold">
                    Message
                  </SuiTypography>
                </SuiBox>
                <SuiInput multiline rows={5} type="text" placeholder="type your message here..." value={message} onChange={(e) => setMessage(e.target.value)} />
              </SuiBox>          
            </Grid>
          <SuiBox display="flex" justifyContent="space-between" alignItems="center" py={3}>
            <SuiBox display="flex" flexDirection="row" >
              <SuiBox >
                <SuiButton variant="gradient" buttonColor="primary"  onClick={() => sendMessage()}  p={2} >
                  Send Message
                </SuiButton>
              </SuiBox>
            </SuiBox>
        </SuiBox>
            <SuiTypography mt={0} align='justify' fontWeight='light' variant='h6' >
              <p  class="info">
                <br />
                <b>Phone</b> <br />
                +65 9878 0603 <br />
                <b>Email</b> <br />
                info@mirobotic.sg <br />
                <b>Address</b><br />
                <address>
                    67 Ayer Rajah Crescent, #07-01<br />
                    Singapore, Singapore 139950<br />
                    Singapore<br />
                </address> 
              </p>
            </SuiTypography>
      </SuiBox>
    </Card>
    )

  return (
    <BasicLayout
      title="CONTACT US"
      description="ZOOMABLE"
      image={curved6}
    >
      <Card p={3}>
        <Grid container justifyContent="center" >
          <Grid >
              {progressDialog(progressTitle)}
              {alertDialog(false, "Done!.", showAlertTitle, onAlertOk, () => {})}
              {contact}
          </Grid>
        </Grid>
      </Card>
    </BasicLayout>
  );
}

export default ContactUs;
