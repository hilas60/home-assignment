import { useState } from "react";
import { Header } from "./components";
import { useUsers } from "./hooks/useUsers";
import { usePosts } from "./hooks/usePosts";
import { Post } from "./components/Post";
import './index.css';

function App() {

  const { getUserById, activeUser, switchUser } = useUsers();
  const { posts } = usePosts();

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
    </>
  );
}

export default App;
