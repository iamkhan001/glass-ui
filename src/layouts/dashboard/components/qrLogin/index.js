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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Custom styles for the BuildByDevelopers
import qrCode from "assets/images/qr.png";
import wavesWhite from "assets/images/shapes/waves-white.svg";

import styles from "./styles";

// Images

function QrLogin() {
  const classes = styles();

  return (
    <Card>
      <SuiBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <SuiBox display="flex" flexDirection="column" height="100%">
              <SuiBox pt={1} mb={0.5}>
                <SuiTypography variant="body2" textColor="text" fontWeight="medium">
                  Easy to use
                </SuiTypography>
              </SuiBox>
              <SuiTypography variant="h5" fontWeight="bold" gutterBottom>
                GLASS LOGIN
              </SuiTypography>
              <SuiBox mb={6}>
                <SuiTypography variant="body2" textColor="text">
                  Scan the QR code to log in with your glass device.
                </SuiTypography>
              </SuiBox>
              <SuiTypography
                component="a"
                href="#"
                variant="button"
                textColor="text"
                fontWeight="medium"
                customClass={classes.buildByDevelopers_button}
              >
                Read More
                <Icon className="font-bold">arrow_forward</Icon>
              </SuiTypography>
            </SuiBox>
          </Grid>
          <Grid item xs={12} lg={5} className="ml-auto relative">
            <SuiBox
              height="100%"
              display="grid"
              justifyContent="center"
              alignItems="center"
              backgroundColor="info"
              borderRadius="lg"
              backgroundGradient
            >
              <SuiBox
                component="img"
                src={wavesWhite}
                alt="waves"
                display="block"
                position="absolute"
                left={0}
                width="100%"
                height="100%"
              />
              <SuiBox component="img" src={qrCode} alt="QR Login" width="100%" pt={3} />
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
    </Card>
  );
}

export default QrLogin;
