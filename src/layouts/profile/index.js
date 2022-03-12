// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {Alert, AlertTitle} from "@mui/material";
import {progressDialog, alertDialog} from "utils/diloag"
import { Redirect, Link } from 'react-router-dom'

import validator from 'validator'

import {getCompanyId, isZoomConnected, isAdmin, getRoleName, isAuthenticated, updateUser, getUser, saveProfile} from "utils/session" 

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import Divider from "@mui/material/Divider";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import {profileUpdateApi, disconnectApi, profileApi, resetPasswordApi, apiCallSecureGet, apiPostSecure, apiPutSecure} from "utils/api"

import { useEffect, useState } from "react";
import Header from "./components/Header";

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

function Overview() {

  if(!isAuthenticated()) {
    return <Redirect to='/authentication/sign-in'  />
  }

  let user = getUser()
  const [curPassword, setCurPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [company, setCompany] = useState(user.company);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);
  const [error, setError] = useState('');
  const [showAlertCancel, setShowAlertCancel] = useState(false);
  const [showAlertTitle, setShowAlertTitle] = useState('');
  const [showAlertMessage, setShowAlertMessage] = useState('');
  const [progressTitle, setProgressTitle] = useState('');
  const [disconnectMessage, setDisconnectMessage] = useState('');

  const [loadProfile, setLoadProfile] = useState(true);


  useEffect(()=> {
    apiCallSecureGet(profileApi,
      (response) => {
         saveProfile(response);
         setLoadProfile(false);
     },
     (errorMsg) => {
         setLoadProfile(false);
         setError(errorMsg||'Error');
         setInterval( () => {setError('')}, 3000);
         console.log('ui error', errorMsg||'Error');
     }
    )
  },[loadProfile])

  console.log('screen profile');
  
  function onAlertOk() {
    setShowAlertMessage('');
  }

  function onAlertCancel() {
    setShowAlertMessage('');
  }

    
  function onDisconnectAlertOk() {

    setDisconnectMessage('');
    setProgressTitle("Removing zoom account!")
    apiCallSecureGet(disconnectApi,
      (response) => {
        setProgressTitle('');
        setLoadProfile(true);
     },
     (errorMsg) => {
         setProgressTitle('');
         setError(errorMsg||'Error');
         setInterval( () => {setError('')}, 3000);
         console.log('ui error', errorMsg||'Error');
     }
    )
  }

  function onDisconnectAlertCancel() {
    setDisconnectMessage('');
  }

  function showError(msg) {
    setError(msg);
    setTimeout( () => {setError('')}, 3000);
  }

  function showAlert(cancel, title, message) {
    setShowAlertTitle(title);
    setShowAlertMessage(message);
    setShowAlertCancel(cancel);
  }

  async function updateInfo() {
    
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
    setProgressTitle('Updating Profile!');
    const data = {firstName,lastName,company, mobile, email}
    apiPostSecure(profileUpdateApi, data,
       (response) => {
          updateUser(response);
          user = getUser();
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setEmail(user.email);
          setMobile(user.mobile);
          setCompany(user.company);
          setProgressTitle('');
          setLoadProfile(true);
          showAlert(false, "Success!", "Account details updated successfully!")
      },
      (errorMsg) => {
          setProgressTitle('');
          showAlert(false, "Error!", errorMsg)
          setTimeout( () => {showError(null)}, 3000)
      }
    )
  
  }

  async function updatePassowrd() {
    
    if(curPassword.trim() === "") {
      showError('Enter Current password')
      return
    }
    if(newPassword.trim() === "") {
      showError('Enter new password')
      return
    }
    if(reNewPassword.trim() === "") {
      showError('Confirm new passowrd')
      return
    }

    if(newPassword !== reNewPassword) {
      showError('Password not matching!')
      return;
    }

    setProgressTitle('Updating Password!');
    const data = {
        'old_password': curPassword,
        'new_password': newPassword,
    }

    apiPostSecure(resetPasswordApi, data,
       (response) => {
          showAlert(false, "Success!", "Password updated successfully!")
          setCurPassword('');
          setNewPassword('');
          setReNewPassword('');
          setProgressTitle('');
      },
      (errorMsg) => {
          setProgressTitle('');
          showAlert(false, "Error!", errorMsg)
          setTimeout( () => {showError(null)}, 3000)
      }
    )
  
  }

  function onDisconnect() {
    console.log('onDisconnect')
    setDisconnectMessage("Do you want to disconnect zoom account?")
  }

  let scope = '----'
  if(user.scope !== null) {
    scope = user.scope;
  }

  return (
    <DashboardLayout>
      <Header companyId={getCompanyId()} name={`${user.firstName} ${user.lastName}`} roleName={getRoleName()} isAdmin={isAdmin()} isZoomConnected={isZoomConnected()} onDisconnect={onDisconnect} />
      <SuiBox mt={5} mb={3}>
      {getAlert(error)}
      {progressDialog(progressTitle)}
      {alertDialog(showAlertCancel, showAlertTitle, showAlertMessage, onAlertOk, onAlertCancel)}
      {alertDialog(true, "Disconnect zoom?", disconnectMessage, onDisconnectAlertOk, onDisconnectAlertCancel)}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
          <ProfileInfoCard
              title="profile information"
              description=""
              info={{
                fullName: `${user.firstName} ${user.lastName}`,
                mobile: `${user.mobile}`,
                email: `${user.email}`,
                location: `location`,
                role: "Admin",
                zoom_scope: scope || "----"
              }}
              social={[
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
         
          <Grid item xs={12} md={6} xl={4}>
            <Card className="h-100">
              <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                Update account details
                </SuiTypography>
              </SuiBox>
              <SuiBox p={2}>
                <SuiBox opacity={0.3}>
                  <Divider />
                </SuiBox>
                <SuiBox mb={2}>
                  <SuiBox mb={1} ml={0.5}>
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      First Name
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="text" placeholder="first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </SuiBox>
                <SuiBox mb={2}>
                  <SuiBox mb={1} ml={0.5}>
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Last Name
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="text" placeholder="last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </SuiBox>
                <SuiBox mb={2}>
                  <SuiBox mb={1} ml={0.5}>
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Company
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
                </SuiBox>
                <SuiBox mb={2}>
                  <SuiBox mb={1} ml={0.5}>
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Email
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </SuiBox>
                <SuiBox mb={2}>
                  <SuiBox mb={1} ml={0.5}>
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Phone 
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="phone" placeholder="Phone" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </SuiBox>
                <SuiBox mt={4} mb={1}>
                  <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={() => updateInfo()}>
                    Update Details
                  </SuiButton>
                </SuiBox>
              </SuiBox>
            </Card>
          </Grid>
          <Grid item xs={12} xl={4}>
            <Card className="h-100">
              <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                Update password
                </SuiTypography>
              </SuiBox>
              <SuiBox p={2}>
                <SuiBox opacity={0.3}>
                  <Divider />
                </SuiBox>
                <SuiBox mb={2}>
                  <SuiBox mb={1} ml={0.5}>
                    <SuiTypography autoComplete="off" component="label" variant="caption" fontWeight="bold" autofill>
                      Current password
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="password" placeholder="current password" value={curPassword} onChange={(e) => setCurPassword(e.target.value)} />
                </SuiBox>
                <SuiBox mb={2}>
                  <SuiBox mb={1} ml={0.5}>
                    <SuiTypography autoComplete="off" component="label" variant="caption" fontWeight="bold">
                      New password
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="password" placeholder="new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </SuiBox>
                <SuiBox mb={2}>
                  <SuiBox mb={1} ml={0.5}>
                    <SuiTypography autoComplete="off" component="label" variant="caption" fontWeight="bold">
                      Verify new password
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="password" placeholder="verify new password" value={reNewPassword} onChange={(e) => setReNewPassword(e.target.value)} />
                </SuiBox>
                <SuiBox mt={4} mb={1}>
                  <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={() => updatePassowrd()}>
                    Update Password
                  </SuiButton>
                </SuiBox>
              </SuiBox>
            </Card>          
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
