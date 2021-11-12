import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import Icon from "@mui/material/Icon";
import { ContentCopy } from '@mui/icons-material';

function NameCell({name}) {
  return (
    <SuiBox display="flex" flexDirection="row">
      <Icon mr={2} className="material-icons-round" color="secondary">today</Icon>
      <SuiTypography ms={2} variant="caption" fontWeight="medium" textColor="text">
        {name}
      </SuiTypography>
    </SuiBox>
  );
}

function TimeCell({ date, start, end }) {
  return (
    <SuiBox display="flex" flexDirection="row">
      <Icon className="material-icons-round" color="secondary">schedule</Icon>
      <SuiTypography  variant="caption" fontWeight="medium" textColor="text">
        {date} {start} {end}
      </SuiTypography>
    </SuiBox>
  );
}

function ActionCell({meetingId}) {
  console.log(`meeting ${meetingId}`)

  return (
    <SuiBox display="flex" flexDirection="row">
        <SuiButton variant="caption" fontWeight="medium" textColor="text">
          <ContentCopy />
          <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="text">
              Copy
          </SuiTypography>
        </SuiButton>        
        <SuiButton variant="caption" fontWeight="medium" textColor="text">
          <Icon className="material-icons-round">videocam</Icon>
          <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="text">
              Join
          </SuiTypography>
        </SuiButton>
        <SuiButton variant="caption" fontWeight="medium" textColor="text">
          <Icon className="material-icons-round">edit</Icon>
          <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="text">
              Edit
          </SuiTypography>
        </SuiButton>

    </SuiBox>
  )
}

export default {
  columns: [
    { name: "meeting", align: "left" },
    { name: "time", align: "left" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      meeting: <NameCell name="Test Meeting"  />,
      time: <TimeCell date="12 Nov 2021" start="09:30 AM" end="10:30 AM"  />,
      action: <ActionCell meetingId='1' />,
    },
    {
      meeting: <NameCell name="Test Meeting"  />,
      time: <TimeCell date="12 Nov 2021" start="09:30 AM" end="10:30 AM"  />,
      action: <ActionCell meetingId='1' />,
    },
    {
      meeting: <NameCell name="Test Meeting"  />,
      time: <TimeCell date="12 Nov 2021" start="09:30 AM" end="10:30 AM"  />,
      action: <ActionCell meetingId='1' />,
    },
  ],
};
