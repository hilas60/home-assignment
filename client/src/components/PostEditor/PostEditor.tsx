import { useRef } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { CreatePostData, PostData, UserData } from "../../types";
import "./styles.css";

interface PostEditorProps {
  isOpen: boolean;
  activeUser: UserData;
  post?: PostData;
  handleSubmit: (content: CreatePostData) => void;
  handleClose: () => void;
}

export const PostEditor: React.FC<PostEditorProps> = ({isOpen, activeUser, post, handleSubmit, handleClose}) => {
  const title = post ? "Edit Post" : "Create New Post";

  const submitPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const {content, imageUrl} = Object.fromEntries((formData as any).entries());
    handleSubmit({
      content, 
      imageUrl, 
      userId: activeUser.id,
      id: post?.id || 0
    })
    handleClose();
  }
  
  return (
    <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: submitPost
        }}
          fullWidth
          maxWidth={'sm'}
          disableScrollLock
        >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent
        >
          <TextField
            autoFocus
            margin="dense"
            id="imageUrl"
            name="imageUrl"
            label="Image URL"
            type="url"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            multiline
            margin="dense"
            id="content"
            name="content"
            label="Post Content"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={post ? post.content : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
  );
};
