import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import Icon from "@mui/material/Icon";

// Billing page components
import Subscription from "../subscription";

function LicenseInfo() {
  return (
    <Card id="delete-account">
      <SuiBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SuiTypography variant="h6" fontWeight="medium">
          Subsciption Information
        </SuiTypography>
        <SuiButton variant="gradient" buttonColor="dark">
          <Icon className="font-bold">add</Icon>
          &nbsp;buy new plan
        </SuiButton>
      </SuiBox>
      <SuiBox pt={1} pb={2} px={2}>
        <SuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Subscription
            plan="Free"
            users="5"
            start="12 Oct 2021"
            end="11 Nov 2021"
            cost="$0"
          />
          <Subscription
            plan="Paid"
            users="20"
            start="12 Nov 2021"
            end="11 Nov 2022"
            cost="$100"
          />
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default LicenseInfo;
