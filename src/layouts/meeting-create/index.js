// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";

import Footer from "examples/Footer";
import Table from "examples/Table";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import Divider from "@mui/material/Divider";
import {generateSignature} from 'utils/zoom_api'
import { Typography } from "@mui/material";



function ZoomMeetings() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={4}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Typography> {generateSignature("test", "U")} </Typography>
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

export default ZoomMeetings;
