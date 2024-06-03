import { useState, useEffect } from 'react';
import { UserData } from '../types';
import { BASE_URL } from '../consts';

interface UseUsersResult {
  users: UserData[];
  activeUser: UserData;
  remainingUsers: UserData[];
  loading: boolean;
  error: string | null;
  switchUser: () => void;
  getUserById: (id: number) => UserData;
}

export const useUsers = (): UseUsersResult => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [activeUser, setActiveUser] = useState<UserData>({ id: 0, name: "" });
  const [remainingUsers, setRemainingUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // in case we will want to show a loading state in the UI
  const [error, setError] = useState<string | null>(null); // in case we will want to show error indication in the UI

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(BASE_URL + '/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data: UserData[] = await response.json();
        setUsers(data);
        setRemainingUsers(data);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if(users.length && activeUser.id === 0){
      switchUser();
    }
  }, [users])
  
  const switchUser = () => {
    const randomIndex = Math.floor(Math.random() * remainingUsers.length);
    const selectedUser = remainingUsers[randomIndex];

    setActiveUser(selectedUser);
    const newRemainingUsers = remainingUsers.filter(user => user.id !== selectedUser.id);

    if (newRemainingUsers.length === 0) {
      setRemainingUsers(users.filter(user => user.id !== selectedUser.id));
    } else {
      setRemainingUsers(newRemainingUsers);
    }
  };

  const usersMap = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {} as Record<number, UserData>)

  const getUserById = (id: number) => {
    return usersMap[id] || { id: 0, name: "" };
  }

  return {
    users,
    activeUser,
    remainingUsers,
    loading,
    error,
    switchUser,
    getUserById
  };
};

