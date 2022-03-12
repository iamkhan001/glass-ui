import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import QRCode from 'qrcode.react';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { saveAs } from 'file-saver';
import {getUserId} from './session'

const Alert = React.forwardRef(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

export const alertDialog = (showCancel, title, message, onOkey, onCancel) => {

  console.log('alert');

  const open = message.trim() !== "";

  let actions = null;
  if(showCancel) {
    actions = (
      <DialogActions>
        <Button onClick={() => {onCancel()}}>Cancel</Button>
        <Button onClick={() => {onOkey()}} >
          Okey
        </Button>
    </DialogActions>
    )
  }else {
    actions = (
      <DialogActions>
        <Button onClick={() => {onOkey()}} >
          Okey
        </Button>
    </DialogActions>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={() => {onCancel()}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      {actions}
    </Dialog>
  );
}

export const qrDialog = (user, onClose) => {

  console.log('user', user);
  const show = user !== null;
  let qr = null;
  let name = null;
  if(user !== null) {
    const data = {
      'code': user.accountId
    };
    const text = base64_encode(JSON.stringify(data));
    console.log('encoded', qr);
    name = `${user.first_name} ${user.last_name}`;
    qr = (<QRCode value={text} size='250' />);
  }
  
  const donwloadQr = () => {
    if(user !== null) {
      const canvas = document.querySelector('.HpQrcode > canvas');
      canvas?.toBlob(function(blob) {
        saveAs(blob, `${user.first_name}_${user.last_name}.png`);
      });
    }
  }

  return (
    <Dialog
      open={show}
      onClose={() => {onClose()}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        QR code for glass {name}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" className="HpQrcode">
           {qr}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {onClose()}}>Close</Button>
        <Button onClick={() => {donwloadQr()}} >
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export const myQrCode = () => {
  const data = {
    'code': getUserId()
  };
  const text = base64_encode(JSON.stringify(data));
  console.log('encoded', text);
  return (<QRCode bgColor={'transparent'} value={text} size='200' />);
}

export const progressDialog = (title) => {
  const open = (title != null && title.trim() !== '');

  return (
    <Dialog
        open={open}
        keepMounted
        onClose={() => {}}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Box justifyContent="center" sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
  );
}



/* error, warning, info, success */
export function showToastMessage(open, type, msg, handleClose) {
    return (
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
         {msg}
        </Alert>
      </Snackbar>
    );
  }

  
export default progressDialog();

