import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import Icon from "@mui/material/Icon";
import { ContentCopy, MeetingRoomSharp } from '@mui/icons-material';
import {dateToShowFormat} from "utils/ext"
import {isAdmin} from '../../../utils/session'

function NameCell({name}) {

  let display = name;
  if(name.length > 20) {
      display = name.substring(0, 20)+"..."
  }

  return (
    <SuiBox >
      <SuiTypography ms={2} variant="h5" fontWeight="large" textColor="text">
        {display} 
      </SuiTypography>
    </SuiBox>
  );
}

function AgendaCell({agenda}) {
  let display = agenda;
  if(agenda && agenda.length > 15) {
      display = agenda.substring(0, 15)+"..."
  }

  return (
    <SuiBox >
      <SuiTypography ms={2} variant="body2" fontWeight="large" textColor="text">
        {display} 
      </SuiTypography>
    </SuiBox>
  );
}

function TimeCell({ date, zone, duration }) {
  return (
    <SuiBox>
      <SuiBox display="flex" flexDirection="row">
        <Icon  mr={2}  className="material-icons-round" color="info">today</Icon>
        <SuiTypography  ml={1}  variant="caption" fontWeight="medium" textColor="text">
          {dateToShowFormat(date, zone)}
        </SuiTypography>
      </SuiBox>
      <SuiBox display="flex" flexDirection="row">
        <Icon  mr={2} className="material-icons-round" color="info">schedule</Icon>
        <SuiTypography ml={1} variant="caption" fontWeight="medium" textColor="text">
        {duration} mins 
        </SuiTypography>
      </SuiBox>      
    </SuiBox>

  );
}

function ActionCell({meetingId, title, url, onCopyLink, onEdit, onDelete}) {
  console.log(`meeting ${meetingId}`)

  if(!isAdmin()) {
    return (
      <SuiBox display="flex" flexDirection="row">
        <SuiButton variant="caption" fontWeight="medium" textColor="text" onClick={() => onCopyLink(meetingId, url)}>
          <Icon className="material-icons-round">info</Icon>
          <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="text">
              Details
          </SuiTypography>
        </SuiButton>        
    </SuiBox>
    )
  }

  return (
    <SuiBox display="flex" flexDirection="row">
        <SuiButton variant="caption" fontWeight="medium" textColor="text" onClick={() => onCopyLink(meetingId, url)}>
          <Icon className="material-icons-round">info</Icon>
          <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="text">
              Details
          </SuiTypography>
        </SuiButton>        
        {/* <SuiButton variant="caption" fontWeight="medium" textColor="text" onClick={() => onEdit(meetingId, title)}>
          <Icon className="material-icons-round">edit</Icon>
          <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="text">
              Edit
          </SuiTypography>
        </SuiButton> */}
        <SuiButton variant="caption" fontWeight="medium" textColor="text" onClick={() => onDelete(meetingId, title)}>
          <Icon className="material-icons-round">delete</Icon>
          <SuiTypography margin="5px" variant="caption" fontWeight="medium" textColor="text">
              Delete
          </SuiTypography>
        </SuiButton>
    </SuiBox>
  )
}

export function getMeetingRows(data, onCopyLink, onEdit, onDelete){
  const rows = [];
  data?.map((meeting) =>
  {
      console.log('meeting', meeting);
      rows.push(
        {
          name: <NameCell name={meeting.topic} />,
          agenda: <AgendaCell agenda={meeting.agenda} />,
          time: <TimeCell date={meeting.start_time} zone={meeting.timezone} duration={meeting.duration} />,
          action: <ActionCell meetingId={meeting.id} title={meeting.topic} url={meeting.join_url} onCopyLink={onCopyLink} onEdit={onEdit} onDelete={onDelete} />,
        }
      )
    }
  );

  return rows;
}

export default getMeetingRows();

export function getColoumns() {
  return [
    { name: "name", align: "left" },
    { name: "agenda", align: "left" },
    { name: "time", align: "left" },
    { name: "action", align: "center" },
  ]
}

