// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Billing page components
import LicenseInfo from "./components/licenseInfo";

function Licenses() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={4}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <LicenseInfo />
            </Grid>
            <Grid item xs={12} md={5}>
              {/* <Transactions /> */}
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  );
}

export default Licenses;
