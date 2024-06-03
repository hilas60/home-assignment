import { useState } from "react";

import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { PostData, UserData } from "../../types";
import { UserAvatar } from "../UserAvatar";
import "./styles.css";


interface PostProps {
    post: PostData;
    userInfo: UserData;
    isActiveUserPost: boolean;
    onDeletePost: (id: number) => void;
}

export const Post: React.FC<PostProps> = ({post, userInfo, isActiveUserPost, onDeletePost}) => {
  const [isDeletePostOpen, setIsDeletePostOpen] = useState(false)

  const toggleDeleteConfirmationModal = () => setIsDeletePostOpen(prev => !prev);
  
  const handleDeletePost = () => {
    toggleDeleteConfirmationModal();
    onDeletePost(post.id);
  }

  return (
  <>
    <Card className="post-content">
      <CardHeader
        avatar={<UserAvatar user={userInfo}/>}
        title={ <Typography variant='body1'>{userInfo.name}</Typography>}
        subheader={<Typography variant="body2" color="GrayText">{post.date}</Typography>}
        />
      {post.imageUrl && <CardMedia
        component="img"
        height="200"
        image={post.imageUrl}
        alt={post.content}
        />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">{post.content}</Typography>
      </CardContent>
      <CardActions>
        <Container style={{paddingLeft: 0}}>
          {isActiveUserPost && 
          <>
            <IconButton aria-label="edit post">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete post" onClick={toggleDeleteConfirmationModal}>
              <DeleteIcon />
            </IconButton>
          </>
          }
        </Container>
        <IconButton aria-label="like post">
          <ThumbUpIcon color={false? 'info':'inherit'} />
        </IconButton>
      </CardActions>
    </Card>
    <Dialog
      open={isDeletePostOpen}
      onClose={toggleDeleteConfirmationModal}
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
        <Button onClick={toggleDeleteConfirmationModal}>Cancel</Button>
        <Button onClick={handleDeletePost} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  </>
  )
};
