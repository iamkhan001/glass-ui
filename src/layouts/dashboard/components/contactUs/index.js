// @mui material components
import { Redirect, Link } from 'react-router-dom'
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Custom styles for the WorkWithTheRockets
import styles from "./styles";

function ContactUs(onHelpClick) {
  const classes = styles();

  return (
    <Card className="h-100">
      <SuiBox position="relative" height="100%" p={2}>
        <SuiBox customClass={classes.workWithTheRockets_content}>
          <SuiBox mb={3} pt={1}>
            <SuiTypography variant="h5" textColor="white" fontWeight="bold">
              Need help?
            </SuiTypography>
          </SuiBox>
          <SuiBox mb={2}>
            <SuiTypography variant="body2" textColor="white">
              Having trouble? See Help documentation or Contact us here and we&apos;ll get back to you as soon as possible
            </SuiTypography>
          </SuiBox>
          <SuiTypography
            component={Link}
            to="/help"
            variant="button"
            textColor="white"
            fontWeight="medium"
            customClass={classes.workWithTheRockets_button}
            onclick = {() => onHelpClick}
          >
            Read More
            <Icon className="font-bold">arrow_forward</Icon>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default ContactUs;
