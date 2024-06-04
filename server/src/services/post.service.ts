const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../db/posts.json');

function readDB() {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}

function writeDB(data: PostData[]) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}


type PostData = {
  id: number;
  userId: number;
  content: string;
  date: string;
  imageUrl?: string;
};

export type CreatePostData = Omit<PostData, 'id' | 'date'>

export const getAllPosts = async () => {
  const dbPosts: PostData[] = await readDB();
  const sortedPosts = dbPosts.sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  })
  return sortedPosts;
};

export const createNewPost = async (post: CreatePostData) => {
  try {
    const dbPosts = readDB();

    const lastPostIdx = dbPosts.length - 1;
    const newId = dbPosts[lastPostIdx].id + 1; // creating a new id with the same structure of current ids
    const newPost = {...post, date: new Date(), id: newId};

    dbPosts.push(newPost);
    writeDB(dbPosts); 
    
    return newPost;
  } catch (error) {
    throw new Error('failed to add post to database, error:' + error) 
  }
}

export const editDbPost = async (id: number, updatedPost: CreatePostData) => {
  try {
    const dbPosts: PostData[] = readDB();;
    const updatedPosts = dbPosts.map(post => post.id === id ? updatedPost as PostData : post );
    writeDB(updatedPosts);
    return updatedPost;
  } catch (error) {
    throw new Error('failed to add post to database, error:' + error) 
  }
}

export const deletePostFromDb = async (id: number) => {
  try {
    const dbPosts: PostData[] = readDB();
    const updatedPosts = dbPosts.filter(post => post.id !== id);
    writeDB(updatedPosts);
  } catch (error) {
    throw new Error(`failed to delete post ${id} from database, error: ${error}`) 
  }
}