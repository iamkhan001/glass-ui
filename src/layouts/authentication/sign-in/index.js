/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

function SignIn() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function log() {
    const daitel = { username, password }
    console.warn(daitel)
  

   let result = await fetch("http://fooddelicious.in/accounts/sign-in/",{
      method:'POST',
      body:JSON.stringify(daitel),
      headers:{
         "Content-Type":"application/json",
         "Accept":"application/json"
      }
    })
    result = await result.json()
    console.warn('result',result)
    sessionStorage.setItem('refresh', result.refresh)
    sessionStorage.setItem('access',result.access)
    sessionStorage.setItem('first_name', result.account.first_name)
    sessionStorage.setItem('last_name', result.account.last_name)
    sessionStorage.setItem('mobile', result.account.mobile)
    sessionStorage.setItem('email',result.account.email)
  }

  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <CoverLayout
      title="Welcome back"
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
        <SuiBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SuiTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            customClass="cursor-pointer user-select-none"
          >
            &nbsp;&nbsp;Remember me
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
