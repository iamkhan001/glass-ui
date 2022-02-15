import { useState } from "react";

// react-router-dom components
import { useHistory, Redirect, Link } from 'react-router-dom'
import {isAuthenticated, saveUser} from "utils/session"

import {signUpApi, apiPostUnsecure} from "utils/api"

import validator from 'validator'

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

import axios from "axios";

function SignUp() {
  const history = useHistory();

  const [firstName, setFristName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [error, setError] = useState('');

  const role = "A";
  
  console.log('screen register');

  async function register() {
    
    if(firstName.trim() === "") {
      setError('Enter first name')
      return
    }
    if(lastName.trim() === "") {
      setError('Enter last name')
      return
    }
    if(email.trim() === "") {
      setError('Enter email')
      return
    }
    if(!validator.isEmail(email)) {
      setError('Invalid email')
      return
    }
    if(password.trim() === "") {
      setError('Enter password')
      return
    }
    if(confPassword.trim() === "") {
      setError('Confirm password')
      return
    }

    if(password !== confPassword) {
      setError('Password not matching!')
      return;
    }

    const data = {firstName,lastName,company, mobile, email, password, role}
   
    apiPostUnsecure(signUpApi, data,
       (response) => {
          saveUser(response);
          history.push('/dashboard');
      },
      (errorMsg) => {
          setError(errorMsg);
      }
    )

  }

  const [agreement, setAgremment] = useState(true);

  const handleSetAgremment = () => setAgremment(!agreement);

  return (
    <BasicLayout
      title="Welcome to MI ROBOTIC!"
      description="A leading tech company in AI and VR"
      image={curved6}
    >
      <Card>
        <SuiBox p={3} mb={1} textAlign="center">
          <SuiTypography variant="h5" fontWeight="medium">
            Register with
          </SuiTypography>
        </SuiBox>
        <SuiBox mb={2}>
          <Socials />
        </SuiBox>
        <Separator />
        <SuiBox pt={2} pb={3} px={3}>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiInput type="name" placeholder="First Name" value={firstName} onChange={(e) => setFristName (e.target.value)} />
            </SuiBox>            
            <SuiBox mb={2}>
              <SuiInput type="name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName (e.target.value)} />
            </SuiBox>   
            <SuiBox mb={2}>
              <SuiInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail (e.target.value)} />
            </SuiBox>                     
            <SuiBox mb={2}>
              <SuiInput type="name" placeholder="Company name (optional)" value={company} onChange={(e) => setCompany (e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="phone" placeholder="Phone Number (optional)" value={mobile} onChange={(e) => setMobile (e.target.value)} />
            </SuiBox>

            <SuiBox mb={2}>
              <SuiInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword (e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="password" placeholder="Confirm Password" value={confPassword} onChange={(e) => setConfPassword (e.target.value)} />
            </SuiBox>
            <SuiBox mt={3} textAlign="center">
            <SuiTypography mt={3} variant="button" fontWeight="regular" textColor="error" textAlign="center">
              {error}
              </SuiTypography>
            </SuiBox>            
            <SuiBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                customClass="cursor-pointer user-select-none"
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SuiTypography>
              <SuiTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
                Terms and Conditions
              </SuiTypography>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              <SuiButton variant="gradient" buttonColor="dark" fullWidth onClick={() => register()} >
                sign up
              </SuiButton>
            </SuiBox>
            <SuiBox mt={3} textAlign="center">
              <SuiTypography variant="button" textColor="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SuiTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  textColor="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
