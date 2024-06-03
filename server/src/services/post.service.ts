const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../db/posts.json');

function readDB() {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}

function writeDB(data: PostData) {
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

    const newId = dbPosts.length + 1000; // creating a new id with the same structure of current ids
    const newPost = {...post, date: new Date(), id: newId};

    dbPosts.push(newPost);
    writeDB(dbPosts); 
    
    return newPost;
  } catch (error) {
    throw new Error('failed to write to database' + error) 
  }

}