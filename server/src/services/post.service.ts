const posts = require('../../db/posts.json');

type PostData = {
  id: number;
  userId: number;
  content: string;
  date: string;
  imageUrl?: string;
};

export const getAllPosts = async () => {
  const dbPosts: PostData[] = await posts;
  const sortedPosts = dbPosts.sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  })
  return sortedPosts;
};