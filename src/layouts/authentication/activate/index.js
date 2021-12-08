import { useEffect, useState, React } from "react";
import { useLocation, useHistory, Redirect, Link } from 'react-router-dom'
import {progressDialog, alertDialog} from "utils/diloag"

// Soft UI Dashboard React components
import {activateAccountApi, verifyTokenApi, apiCallUnsecureGet, apiPostUnsecure} from "utils/api"

import validator from 'validator'
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import CoverLayout from "../components/CoverLayout";

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

  const history = useHistory();

  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [userSate, setUserState] = useState(null);

  const [error, setError] = useState('');
  const [progressTitle, setProgressTitle] = useState('');
  const [showAlertTitle, setShowAlertTitle] = useState('');
  const [verifyToken, setVerifyToken] = useState(true);

  const { token } = useQueryParams();

  console.log(token)

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
    setShowAlertTitle('');
    history.push('/authentication/sign-in');
  }

  async function login() {
    showProgress('Please wait!');

    if(password.trim() === "") {
      showError('Enter password')
      return
    }

    if(confPassword.trim() === "") {
      showError('Confim password')
      return
    }

    if(confPassword !== password) {
      showError('Password not matching!')
      return
    }
    
    const data = { token, password }

    apiPostUnsecure(activateAccountApi, data,
      (response) => {
        hideProgress();
        setShowAlertTitle('Account activated!');
     },
     (errorMsg) => {
        hideProgress();
        showError(errorMsg);
     }
   )

  }

  console.log('screen login');

  function getContent(user) {

    if(user === null) {
        return (
          <SuiBox mt={3} textAlign="center">
            <SuiTypography mt={3} variant="button" fontWeight="regular" textColor="error" textAlign="center">
              Invaid Link
            </SuiTypography>
        </SuiBox>
        )
    }

    return (
    <SuiBox component="form" role="form">
        <SuiBox>
          <SuiTypography variant="button" fontWeight="bold" textTransform="capitalize">
            Welcome {user.first_name} {user.last_name}!
          </SuiTypography>
        </SuiBox>
        <SuiBox>
          <SuiTypography component="label" variant="caption" fontWeight="bold">
            Set password to activate your account ({user.email}).
          </SuiTypography>
        </SuiBox>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
            Password
            </SuiTypography>
          </SuiBox>
          <SuiInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </SuiBox>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Confirm Password
            </SuiTypography>
          </SuiBox>
          <SuiInput type="password" placeholder="Confirm Password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
        </SuiBox>
        <SuiBox mt={3} textAlign="center">
          <SuiTypography mt={3} variant="button" fontWeight="regular" textColor="error" textAlign="center">
            {error}
          </SuiTypography>
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={() => login()}>
            Activate Account
          </SuiButton>
        </SuiBox>
      </SuiBox>
    )
  }

  const verifyTokenFromServer = async () => {
    if(token == null) {
      return
    }
    showProgress('Please wait!');
    console.log('verifyToken');
    apiCallUnsecureGet(`${verifyTokenApi}?token=${token}`,
    (response) => {
        hideProgress()
        setVerifyToken(false);
        setUserState(response.user);
    },
    (errorMsg) => {
        hideProgress()
        setVerifyToken(false);
      }
    )
}

useEffect(() => {
  verifyTokenFromServer();
}, [verifyToken])

  return (
    <CoverLayout
      title=""
      description=""
      image={curved9}
    >
      {progressDialog(progressTitle)}
      {alertDialog(false, showAlertTitle, "you can login into your account now.", onAlertOk, () => {})}
      {getContent(userSate)}
    </CoverLayout>
  );
}

export default SignIn;
