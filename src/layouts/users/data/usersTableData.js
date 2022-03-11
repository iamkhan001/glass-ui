import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiBadge from "components/SuiBadge";
import Icon from "@mui/material/Icon";
import SuiButton from "components/SuiButton";
import getRoleName from "utils/ext"
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
// Images
import team1 from "assets/images/team-4.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";

function NameCell({ myRole, image, role, name }) {
  if(myRole === 'A') {
    return (
      <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
        <SuiBox mr={2}>
          <SuiAvatar
              alt="profile-image"
              variant="rounded"
              size="md"
              customClass="shadow-sm"
            />
        </SuiBox>
        <SuiBox display="flex" flexDirection="column">
          <SuiTypography variant="button" fontWeight="medium">
            {name}
          </SuiTypography>
          <SuiTypography variant="caption" fontWeight="normal" textColor="info">
            {getRoleName(role)}
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    );
  }
  return (
    <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <SuiBox mr={2}>
      <SuiAvatar
              alt="profile-image"
              variant="rounded"
              size="md"
              customClass="shadow-sm"
            />
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

function ActionCell({role, userId, user, onViewQrCode, onActivate, onDeactivate, onEdit, onDelete}) {
  console.log('ActionCell', user);
  let active;
  /*
  if(!user.verified) {
    active = <SuiButton variant="caption" fontWeight="medium" textColor="info">
    <Icon className="material-icons-round" color="success">key</Icon>
      <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="info">
          Not verified!
      </SuiTypography>
    </SuiButton>
  }else
  */
  if(role === 'A') {
    if (!user.is_active) {
      active =  <>
      <SuiButton variant="caption" fontWeight="medium" textColor="success" onClick={() => onActivate(user)}>
        <Icon className="material-icons-round" color="success">key</Icon>
        <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="success">
            Activate
        </SuiTypography>
      </SuiButton>
      <SuiButton variant="caption" fontWeight="medium" textColor="text" >
        <Icon className="material-icons-round"><QrCodeScannerRoundedIcon /></Icon>
          <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="text">
            -- 
          </SuiTypography>
      </SuiButton>
    </>

    } else {
      active = <>
        <SuiButton variant="caption" fontWeight="medium" textColor="secondary"  onClick={() => onDeactivate(user)}>
          <Icon className="material-icons-round" color="secondary">lock</Icon>
          <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="secondary">
              Deactivate
          </SuiTypography>
        </SuiButton>
        <SuiButton variant="caption" fontWeight="medium" textColor="text"  onClick={() => onViewQrCode(user)}>
          <Icon className="material-icons-round"><QrCodeScannerRoundedIcon /></Icon>
            <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="text">
              QR 
            </SuiTypography>
        </SuiButton>
      </>
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
  
  let qr = null;
  
  if(user.id === userId) {
    qr = (<SuiButton variant="caption" fontWeight="medium" textColor="text"  onClick={() => onViewQrCode(user)}>
      <Icon className="material-icons-round"><QrCodeScannerRoundedIcon /></Icon>
        <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="text">
          QR 
        </SuiTypography>
    </SuiButton>)
  }
  
  return (
   <>
    {qr}
    <SuiButton variant="caption" fontWeight="medium" textColor="secondary" >
      <SuiTypography variant="caption" fontWeight="normal" textColor="info">
        {getRoleName(user.role)}
      </SuiTypography>
    </SuiButton>
   </>
  )

}

function getAdminRows(role, userId, data, onViewQrCode, onActivate, onDeactivate, onEdit, onDelete) {
  const rows = [];
  data.map((user) =>
    rows.push(
      {
        name: <NameCell myRole = {role} image={team1} role={user.role} name={`${user.first_name} ${user.last_name}`}  />,
        email: <EmailCell email={user.email} />,
        status: <StatusCell status={user.is_active} />,
        action: <ActionCell role={role} userId={null} user={user} onViewQrCode={onViewQrCode} onActivate={onActivate} onDeactivate={onDeactivate} onEdit={onEdit} onDelete={onDelete} />,
      }
    )
  );
  return rows;
}

function getUserRows(role, userId, data, onActivate, onDeactivate, onEdit, onDelete) {
  const rows = [];
  data.map((user) =>
    rows.push(
      {
        name: <NameCell myRole = {role} image={team1} role={user.role} name={`${user.first_name} ${user.last_name}`}  />,
        email: <EmailCell email={user.email} />,
        status: <StatusCell status={user.is_active} />,
        role: <ActionCell role={role} userId={userId} user={user} onActivate={onActivate} onDeactivate={onDeactivate} onEdit={onEdit} onDelete={onDelete} />,
      }
    )
  );
  return rows;
}

export default function getRows(role, userId, data, onViewQrCode, onActivate, onDeactivate, onEdit, onDelete) {
  
  if(role === 'A') {
    return getAdminRows(role, userId, data, onViewQrCode, onActivate, onDeactivate, onEdit, onDelete);
  }

  return getUserRows(role, userId, data, onActivate, onDeactivate, onEdit, onDelete);
}


