import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

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

function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function daitell(){
   const item = {name,email,password}
   console.warn(item);
  }

  const [agreement, setAgremment] = useState(true);

  const handleSetAgremment = () => setAgremment(!agreement);

  return (
    <BasicLayout
      title="Welcome to MI GLASS!"
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
              <SuiInput type="name" placeholder="Company name" value={name} onChange={(e) => setName (e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="name" placeholder="Name" value={name} onChange={(e) => setName (e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail (e.target.value)} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword (e.target.value)} />
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
              <SuiButton variant="gradient" buttonColor="dark" fullWidth onClick={() => daitell()} >
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
