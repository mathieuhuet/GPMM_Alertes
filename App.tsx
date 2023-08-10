import React, { FunctionComponent, useEffect, useReducer, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import NotConnectedStack from './navigators/notConnectedStack';
import ConnectedStack from './navigators/connectedStack';
import { UserContext, UserDispatchContext } from './context/user/userContext';
import { initialUser, userReducer } from './context/user/userReducer';
import { getUserInfo } from './services/userServices/getUserInfo';
import { Platform } from 'react-native';



const getAccessToken: () => Promise<string> = async () => {
  let result = await SecureStore.getItemAsync('accessToken');
  if (result) {
    return result;
  } else {
    return '';
  }
}

const App: FunctionComponent = () => {
  const [user, dispatch] = useReducer(userReducer, initialUser);
  const [accessToken, setAccesToken] = useState('');
  useEffect(() => {
    getAccessToken().then(data => {
      if (!user.accessToken) {
        dispatch({ type: 'SET_ACCESSTOKEN', payload: {accessToken: data}});
      }
      if (!accessToken) {
        setAccesToken(data);
      }
    }).catch(err => {
      console.log(err, 'APP 1');
    }).finally(() => {
      if (accessToken) {
        getUserInfo(accessToken).then((result) => {
          dispatch({ type: 'SET_CREDENTIALS', 
          payload: {
            firstName: result.data.firstName, 
            lastName: result.data.lastName,
            email: result.data.email,
            profileIconColor: result.data.profileIconColor, 
            profileIconBackgroundColor: result.data.profileIconBackgroundColor,
            _id: result.data._id
          }});
        }).catch((err) => {
          console.log(err, 'APP 2');
          dispatch({ type: 'SET_ACCESSTOKEN', payload: {accessToken: ''}})
        })
      }
    });
  }, [accessToken])
  console.log(Platform.OS);
  console.log(user, 'APP 4');
  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {user.accessToken ? <ConnectedStack/> : <NotConnectedStack/>}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}


export default App;