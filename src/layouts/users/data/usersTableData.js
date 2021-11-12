import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiBadge from "components/SuiBadge";
import Icon from "@mui/material/Icon";
import SuiButton from "components/SuiButton";

// Images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";

function NameCell({ image, name }) {
  return (
    <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <SuiBox mr={2}>
        <SuiAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SuiBox>
      <SuiBox display="flex" flexDirection="column">
        <SuiTypography variant="button" fontWeight="medium">
          {name}
        </SuiTypography>
      </SuiBox>
    </SuiBox>
  );
}

function EmailCell({ email }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" textColor="text">
        {email}
      </SuiTypography>
    </SuiBox>
  );
}

function ActionCell({userId, status}) {
  console.log(`user ${userId}`)
  let active;
  if (status === "Inactive") {
    active = <SuiButton variant="caption" fontWeight="medium" textColor="success">
    <Icon className="material-icons-round" color="success">key</Icon>
      <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="success">
          Activate
      </SuiTypography>
    </SuiButton>
  } else {
    active = <SuiButton variant="caption" fontWeight="medium" textColor="secondary">
    <Icon className="material-icons-round" color="secondary">lock</Icon>
      <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="secondary">
          Deactivate
      </SuiTypography>
    </SuiButton>
  }
  return (
    <SuiBox display="flex" flexDirection="row">
        {active}
        <SuiButton variant="caption" fontWeight="medium" textColor="text">
          <Icon className="material-icons-round">edit</Icon>
          <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="text">
              Edit
          </SuiTypography>
        </SuiButton>
        <SuiButton variant="caption" fontWeight="medium" textColor="error">
          <Icon className="material-icons-round" color="error">delete</Icon>
          <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="error">
              Delete
          </SuiTypography>
        </SuiButton>
    </SuiBox>
  )
}

export default {
  columns: [
    { name: "name", align: "left" },
    { name: "email", align: "left" },
    { name: "status", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      name: <NameCell image={team1} name="Jovy Chiu"  />,
      email: <EmailCell email="jovy@mirobotic.sg" />,
      status: (
        <SuiBadge variant="gradient" badgeContent="active" color="success" size="extra-small" />
      ),
      action: <ActionCell userId='1' status="Active" />,
    },
    {
      name: <NameCell image={team3} name="Imran Khan"  />,
      email: <EmailCell email="imran@mirobotic.sg" />,
      status: (
        <SuiBadge variant="gradient" badgeContent="active" color="success" size="extra-small" />
      ),
      action: <ActionCell userId='1' status="Active" />,
    },
    {
      name: <NameCell image={team2} name="John Michael"  />,
      email: <EmailCell email="john@mirobotic.sg" />,
      status: (
        <SuiBadge variant="gradient" badgeContent="active" color="success" size="extra-small" />
      ),
      action: <ActionCell userId='1' status="Active" />,
    },
    {
      name: <NameCell image={team4} name="Sam Shaikh"  />,
      email: <EmailCell email="sam@mirobotic.sg" />,
      status: (
        <SuiBadge variant="gradient" badgeContent="inactive" color="secondary" size="extra-small" />
      ),
      action: <ActionCell userId='1' status="Inactive" />,
    },
    {
      name: <NameCell image={team5} name="Fari Khan"  />,
      email: <EmailCell email="fari@mirobotic.sg" />,
      status: (
        <SuiBadge variant="gradient" badgeContent="active" color="success" size="extra-small" />
      ),
      action: <ActionCell userId='1' status="Active" />,
    },
  ],
};
