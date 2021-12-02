import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import { Redirect, Link } from 'react-router-dom'
import { useState } from "react";


import {Alert, AlertTitle} from "@mui/material";
import {progressDialog, alertDialog} from "utils/diloag"

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import {isAuthenticated, getUser} from "utils/session" 

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Table";
import SuiButton from "components/SuiButton";
import Icon from "@mui/material/Icon";
import SuiInput from "components/SuiInput";
import Divider from "@mui/material/Divider";

import {profileUpdateApi, resetPasswordApi, apiCallSecureGet, apiPostSecure, apiPutSecure} from "utils/api"

import styles from "./styles";

import getRows from "./data/usersTableData";

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

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const [firstNameEdit, setFirstNameEdit] = useState('');
  const [lastNameEdit, setLastNameEdit] = useState('');
  const [emailEdit, setEmailEdit] = useState('');
  const [mobileEdit, setMobileEdit] = useState('');

  const [error, setError] = useState('');
  const [progress, setProgress] = useState(false);
  const [progressTitle, setProgressTitle] = useState(false);
  const [showAlertCancel, setShowAlertCancel] = useState(false);
  const [showAlertTitle, setShowAlertTitle] = useState('');
  const [showAlertMessage, setShowAlertMessage] = useState('');

  const [content, setContent] = useState('list');
  const classes = styles();

  function showAlert(cancel, title, message) {
    setShowAlertTitle(title);
    setShowAlertMessage(message);
    setShowAlertCancel(cancel);
  }

  function onActivate(id) {
    console.log('onActivate >> ', id);
    showAlert(true, "Activate Member?", "Click on okay if you want to activate member.")
  }

  function onDeactivate(id) {
    console.log('onDeactivate >> ', id);
    showAlert(true, "Deactivate Member?", "Click on okay if you want to deactivate member.")
  }

  function onEdit(id) {
    console.log('edit >> ', id);
    setFirstNameEdit('Imran');
    setLastNameEdit('Khan');
    setEmailEdit('impathan007@gmail.com');
    setMobileEdit('987654');
    setContent('edit');
  }

  function onDelete(id) {
    console.log('onDelete >> ', id);
    showAlert(true, "Delete Member?", "Click on okay if you want to delete member.")
  }

  const rows = getRows([], onActivate, onDeactivate, onEdit, onDelete);

  const columns = [
    { name: "name", align: "left" },
    { name: "email", align: "left" },
    { name: "status", align: "center" },
    { name: "action", align: "center" },
  ]

  function onAlertOk() {
    setShowAlertTitle('');
  }

  function onAlertCancel() {
    setShowAlertTitle('');
  }

  function updateConentView(selection) {
    console.log('selection >> ', selection);
    setContent(selection)
  }

  function showProgress(title) {
    setProgressTitle(title)
    setProgress(true)
  }

  function hideProgress() {
    setProgressTitle(false)
    setProgress(false)
  }



  function showError(msg) {
    setError(msg);
    setTimeout( () => {setError('')}, 3000);
  }

  function addMember() {
    console.log('add member');

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
    showProgress("Creating member account!")
    const data = {firstName,lastName, mobile, email}
    apiPostSecure(profileUpdateApi, data,
       (response) => {
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobile("");
          hideProgress();
          showAlert(false, "Success!", "Account details updated successfully!")
      },
      (errorMsg) => {
          hideProgress();
          showAlert(false, "Error!", errorMsg)
          setTimeout( () => {showError(null)}, 3000)
      }
    )

  }

  const addView = (

    <Card className="h-100">
      <SuiBox pt={2} px={2}>
        <SuiBox display="flex" justifyContent="space-between" alignItems="center">
          <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            Enter member details
          </SuiTypography>
        </SuiBox>
        <SuiBox opacity={0.3}>
          <Divider />
        </SuiBox>
        <Grid container spacing={6}>
          <Grid item  xs={12} md={6} xl={6}>
            <SuiBox spacing={6} >
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
                  Phone (optional) 
                </SuiTypography>
              </SuiBox>
              <SuiInput type="phone" placeholder="Phone" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </SuiBox>
          </Grid>
        </Grid>
        <SuiBox display="flex" justifyContent="space-between" alignItems="center" py={3}>
          <SuiBox display="flex" flexDirection="row" >
            <SuiButton variant="gradient" buttonColor="secondary"  onClick={() => updateConentView('list')} >
              cancel
            </SuiButton>
            <SuiBox pl={2}>
              <SuiButton variant="gradient" buttonColor="primary"  onClick={() => addMember()}  p={2} >
                Add Member
              </SuiButton>
            </SuiBox>
          </SuiBox>
      </SuiBox>
    </SuiBox>
  </Card>
  )

  const updateView = (

    <Card className="h-100">
      <SuiBox pt={2} px={2}>
        <SuiBox display="flex" justifyContent="space-between" alignItems="center">
          <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            Update member details
          </SuiTypography>
        </SuiBox>
        <SuiBox opacity={0.3}>
          <Divider />
        </SuiBox>
        <Grid container spacing={6}>
          <Grid item  xs={12} md={6} xl={6}>
            <SuiBox spacing={6} >
              <SuiBox ml={0.5}>
                <SuiTypography component="label" variant="caption" fontWeight="bold">
                  First Name
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" placeholder="first name" value={firstNameEdit} onChange={(e) => setFirstNameEdit(e.target.value)} />
            </SuiBox>
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <SuiBox >
              <SuiBox  ml={0.5}>
                <SuiTypography component="label" variant="caption" fontWeight="bold">
                  Last Name
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" placeholder="last name" value={lastNameEdit} onChange={(e) => setLastNameEdit(e.target.value)} />
            </SuiBox>          
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <SuiBox >
              <SuiBox ml={0.5}>
                <SuiTypography component="label" variant="caption" fontWeight="bold">
                  Email
                </SuiTypography>
              </SuiBox>
              <SuiInput type="email" placeholder="email" value={emailEdit} onChange={(e) => setEmailEdit(e.target.value)} />
            </SuiBox>          
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <SuiBox >
              <SuiBox  ml={0.5}>
                <SuiTypography component="label" variant="caption" fontWeight="bold">
                  Phone (optional) 
                </SuiTypography>
              </SuiBox>
              <SuiInput type="phone" placeholder="Phone" value={mobileEdit} onChange={(e) => setMobileEdit(e.target.value)} />
            </SuiBox>
          </Grid>
        </Grid>
        <SuiBox display="flex" justifyContent="space-between" alignItems="center" py={3}>
          <SuiBox display="flex" flexDirection="row" >
            <SuiButton variant="gradient" buttonColor="secondary"  onClick={() => updateConentView('list')} >
              cancel
            </SuiButton>
            <SuiBox pl={2}>
              <SuiButton variant="gradient" buttonColor="primary"  onClick={() => addMember()}  p={2} >
                Update Member
              </SuiButton>
            </SuiBox>
          </SuiBox>
      </SuiBox>
    </SuiBox>
  </Card>
  )

  function showAddMember() {
    // setFirstName('');
    // setLastName('');
    // setEmail('');
    // setMobile('');
    // setAction('Add Member');
    return addView;
  }

  function showUpdateMember() {
      // setFirstName('Jovy');
      // setLastName('Chiu');
      // setEmail('jovy@gmail.com');
      // setMobile('9876543');
      // setAction('Update Member');
      return updateView;
  }


  function getContentView(state) {

    if(state === 'list') {
  
      return (
        <Card>
          <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">Members</SuiTypography>
              <SuiButton variant="gradient" buttonColor="dark"  onClick={() => updateConentView('add')}>
                <Icon className="font-bold">add</Icon>
                &nbsp;New Member
              </SuiButton>
          </SuiBox>
          <SuiBox customClass={classes.tables_table}>
            <Table columns={columns} rows={rows} />
          </SuiBox>
        </Card>
      )
    }
  
    if(state === 'add') {
      return addView;
    }
  
    if(state === 'edit') {
      return showUpdateMember();
    }
  
    return null;
  }


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          {getAlert(error)}
          {progressDialog(progressTitle, progress)}
          {alertDialog(showAlertCancel, showAlertTitle, showAlertMessage, onAlertOk, onAlertCancel)}
          {getContentView(content)}
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
