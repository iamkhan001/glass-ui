import Card from "@mui/material/Card";
import { useHistory, Redirect, Link } from 'react-router-dom'

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import {isAuthenticated, getUser} from "utils/session" 

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Table";
import SuiButton from "components/SuiButton";
import Icon from "@material-ui/core/Icon";

// Custom styles for the Tables
import styles from "./styles";

// Data
import meetingsTableData from "./data/meetingsTableData";

function Tables() {

  if(!isAuthenticated()) {
    return <Redirect to='/authentication/sign-in'  />
  }

  const classes = styles();
  const { columns, rows } = meetingsTableData;
  const history = useHistory();

  const setCreateMeeting = () => {
      history.push('/create-meeting');
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">My meetings</SuiTypography>
              <SuiButton variant="gradient" buttonColor="dark"  onClick={() => setCreateMeeting()}>
                  <Icon className="material-icons-round font-bold">add</Icon>
                  &nbsp;Create Meeting
              </SuiButton>
            </SuiBox>
            <SuiBox customClass={classes.tables_table}>
              <Table columns={columns} rows={rows} />
            </SuiBox>
          </Card>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
