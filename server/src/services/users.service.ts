const users = require('../../db/users.json');

export const getAllUsers = async () => {
  return await users;
};