import React, { FunctionComponent, useContext } from 'react';
import { View, ActivityIndicator, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { UserContext } from '../context/user/userContext';


// Custom components
import MainContainer from '../components/containers/mainContainer';
import LargeText from '../components/texts/largeText';
import { ScreenHeight } from '../components/shared';
import { colors } from '../components/colors';
import ProfileIcon from '../components/icons/profileIcon';

const TopBackGround = styled.View`
  background-color: ${colors.white};
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

const Dashboard: FunctionComponent = ({navigation}) => {
  const user = useContext(UserContext);

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0}} >
      <TopBackGround/>
        {user.firstName ? 
          <MainContainer style={{backgroundColor: 'transparent'}}>
          <Pressable
            onPress={() => navigation.navigate('More')}
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
          >
            <View>
              <LargeText>
                {user.firstName}
              </LargeText>
              <LargeText>
                {user.lastName}
              </LargeText>
            </View>
            <ProfileIcon
              firstName={user.firstName}
              lastName={user.lastName}
              color={user.profileIconColor}
              size={12}
              backgroundColor={user.profileIconBackgroundColor}
            />
          </Pressable>
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