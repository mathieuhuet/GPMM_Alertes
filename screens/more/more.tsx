import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import * as SecureStore from 'expo-secure-store';
import { logoutUser } from '../../services/userServices/logout';
import { UserContext, UserDispatchContext } from '../../context/user/userContext';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import SmallText from '../../components/texts/smallText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import ProfileIcon from '../../components/icons/profileIcon';
import RegularButton from '../../components/buttons/regularButton';
import RegularText from '../../components/texts/regularText';
import PressableText from '../../components/texts/pressableText';


async function saveAccessToken(value: string) {
  await SecureStore.setItemAsync('accessToken', value);
}

const More: FunctionComponent = ({navigation}: any) => {
  const dispatch = useContext(UserDispatchContext);
  const user = useContext(UserContext);

  const logout = () => {
    logoutUser(user.accessToken).then((result: any) => {
      if (result.data) {
        saveAccessToken('');
        dispatch({ type: 'SET_ACCESSTOKEN', payload: {accessToken: ''}});
        dispatch({ type: 'SET_CREDENTIALS', 
        payload: {
          firstName: '', 
          lastName: '',
          email: '',
          profileIconColor: '', 
          profileIconBackgroundColor: '', 
          _id: '',
          role: '',
          department: '',
          admin: ''
        }});
      }
    }).catch(err => {
      console.log(err.message, 'MORELOGOUT');
      console.log(err, 'MORE LOGOUT');
      saveAccessToken('');
    });
  }

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.white}} >
      <MainContainer style={{backgroundColor: 'transparent'}}>
        <View
          style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '30%'}}
        >
          <View
            style={{width: '40%'}}
          >
            <ProfileIcon
              firstName={user.firstName}
              lastName={user.lastName}
              color={user.profileIconColor}
              size={16}
              backgroundColor={user.profileIconBackgroundColor}
            />
            <PressableText
              textStyle={{marginTop: 10, color: colors.darkGreen, fontSize: 18, textDecorationLine: 'underline'}}
              onPress={() => navigation.navigate('ChangeIcon')}
            >
              Modify Icon
            </PressableText>
          </View>
          <View
            style={{width: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
          >
            <SmallText
              textStyle={{color: colors.lightGreen}}
            >
              First name:
            </SmallText>
            <RegularText
              textStyle={{color: colors.lightGreen}}
              style={{borderWidth: 1, borderColor: colors.darkGreen, borderRadius: 4, height: 40, paddingLeft: 3, display: 'flex', justifyContent: 'center', marginBottom: 10}}
            >
              {user.firstName}
            </RegularText>
            <SmallText
              textStyle={{color: colors.lightGreen}}
            >
              Last name:
            </SmallText>
            <RegularText
              textStyle={{color: colors.lightGreen}}
              style={{borderWidth: 1, borderColor: colors.darkGreen, borderRadius: 4, height: 40, paddingLeft: 3, display: 'flex', justifyContent: 'center'}}
            >
              {user.lastName}
            </RegularText>
          </View>
        </View>
        <View
          style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '50%'}}
        >
          <RegularButton
            onPress={logout}
            style={{marginBottom: 10, backgroundColor: colors.lightGreen}}
            textStyle={{fontSize: 20}}
          >
            Déconnexion
          </RegularButton>
        </View>
      </MainContainer>
    </MainContainer>
  );
}

export default More;