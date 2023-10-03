import { createContext } from 'react';

type UserContextType = {
  avatar: string | null;
  setAvatar: (avatar: string | null) => void;
};
export const UserContext = createContext<UserContextType>({
  avatar: '' || null,
  setAvatar: (avatar: string | null) => undefined,
});
