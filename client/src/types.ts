export type PostData = {
  id: number;
  userId: number;
  content: string;
  date: string;
  imageUrl?: string;
};

export type CreatePostData = Omit<PostData, 'date'> & { id?: number};

export type UserData = {
  id: number;
  name: string;
  avatar?: string;
};
