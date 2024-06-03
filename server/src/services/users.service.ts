const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../db/users.json');

function readDB() {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}

export type UserData = {
  id: number;
  name: string;
  avatar?: string;
};

export const getAllUsers = async () => {
  const dbUsers: UserData[] = await readDB();
  
  return dbUsers;
};