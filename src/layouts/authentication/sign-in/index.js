import { useState, React } from "react";
import { useHistory, Redirect, Link } from 'react-router-dom'

import {logout, saveUser} from "utils/session"

// Soft UI Dashboard React components
import {signInApi, apiPostUnsecure} from "utils/api"

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import axios from "axios";
import CoverLayout from "../components/CoverLayout";


function SignIn() {

  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  console.log('login')

  // if(isAuthenticated()) {
  //   return <Redirect to='/dashboard'  />
  // }


  logout();

  async function login() {

    const data = { username, password }

    apiPostUnsecure(signInApi, data,
      (response) => {
         saveUser(response);
         history.push('/dashboard');
     },
     (errorMsg) => {
         setError(errorMsg);
     }
   )

  }

  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  console.log('screen login');

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
          <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={() => login()}>
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
