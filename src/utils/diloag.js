import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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
        <Button onClick={() => {onOkey()}} autoFocus>
          Okey
        </Button>
    </DialogActions>
    )
  }else {
    actions = (
      <DialogActions>
        <Button onClick={() => {onOkey()}} autoFocus>
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

