// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import Divider from "@mui/material/Divider";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// Overview page components
import Header from "./components/Header";


function Overview() {

  const [curPassword, setCurPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');

  const [firstName, setFirstName] = useState('Jovy');
  const [lastName, setLastName] = useState('Chiu');
  const [email, setEmail] = useState('jovy@mirobotic.sg');

  async function updateInfo() {
    console.log(`${firstName} ${lastName} ${email}`)
  }

  return (
    <DashboardLayout>
      <Header />
      <SuiBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
          <ProfileInfoCard
              title="profile information"
              description=""
              info={{
                fullName: "Jovy Chiu",
                mobile: "+65 1234 1234",
                email: "jovy@mirobotic.sg",
                location: "Singapore",
                role: "Admin",
              }}
              social={[
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Card className="h-100">
              <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                Update account details
                </SuiTypography>
              </SuiBox>
              <SuiBox p={2}>
                <SuiBox opacity={0.3}>
                  <Divider />
                </SuiBox>
                <SuiBox mb={2}>
                  <SuiBox mb={1} ml={0.5}>
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      First Name
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="text" placeholder="first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </SuiBox>
                <SuiBox mb={2}>
                  <SuiBox mb={1} ml={0.5}>
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Last Name
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="text" placeholder="last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </SuiBox>
                <SuiBox mb={2}>
                  <SuiBox mb={1} ml={0.5}>
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Email
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </SuiBox>
                <SuiBox mt={4} mb={1}>
                  <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={() => updateInfo()}>
                    Update Details
                  </SuiButton>
                </SuiBox>
              </SuiBox>
            </Card>
          </Grid>
          <Grid item xs={12} xl={4}>
            <Card className="h-100">
              <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                Update password
                </SuiTypography>
              </SuiBox>
              <SuiBox p={2}>
                <SuiBox opacity={0.3}>
                  <Divider />
                </SuiBox>
                <SuiBox mb={2}>
                  <SuiBox mb={1} ml={0.5}>
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Current password
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="password" placeholder="current password" value={curPassword} onChange={(e) => setCurPassword(e.target.value)} />
                </SuiBox>
                <SuiBox mb={2}>
                  <SuiBox mb={1} ml={0.5}>
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      New password
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="password" placeholder="new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </SuiBox>
                <SuiBox mb={2}>
                  <SuiBox mb={1} ml={0.5}>
                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Verify new password
                    </SuiTypography>
                  </SuiBox>
                  <SuiInput type="password" placeholder="verify new password" value={reNewPassword} onChange={(e) => setReNewPassword(e.target.value)} />
                </SuiBox>
                <SuiBox mt={4} mb={1}>
                  <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={() => updateInfo()}>
                    Update Password
                  </SuiButton>
                </SuiBox>
              </SuiBox>
            </Card>          
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
