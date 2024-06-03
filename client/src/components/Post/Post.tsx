import { Card, CardHeader, Container, IconButton, Typography } from "@mui/material";
import "./styles.css";
import { PostData, UserData } from "../../types";
import { UserAvatar } from "../UserAvatar";

import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface PostProps {
    post: PostData;
    userInfo: UserData;
    isActiveUserPost: boolean;
}

export const Post: React.FC<PostProps> = ({post, userInfo, isActiveUserPost}) => {
  return (
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
          <IconButton aria-label="delete post">
            <DeleteIcon />
          </IconButton>
        </>
        }
      </Container>
      <IconButton aria-label="like post">
        <ThumbUpIcon color={false? 'info':'inherit'} />
      </IconButton>
    </CardActions>
  </Card>)
};
