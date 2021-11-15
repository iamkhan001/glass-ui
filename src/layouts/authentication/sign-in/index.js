import { useState, React } from "react";
import { useHistory, Redirect, Link } from 'react-router-dom'

import {isAuthenticated, saveUser} from "utils/session"

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import curved9 from "assets/images/curved-images/curved-6.jpg";

import CoverLayout from "../components/CoverLayout";


function SignIn() {

  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if(isAuthenticated()) {
    return <Redirect to='/dashboard'  />
  }

  async function log() {
    const details = { username, password }

   let result = await fetch(`http://fooddelicious.in/accounts/sign-in/`,{
      method:'POST',
      body:JSON.stringify(details),
      headers:{
         "Content-Type":"application/json",
         "Accept":"application/json"
      }
    })
    result = await result.json()
    console.warn('result', result)

    if(result.code === 200) {
        saveUser(result)
        history.push('/dashboard')
    }else {
        setError(result.msg)
    }

  }

  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <CoverLayout
      title="Welcome to MI GLASS"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SuiTypography>
          </SuiBox>
          <SuiInput type="email" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
        </SuiBox>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SuiTypography>
          </SuiBox>
          <SuiInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </SuiBox>
        <SuiBox mt={3} textAlign="center">
          <SuiTypography mt={3} variant="button" fontWeight="regular" textColor="error" textAlign="center">
            {error}
          </SuiTypography>
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={() => log()}>
            sign in
          </SuiButton>
        </SuiBox>
        <SuiBox mt={3} textAlign="center">
          <SuiTypography variant="button" textColor="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              textColor="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  );
}

export default SignIn;