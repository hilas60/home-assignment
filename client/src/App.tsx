import { useState } from "react";
import { Header } from "./components";
import { PostData, UserData } from "./types";
import { useUsers } from "./hooks/useUsers";
import { usePosts } from "./hooks/usePosts";

function App() {

  const { users, activeUser, switchUser } = useUsers();
  const { posts } = usePosts();

  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);

  const openEditor = () => setIsPostEditorOpen(true);

  return (
    <>
      <Header openPostEditor={openEditor} activeUser={activeUser} switchUser={switchUser} />
      <div className="posts-wrapper">
        {posts.map(post => <div key={post.id}>{post.date}</div>)}
      </div>
    </>
  );
}

export default App;
