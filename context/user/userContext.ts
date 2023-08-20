import { createContext } from 'react';

export const UserContext = createContext({
  firstName: '',
  lastName: '',
  email: '',
  profileIconColor: '',
  profileIconBackgroundColor: '',
  _id: '',
  accessToken: '',
  role: '',
  departement: '',
  admin: false
});
export const UserDispatchContext = createContext({
  firstName: '',
  lastName: '',
  email: '',
  profileIconColor: '',
  profileIconBackgroundColor: '',
  _id: '',
  accessToken: '',
  role: '',
  departement: '',
  admin: false
});