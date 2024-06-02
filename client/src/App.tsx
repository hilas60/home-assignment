import { useState } from "react";
import { Header } from "./components";
import { PostData, UserData } from "./types";
import { useUsers } from "./hooks/useUsers";

function App() {

  const { users, activeUser, switchUser } = useUsers();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);

  const openEditor = () => setIsPostEditorOpen(true);

  return (
    <>
      <Header openPostEditor={openEditor} activeUser={activeUser} switchUser={switchUser} />
      <div className="posts-wrapper"></div>
    </>
  );
}

export default App;
