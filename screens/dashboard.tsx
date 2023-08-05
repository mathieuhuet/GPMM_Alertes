import React, { FunctionComponent, useContext } from 'react';
import { View, ActivityIndicator, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { UserContext, UserDispatchContext } from '../context/user/userContext';
import * as SecureStore from 'expo-secure-store';
import { logoutUser } from '../services/userServices/logout';


// Custom components
import MainContainer from '../components/containers/mainContainer';
import LargeText from '../components/texts/largeText';
import { ScreenHeight } from '../components/shared';
import { colors } from '../components/colors';
import ProfileIcon from '../components/icons/profileIcon';

const TopBackGround = styled.View`
  background-color: ${colors.lightGray};
  width: 100%;
  height: ${ScreenHeight * 0.3}px;
  border-radius: 30px;
  position: absolute;
  top: -30px;
`;

const TopImage = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  max-height: 100%;
  position: absolute;
`;

const BottomImage = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  max-height: 50%;
  position: absolute;
  bottom: -30px;
`;

async function saveAccessToken(value: string) {
  await SecureStore.setItemAsync('accessToken', value);
}


const Dashboard: FunctionComponent = ({navigation}) => {
  const user = useContext(UserContext);
  const dispatch = useContext(UserDispatchContext);


  const logout = () => {
    logoutUser(user.accessToken).then(result => {
      if (result.data) {
        saveAccessToken('');
        dispatch({ type: 'SET_CREDENTIALS', 
        payload: {
          firstName: '', 
          lastName: '',
          email: '',
          profileIconColor: '', 
          profileIconBackgroundColor: '', 
          profileIconPolice: '',
          _id: ''
        }});
        dispatch({ type: 'SET_ACCESSTOKEN', payload: {accessToken: ''}});
      }
    }).catch(err => {
      console.log(err, 'MORE LOGOUT');
      saveAccessToken('');
    });
  }

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0}} >
      <TopBackGround/>
        {user.firstName ? 
          <MainContainer style={{backgroundColor: 'transparent'}}>

          </MainContainer>
        :
        <MainContainer style={{backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
              size='large'
              color={colors.lightGreen}
          />
        </MainContainer>  
        }
    </MainContainer>
  );
}

export default Dashboard;