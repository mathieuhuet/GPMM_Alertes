import React, { FunctionComponent, useState, useEffect } from 'react';
import { StyleProp, ViewStyle, View, TextStyle, Pressable } from "react-native";
import { getOtherUserInfo } from '../../services/userServices/getOtherUserInfo';
// Styled components
import styled from 'styled-components/native';
import { ScreenHeight, ScreenWidth } from '../shared';
import { colors } from '../colors';
import ProfileIcon from '../icons/profileIcon';
import SmallText from '../texts/smallText';
import UserModal from '../modals/userModal';



const StyledView = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

interface Props {
  userId: string,
  accessToken: string,
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}



const UserContainer: FunctionComponent<Props> = (props) => {
  const [policeColor, setPoliceColor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  //fetch comments
  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await getOtherUserInfo({userId: props.userId}, props.accessToken) as any;
        setFirstName(result.data.firstName);
        setLastName(result.data.lastName);
        setBackgroundColor(result.data.profileIconBackgroundColor);
        setPoliceColor(result.data.profileIconColor);
        setEmail(result.data.email);
        setRole(result.data.role);
        setDepartment(result.data.department);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
        setIsLoaded(true);
      }
    }
    getUser();
  }, [props.userId]);


  return (
    <StyledView
      style={[{}, props.style]}
    >
      {isLoaded && 
      <View
        style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
      >
        <View
          style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: ScreenWidth * 0.02}}
        >
          <Pressable
            onPress={() => {setModalVisible(true)}}
          >
            <ProfileIcon
              backgroundColor={backgroundColor}
              color={policeColor}
              firstName={firstName}
              lastName={lastName}
              size={4}
            />
          </Pressable>
          <SmallText
            textStyle={[{marginLeft: ScreenWidth * 0.02, color: colors.darkGreen}, props.textStyle]}
          >
            {firstName} {lastName}
          </SmallText>
        </View>
        <UserModal
          firstName={firstName}
          lastName={lastName}
          backgroundColor={backgroundColor}
          color={policeColor}
          email={email}
          modalVisible={modalVisible}
          role={role}
          department={department}
          buttonHandler={() => setModalVisible(false)}
        />
      </View>
      }
    </StyledView>
  );
}

export default UserContainer;