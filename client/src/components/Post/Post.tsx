import { useState } from "react";

import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { CreatePostData, PostData, UserData } from "../../types";
import { UserAvatar } from "../UserAvatar";
import { PostEditor } from "../PostEditor";
import { DeleteDialog } from "./Dialogs";
import "./styles.css";


interface PostProps {
    post: PostData;
    userInfo: UserData;
    activeUser: UserData;
    onDeletePost: (id: number) => void;
    handleSubmit: (content: CreatePostData) => void;
}

export const Post: React.FC<PostProps> = ({post, userInfo, activeUser, onDeletePost, handleSubmit}) => {
  const [isDeletePostOpen, setIsDeletePostOpen] = useState(false)
  const [isEditPostOpen, setIsEditPostOpen] = useState(false)

  const isActiveUserPost = activeUser.id === post.userId;

  const toggleDeleteConfirmationModal = () => setIsDeletePostOpen(prev => !prev);
  const toggleEditConfirmationModal = () => setIsEditPostOpen(prev => !prev);
  
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
            <IconButton aria-label="edit post" onClick={toggleEditConfirmationModal}>
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
    <DeleteDialog 
      isOpen={isDeletePostOpen}
      handleDeletePost={handleDeletePost}
      toggleModal={toggleDeleteConfirmationModal}/>
    <PostEditor 
      isOpen={isEditPostOpen}
      activeUser={activeUser}
      handleClose={toggleEditConfirmationModal}
      handleSubmit={handleSubmit}
      post={post}
    />
  </>
  )
};
