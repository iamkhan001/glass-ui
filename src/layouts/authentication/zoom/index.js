import { useEffect, useState, React } from "react";
import { useLocation, useHistory, Redirect, Link } from 'react-router-dom'
import {progressDialog, alertDialog} from "utils/diloag"

// Soft UI Dashboard React components
import {activateAccountApi, getTokenFromZoom, verifyTokenApi, apiCallUnsecureGet, zoomAuthApi, apiPostSecure} from "utils/api"

import validator from 'validator'
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import CoverLayout from "../components/CoverLayout";
import {isAuthenticated,  getUser, getUserEmail} from "utils/session" 
import { apiPostUnsecure } from "utils/api";

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

function SignIn() {

  // if(!isAuthenticated()) {
  //   return <Redirect to='/authentication/sign-in'  />
  // }
  
  const history = useHistory();

  const [status, setStatus] = useState('Connecting account!');
  const [progressTitle, setProgressTitle] = useState('');
  const [showAlertTitle, setShowAlertTitle] = useState('');
  const [verifyToken, setVerifyToken] = useState(true);

  const { code, state } = useQueryParams();

  // console.log('code', code)
  // console.log('state', state)

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

  // console.log('screen login');

  const verifyTokenFromServer = async () => {

    if(code == null) {
      setStatus('Invalid link!')
      return
    }
    
    showProgress('Please wait!');
    const data = { code, state }

    apiPostUnsecure(zoomAuthApi, data,
      (response) => {
        setVerifyToken(false);
        setStatus('')
        hideProgress();
        setShowAlertTitle('Zoom account linked successfully!');
     },
     (errorMsg) => {
        setVerifyToken(false);
        hideProgress();
        setStatus(errorMsg);
     }
   )
}

useEffect(() => {
  verifyTokenFromServer()
}, [verifyToken])

  return (
    <CoverLayout
      title=""
      description=""
      image={curved9}
    >
      {progressDialog(progressTitle)}
      {alertDialog(false, "Done!.", showAlertTitle, onAlertOk, () => {})}
      <SuiBox mt={3} textAlign="center">
        <SuiTypography mt={3} variant="button" fontWeight="regular" textColor="error" textAlign="center">
          {status}
        </SuiTypography>
      </SuiBox>
    </CoverLayout>
  );
}

export default SignIn;
