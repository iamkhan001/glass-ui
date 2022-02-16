import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import { Redirect, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from "react";

import {Alert, AlertTitle} from "@mui/material";
import {progressDialog, alertDialog} from "utils/diloag"
import {getRoleName, getRoleId} from "utils/ext"

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import {isAuthenticated, getUser} from "utils/session" 
import validator from 'validator'

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Table";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import Divider from "@mui/material/Divider";
import { membersApi, memberUpdateApi, createZoomUser, memeberActivateApi, memberDeleteApi, apiCallSecureGet, apiPostSecure,} from "utils/api"

import BasicTable from './data/membersTable'


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

function getColumns(role) {
  if(role === 'A') {
    return [
      { name: "name", align: "left" },
      { name: "email", align: "left" },
      { name: "status", align: "center" },
      { name: "action", align: "center" },
    ]
  }
 
  return [
    { name: "name", align: "left" },
    { name: "email", align: "left" },
    { name: "status", align: "center" },
    { name: "role", align: "center" },
  ]

}

let selectedUser = null;
let action = '';

function Tables() {

  if(!isAuthenticated()) {
    return <Redirect to='/authentication/sign-in'  />
  }

  const componentMounted = useRef(true);

  const loginUser = getUser();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [userId, setUserId] = useState('');

  const [firstNameNew, setFirstNameNew] = useState('');
  const [lastNameNew, setLastNameNew] = useState('');
  const [emailNew, setEmailNew] = useState('');
  const [mobileNew, setMobileNew] = useState('');

  const [error, setError] = useState('');
  const [progressTitle, setProgressTitle] = useState('');
  const [showAlertCancel, setShowAlertCancel] = useState(false);
  const [showAlertTitle, setShowAlertTitle] = useState('');
  const [showAlertMessage, setShowAlertMessage] = useState('');
  const [loadUsers, setLoadUsers] = useState(true);

  const [members, setMembers] = useState([]);

  const [content, setContent] = useState('list');
  const [role, setRole] = useState('Member');

  const columns = getColumns(loginUser.role);

  console.log('login', loginUser);

  const classes = styles();

  const [openMenu, setOpenMenu] = useState();
  const handleOpenMenu = ({ currentTarget }) => setOpenMenu(currentTarget);

  const handleCloseMenu = (value) => {
    console.log(`change ${value} ${this}` );
    setOpenMenu(false);
    setRole(value)
  }

  function showAlert(cancel, title, message) {
    setShowAlertTitle(title);
    setShowAlertMessage(message);
    setShowAlertCancel(cancel);
  }

  function onActivate(user) {
    selectedUser = user;
    action = 'A';
    console.log('onActivate >> ', user);
    showAlert(true, `Activate ${user.first_name} ${user.last_name}?`, "Click on okay if you want to activate member.")
  }

  
  function onDeactivate(user) {
    selectedUser = user;
    action = 'D';
    console.log('onDeactivate >> ', user);
    showAlert(true, `Deactivate ${user.first_name} ${user.last_name}?`, "Click on okay if you want to deactivate member.")
  }

  function onEdit(user) {
    console.log('edit >> ', user);
    selectedUser = user;
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
    setMobile(user.mobile);
    setUserId(user.accountId);
    setRole(getRoleName(user.role));
    setContent('edit');
  }

  function onDelete(user) {
    selectedUser = user;
    action = 'R';
    console.log('onDelete >> ', user);
    showAlert(true, `Delete ${user.first_name} ${user.last_name}?`, "Click on okay if you want to delete member.")
  }
  
  function showProgress(title) {
    setProgressTitle(title)
  }

  function hideProgress() {
    setProgressTitle('')
  }

  function showError(msg) {
    setError(msg);
    setTimeout( () => {setError('')}, 3000);
  }

  function onAlertOk() {
    setShowAlertMessage('');
    if(selectedUser == null || action == null) {
      return
    }

    showProgress('Please wait!')
    let data = null;
    let api = '';

    if(action === 'R') {
      api = memberDeleteApi
    }else {
      api = memeberActivateApi
    }

    data = {
      'status': action,
      'accountId': selectedUser.accountId, 
    }

    apiPostSecure(api, data,
       (response) => {
          setLoadUsers(true);
          hideProgress();
          selectedUser = null;
          action = null;
          showAlert(false, "Success!", response.msg)
      },
      (errorMsg) => {
          hideProgress();
          selectedUser = null;
          action = null;
          showAlert(false, "Error!", errorMsg)
          setTimeout( () => {showError(null)}, 3000)
      }
    )

  }

  function onAlertCancel() {
    selectedUser = null;
    action = null;
    setShowAlertMessage('');
  }

  function updateConentView(selection) {
    console.log('selection >> ', selection);
    setLoadUsers(true);
    setContent(selection);
  }


  function updateMember() {
    console.log('updateMember');

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
    showProgress("Creating member account!")
    const roleId = getRoleId(role);

    const data = {
      'firstName': firstName,
      'lastName': lastName, 
      'mobile': mobile,
      'email' : email,
      'role': roleId,
      'accountId': userId
    }

    apiPostSecure(memberUpdateApi, data,
       (response) => {
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobile("");
          setUserId("");
          setRole("Member");
          setLoadUsers(true);
          hideProgress();
          action = null;
          showAlert(false, "Success!", response.msg)
      },
      (errorMsg) => {
          hideProgress();
          action = null;
          showAlert(false, "Error!", errorMsg)
          setTimeout( () => {showError(null)}, 3000)
      }
    )

  }

  function addMember() {
    console.log('add member');

    if(firstNameNew.trim() === "") {
      showError('Enter first name')
      return
    }
    if(lastNameNew.trim() === "") {
      showError('Enter last name')
      return
    }
    if(emailNew.trim() === "") {
      showError('Enter email')
      return
    }
    if(!validator.isEmail(emailNew)) {
      showError('Invalid email')
      return
    }
    showProgress("Creating member account!")

    const roleId = getRoleId(role);

    const data = {
      'firstName': firstNameNew,
      'lastName': lastNameNew, 
      'mobile': mobileNew,
      'email' : emailNew,
      'role': roleId,
    }

    apiPostSecure(membersApi, data,
       (response) => {
          setFirstNameNew("");
          setLastNameNew("");
          setEmailNew("");
          setMobileNew("");
          hideProgress();
          showAlert(false, "Success!", response.msg)
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
            Add new member
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
              <SuiInput type="text" placeholder="first name" value={firstNameNew} onChange={(e) => setFirstNameNew(e.target.value)} />
            </SuiBox>
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <SuiBox >
              <SuiBox  ml={0.5}>
                <SuiTypography component="label" variant="caption" fontWeight="bold">
                  Last Name
                </SuiTypography>
              </SuiBox>
              <SuiInput type="text" placeholder="last name" value={lastNameNew} onChange={(e) => setLastNameNew(e.target.value)} />
            </SuiBox>          
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <SuiBox >
              <SuiBox ml={0.5}>
                <SuiTypography component="label" variant="caption" fontWeight="bold">
                  Email
                </SuiTypography>
              </SuiBox>
              <SuiInput type="email" placeholder="email" value={emailNew} onChange={(e) => setEmailNew(e.target.value)} />
            </SuiBox>          
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <SuiBox >
              <SuiBox  ml={0.5}>
                <SuiTypography component="label" variant="caption" fontWeight="bold">
                  Phone (optional) 
                </SuiTypography>
              </SuiBox>
              <SuiInput type="phone" placeholder="Phone" value={mobileNew} onChange={(e) => setMobileNew(e.target.value)} />
            </SuiBox>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} xl={6}>
            <SuiBox mb={4}>
                      <SuiTypography component="label" variant="caption" fontWeight="bold">
                        Select Role
                      </SuiTypography>
                      <SuiBox>
                        <SuiButton buttonColor="secondary" onClick={handleOpenMenu}>
                          {role}
                          <Icon className="material-icons-round font-bold">keyboard_arrow_down</Icon>
                        </SuiButton>
                        <Menu
                          anchorEl={openMenu}
                          getContentAnchorEl={null}
                          transformOrigin={{ vertical: "top" , horizontal: "left" }}
                          open={Boolean(openMenu)}
                          onClose={() => handleCloseMenu("Member")}
                        >
                          <MenuItem onClick={() => handleCloseMenu("Member")}>Member</MenuItem>
                          <MenuItem onClick={() => handleCloseMenu("Admin")}>Admin</MenuItem>
                        </Menu>
                      </SuiBox>
            </SuiBox>
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
          <Grid item xs={12} md={6} xl={6}>
            <SuiBox mb={2}>
                      <SuiTypography component="label" variant="caption" fontWeight="bold">
                        Select Role
                      </SuiTypography>
                      <SuiBox>
                        <SuiButton buttonColor="secondary" onClick={handleOpenMenu}>
                          {role}
                          <Icon className="material-icons-round font-bold">keyboard_arrow_down</Icon>
                        </SuiButton>
                        <Menu
                          anchorEl={openMenu}
                          getContentAnchorEl={null}
                          transformOrigin={{ vertical: "top" , horizontal: "left" }}
                          open={Boolean(openMenu)}
                          onClose={() => handleCloseMenu("Member")}
                        >
                          <MenuItem onClick={() => handleCloseMenu("Member")}>Member</MenuItem>
                          <MenuItem onClick={() => handleCloseMenu("Admin")}>Admin</MenuItem>
                        </Menu>
                      </SuiBox>
            </SuiBox>
         </Grid>
        </Grid>
        <SuiBox display="flex" justifyContent="space-between" alignItems="center" py={3}>
          <SuiBox display="flex" flexDirection="row" >
            <SuiButton variant="gradient" buttonColor="secondary"  onClick={() =>
               updateConentView('list')
               } >
              cancel
            </SuiButton>
            <SuiBox pl={2}>
              <SuiButton variant="gradient" buttonColor="primary"  onClick={() => updateMember()}  p={2} >
                Update Member
              </SuiButton>
            </SuiBox>
          </SuiBox>
      </SuiBox>
    </SuiBox>
  </Card>
  )

  const loadMembers = async () => {
      console.log('loadMembers');
      apiCallSecureGet(membersApi,
      (response) => {
          setLoadUsers(false);
          setMembers(getRows(loginUser.role, response.list, onActivate, onDeactivate, onEdit, onDelete));
          setContent('list');
      },
      (errorMsg) => {
          setLoadUsers(false);
          setError(errorMsg||'Error');
          setInterval( () => {setError('')}, 3000);
          console.log('ui error', errorMsg||'Error');
        }
      )
  }

  useEffect(() => {loadMembers();}, [loadUsers])

  const addButton = () => {
    if(loginUser.role === 'A') {
      return (
        <SuiButton variant="gradient" buttonColor="dark"  onClick={() => setContent('add')}>
            <Icon className="material-icons-round font-bold">add</Icon>
            &nbsp;New Member
        </SuiButton>
      )
    }
    return null;
  }

  function showMembers() {

    console.log('show members');

    return (
      <Card>
        <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SuiTypography variant="h6">Members</SuiTypography>
            {addButton()}
        </SuiBox>
        <SuiBox customClass={classes.tables_table}>
          <Table columns={columns} rows={members} />
        </SuiBox>
      </Card>
    )
  }

  function showAddMember() {
    return addView;
  }

  function showUpdateMember() {
      return updateView;
  }

  function getContentView(state) {

    if(state === 'list') {
      return showMembers();
    }
  
    if(state === 'add') {
      return showAddMember();
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
          {progressDialog(progressTitle)}
          {alertDialog(showAlertCancel, showAlertTitle, showAlertMessage, onAlertOk, onAlertCancel)}
          {getContentView(content)}
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
