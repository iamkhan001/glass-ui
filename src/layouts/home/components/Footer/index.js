import Grid from "@mui/material/Grid";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

function Footer() {
  return (
    <SuiBox component="footer" py={6}>
      <Grid container justifyContent="center">
        <Grid item xs={10} lg={8}>
          <SuiBox display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
          <SuiBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SuiTypography component="a" href="home" variant="body2" textColor="secondary">
                HOME
              </SuiTypography>
            </SuiBox>
            <SuiBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SuiTypography component="a" href="privacy" variant="body2" textColor="secondary">
                PRIVACY POLICY
              </SuiTypography>
            </SuiBox>
            <SuiBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SuiTypography component="a" href="terms-of-use" variant="body2" textColor="secondary">
                TERMS OF USE
              </SuiTypography>
            </SuiBox>
            <SuiBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SuiTypography component="a" href="help" variant="body2" textColor="secondary">
                HELP
              </SuiTypography>
            </SuiBox>
            <SuiBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SuiTypography component="a" href="about" variant="body2" textColor="secondary">
                ABOUT
              </SuiTypography>
            </SuiBox >
            <SuiBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SuiTypography component="a" href="contact" variant="body2" textColor="secondary">
                CONTACT
              </SuiTypography>
            </SuiBox >
          </SuiBox>
        </Grid>
        <Grid item xs={12} lg={8}>
          <SuiBox display="flex" justifyContent="center" mt={1} mb={3}>
            <SuiBox component="a" href="https://www.facebook.com/mirobotic.sg" mr={3} color="secondary">
              <FacebookIcon fontSize="small" />
            </SuiBox>
            <SuiBox component="a" href="https://twitter.com/mi_robotic" mr={3} color="secondary">
              <TwitterIcon fontSize="small" />
            </SuiBox>
            <SuiBox component="a" href="https://www.instagram.com/mirobotic/" mr={3} color="secondary">
              <InstagramIcon fontSize="small" />
            </SuiBox>
            <SuiBox component="a" href="https://www.linkedin.com/company/mirobotic" color="secondary">
              <LinkedInIcon fontSize="small" />
            </SuiBox>
          </SuiBox>
        </Grid>
        <Grid item xs={12} lg={8} className="text-center">
          <SuiTypography variant="body2" textColor="secondary">
            Copyright &copy; 2022 by MI ROBOTIC Pte Ltd.
          </SuiTypography>
        </Grid>
      </Grid>
    </SuiBox>
  );
}

export default Footer;
