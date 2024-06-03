import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

interface DeleteDialogProps {
    isOpen: boolean;
    toggleModal: () => void;
    handleDeletePost: () => void;
}
export const DeleteDialog:React.FC<DeleteDialogProps> = ({isOpen, toggleModal, handleDeletePost}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={toggleModal}
    >
      <DialogTitle>
        Delete Post
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleModal}>Cancel</Button>
        <Button onClick={handleDeletePost} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
