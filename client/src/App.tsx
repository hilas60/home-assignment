import { useState } from "react";
import { Header, PostEditor } from "./components";
import { useUsers } from "./hooks/useUsers";
import { usePosts } from "./hooks/usePosts";
import { Post } from "./components/Post";
import './index.css';

function App() {

  const { getUserById, activeUser, switchUser } = useUsers();
  const { posts, createOrEditPost } = usePosts();

  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);

  const openEditor = () => setIsPostEditorOpen(true);

  return (
    <>
      <Header openPostEditor={openEditor} activeUser={activeUser} switchUser={switchUser} />
      <div className="posts-wrapper">
        {posts.map(post => 
          <Post 
            key={post.id}
            post={post} 
            userInfo={getUserById(post.userId)} 
            isActiveUserPost={post.userId === activeUser.id}
          />)}
      </div>
      <PostEditor 
        activeUser={activeUser}
        isOpen={isPostEditorOpen}
        handleSubmit={createOrEditPost}
        handleClose={() => setIsPostEditorOpen(false)}
      />
    </>
  );
}

export default App;
