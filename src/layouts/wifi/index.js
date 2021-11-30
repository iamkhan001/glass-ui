// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { useState } from "react";



// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Switch from "@mui/material/Switch";
import qrCode from "assets/images/qr.png";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";


function Wifi() {

  const [isHidden, setHidden] = useState(true);
  const [selection, setSetSelection] = useState("WPA/WPA2");

  const handleHidden = () => setHidden(!isHidden);

  const [openMenu, setOpenMenu] = useState();
  const handleOpenMenu = ({ currentTarget }) => setOpenMenu(currentTarget);
  const handleCloseMenu = (enc) => {
    console.log(`change ${enc} ${this}` );
    setOpenMenu(false);
    setSetSelection(enc);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={4}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Card>
                <SuiBox component="form" role="form" padding="20px">
                  <SuiBox mb={2}>
                    <SuiBox mb={1} ml={0.5}>
                      <SuiTypography component="label" variant="caption" fontWeight="bold">
                      Network Name (SSID) *
                      </SuiTypography>
                    </SuiBox>
                    <SuiInput type="text" placeholder="Network Name (SSID) *" />
                  </SuiBox>
                  <SuiBox mb={2}>
                    <SuiBox mb={1} ml={0.5}>
                      <SuiTypography component="label" variant="caption" fontWeight="bold">
                        Password
                      </SuiTypography>
                    </SuiBox>
                    <SuiInput type="text" placeholder="Password" />
                  </SuiBox>
                  <SuiBox mb={2}>
                      <SuiTypography component="label" variant="caption" fontWeight="bold">
                        Select Encryption
                      </SuiTypography>
                      <SuiBox>
                        <SuiButton buttonColor="secondary" onClick={handleOpenMenu}>
                          {selection}
                          <Icon className="material-icons-round font-bold">keyboard_arrow_down</Icon>
                        </SuiButton>
                        <Menu
                          anchorEl={openMenu}
                          getContentAnchorEl={null}
                          transformOrigin={{ vertical: "top" , horizontal: "left" }}
                          open={Boolean(openMenu)}
                          onClose={() => handleCloseMenu("WPA/WPA2")}
                        >
                          <MenuItem onClick={() => handleCloseMenu("WPA/WPA2")}>WPA/WPA2</MenuItem>
                          <MenuItem onClick={() => handleCloseMenu("WEP")}>WEP</MenuItem>
                          <MenuItem onClick={() => handleCloseMenu("None")}>None</MenuItem>
                        </Menu>
                      </SuiBox>
                  </SuiBox>
                  <SuiBox display="flex" alignItems="center">
                    <Switch checked={isHidden} onChange={handleHidden} />
                    <SuiTypography
                      variant="button"
                      fontWeight="regular"
                      onClick={handleHidden}
                      customClass="cursor-pointer user-select-none"
                    >
                      &nbsp;&nbsp;Hidden
                    </SuiTypography>
                  </SuiBox>
                  <SuiBox mt={4} mb={1}>
                    <SuiButton variant="gradient" buttonColor="info" fullWidth>
                      Generate QR code
                    </SuiButton>
                  </SuiBox>
                </SuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card >
                <SuiBox textAlign="center"  padding="20px">
                  <SuiBox component="img"  src={qrCode} alt="QR Login" width="300px" pt={3} />
                  <SuiTypography m={2} fontWeight="medium" textColor="text">
                    Scan this QR code on your google glass to connect wifi
                  </SuiTypography>
                </SuiBox>
              </Card>

            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  );
}

export default Wifi;
