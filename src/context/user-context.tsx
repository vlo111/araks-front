import { createContext } from 'react';

type UserContextType = {
  avatar: string;
  setAvatar: (avatar: string) => void;
};

export const UserContext = createContext<UserContextType>({
  avatar: '',
  setAvatar: (avatar: string) => undefined,
});
