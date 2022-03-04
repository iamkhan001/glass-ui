// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Redirect, Link } from 'react-router-dom';
import QRCode from 'qrcode.react';

import { useState } from "react";

import {isAuthenticated, getUser} from "utils/session" 


// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import {Alert, AlertTitle} from "@mui/material";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Switch from "@mui/material/Switch";
import qrCodeImage from "assets/images/scan.png";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";

function showErroAlert(msg) {
  let view = null;

  if(msg) {
    view = (
      <Alert severity="error">
         {msg}
      </Alert>
    )
  }

  return view;
}

function showSuccessAlert(msg) {
  let view = null;

  if(msg == null || msg.trim() === '') {
    view = (
      <SuiTypography m={2} fontWeight="medium" textColor="text">
        Enter WIFI credentials
      </SuiTypography> 
    )
  }else {
    
    view = (
      <Alert severity="success">
         {msg}
      </Alert>
    )
  }

  return view;
}

function generateQRCode(ssid, password, selection, isHidden) {

  console.log('qr code', ssid, password, selection, isHidden);
  if(ssid === null || password.trim() === '') {
    return (
      <SuiBox component="img"  src={qrCodeImage} alt="QR Login" width="200px" pt={3} />
    )
  }
  
  const qr = `WIFI:T:${selection};S:${ssid};P:${password};H:${isHidden};`
  return (
      <QRCode value={qr} size='150' />
  )

}

function Wifi() {

  if(!isAuthenticated()) {
    return <Redirect to='/authentication/sign-in'  />
  }


  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [isHidden, setHidden] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [selection, setSetSelection] = useState("WPA");

  const [error, setError] = useState('');
  const [alert, setAlert] = useState('');

  const handleHidden = () => setHidden(!isHidden);

  const [openMenu, setOpenMenu] = useState();
  const handleOpenMenu = ({ currentTarget }) => setOpenMenu(currentTarget);

  const handleCloseMenu = (enc) => {
    console.log(`change ${enc} ${this}` );
    setOpenMenu(false);
    setSetSelection(enc);
  }

  function showError(msg) {
    setError(msg);
    setTimeout( () => {setError('')}, 3000);
  }

  function validateQrCode() {
    if(ssid.trim() === ''){
      setIsValid(false);
      showError("Enter network name")
      setAlert('')
      return
    }

    if(password.trim() === '' ) {
      setIsValid(false);
      showError("Enter Password")
      setAlert('')
      return
    }
    setAlert("Scan this QR code on your google glass to connect wifi")
    setIsValid(true);
  }

  function createQrCode() {
      if(isValid) {
        return generateQRCode(ssid, password, selection, isHidden);
      }
      return (
        <SuiBox component="img"  src={qrCodeImage} alt="QR Login" width="200px" pt={3} />
    )
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={4}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Card>
                <SuiBox component="form" role="form" padding="20px">
                  <SuiBox mb={2}>
                    <SuiBox mb={1} ml={0.5}>
                      <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Network Name (SSID) *
                      </SuiTypography>
                    </SuiBox>
                    <SuiInput type="text" placeholder="Network Name (SSID) *" value={ssid} onChange={(e) => setSsid(e.target.value)}/>
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiBox mb={1} ml={0.5}>
                      <SuiTypography component="label" variant="caption" fontWeight="bold">
                        Password
                      </SuiTypography>
                    </SuiBox>
                    <SuiInput type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </SuiBox>
                  <SuiBox mb={2}>
                      <SuiTypography component="label" variant="caption" fontWeight="bold">
                        Select Encryption
                      </SuiTypography>
                      <SuiBox>
                        <SuiButton buttonColor="secondary" onClick={handleOpenMenu}>
                          {selection}
                          <Icon className="material-icons-round font-bold">keyboard_arrow_down</Icon>
                        </SuiButton>
                        <Menu
                          anchorEl={openMenu}
                          getContentAnchorEl={null}
                          transformOrigin={{ vertical: "top" , horizontal: "left" }}
                          open={Boolean(openMenu)}
                          onClose={() => handleCloseMenu("WPA")}
                        >
                          <MenuItem onClick={() => handleCloseMenu("WPA")}>WPA</MenuItem>
                          <MenuItem onClick={() => handleCloseMenu("WEP")}>WEP</MenuItem>
                          <MenuItem onClick={() => handleCloseMenu("None")}>None</MenuItem>
                        </Menu>
                      </SuiBox>
                  </SuiBox>
                  <SuiBox display="flex" alignItems="center">
                    <Switch checked={isHidden} onChange={handleHidden} />
                    <SuiTypography
                      variant="button"
                      fontWeight="regular"
                      onClick={handleHidden}
                      customClass="cursor-pointer user-select-none"
                    >
                      &nbsp;&nbsp;Hidden
                    </SuiTypography>
                  </SuiBox>
                  {showErroAlert(error)}
                  <SuiBox mt={4} mb={1}>
                    <SuiButton onClick={() => validateQrCode()} variant="gradient" buttonColor="info" fullWidth>
                      Generate QR code
                    </SuiButton>
                  </SuiBox>
                </SuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card >
                <SuiBox textAlign="center"  padding="20px">
                  {createQrCode()}
                  {showSuccessAlert(alert)}
                </SuiBox>
              </Card>

            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  );
}

export default Wifi;
