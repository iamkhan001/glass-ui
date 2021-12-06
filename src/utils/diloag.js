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


export const alertDialog = (showCancel, title, message, onOkey, onCancel) => {

  console.log('alert');

  const open = title.trim() !== "";

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

export default progressDialog();