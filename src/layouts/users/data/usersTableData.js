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

function StatusCell({ status }) {
  if(status) {
    return (
      <SuiBadge variant="gradient" badgeContent="active" color="success" size="extra-small" />
    )
  }
  return (
    <SuiBadge variant="gradient" badgeContent="inactive" color="secondary" size="extra-small" />
  )
}

function ActionCell({user, onActivate, onDeactivate, onEdit, onDelete}) {
  console.log('ActionCell', user);
  let active;
  if (user.is_active) {
    active = <SuiButton variant="caption" fontWeight="medium" textColor="success" onClick={() => onActivate(user)}>
    <Icon className="material-icons-round" color="success">key</Icon>
      <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="success">
          Activate
      </SuiTypography>
    </SuiButton>
  } else {
    active = <SuiButton variant="caption" fontWeight="medium" textColor="secondary"  onClick={() => onDeactivate(user)}>
    <Icon className="material-icons-round" color="secondary">lock</Icon>
      <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="secondary">
          Deactivate
      </SuiTypography>
    </SuiButton>
  }
  return (
    <SuiBox display="flex" flexDirection="row">
        {active}
        <SuiButton variant="caption" fontWeight="medium" textColor="text"  onClick={() => onEdit(user)}>
          <Icon className="material-icons-round">edit</Icon>
          <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="text">
              Edit
          </SuiTypography>
        </SuiButton>
        <SuiButton variant="caption" fontWeight="medium" textColor="error"  onClick={() => onDelete(user)}>
          <Icon className="material-icons-round" color="error">delete</Icon>
          <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="error">
              Delete
          </SuiTypography>
        </SuiButton>
    </SuiBox>
  )
}

export default function getRows(data, onActivate, onDeactivate, onEdit, onDelete) {
  const rows = [];
  data.map((user) =>
    rows.push(
      {
        name: <NameCell image={team1} name={`${user.first_name} ${user.last_name}`}  />,
        email: <EmailCell email={user.email} />,
        status: <StatusCell status={user.is_active} />,
        action: <ActionCell user={user} onActivate={onActivate} onDeactivate={onDeactivate} onEdit={onEdit} onDelete={onDelete} />,
      }
    )
  );

  return rows;
}
