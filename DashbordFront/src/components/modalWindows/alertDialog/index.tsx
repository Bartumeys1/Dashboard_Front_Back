import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useActions } from '../../../hooks/useActions';
import { Navigate } from 'react-router-dom';


const DeletePostDialog:React.FC<{entitie:any }> =({entitie})=> {

  const { RemoveBlog } = useActions();
  const [open, setOpen] = React.useState(true);
  const [isRedirect, setIsRedirect] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleAgree= ()=>{
    RemoveBlog(entitie.id);
   console.log(`delete... ${entitie.title}`);
   setIsRedirect(true);
  }
  
  React.useEffect(()=>{
setIsRedirect(false);
  },[]);
  if(isRedirect)
  {
    return <Navigate to="/dashboard/editBlog"/>;
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this post: "{entitie.title}"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeletePostDialog;