import React, { FunctionComponent } from 'react';
import { Modal, View, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDepartmentOptions } from '../departmentOptions';
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import LargeText from '../texts/largeText';
import RegularText from '../texts/regularText';
import RegularButton from '../buttons/regularButton';
import ProfileIcon from '../icons/profileIcon';
import SmallText from '../texts/smallText';
import { ScreenHeight } from '../shared';


const ModalPressableContainer = styled.Pressable`
  flex: 1;
  padding: 25px;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.View`
  background-color: ${colors.whiteGreen};
  border-radius: 20px;
  width: 100%;
  padding: 35px;
  align-items: center;
  elevation: 5;
  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
`;

interface Props {
  buttonHandler: any;
  firstName: string;
  lastName: string;
  color: string;
  backgroundColor: string;
  modalVisible: boolean;
  email: string;
  role: string;
  department: string;
}

const UserModal: FunctionComponent<Props> = (props) => {
  return (
    <Modal
      animationType='slide'
      visible={props.modalVisible}
      transparent={true}
    >
      <ModalPressableContainer>
        <ModalView>
          <View
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: ScreenHeight * 0.01}}
          >
            <ProfileIcon
              firstName={props.firstName}
              lastName={props.lastName}
              color={props.color}
              backgroundColor={props.backgroundColor}
              size={10}
            />
            <View>
              <LargeText>
                {props.firstName}
              </LargeText>
              <LargeText>
                {props.lastName}
              </LargeText>
            </View>
          </View>
          <RegularText
            textStyle={{marginBottom: ScreenHeight * 0.01}}
          >
            {props.email}
          </RegularText>
          <View
            style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', marginBottom: ScreenHeight * 0.02}}
          >
            <SmallText>
              Département : 
            </SmallText>
            <RegularText>
              {getDepartmentOptions(props.department)}
            </RegularText>
            <SmallText>
              Rôle : 
            </SmallText>
            <RegularText>
              {props.role}
            </RegularText>
          </View>

          <RegularButton
            onPress={props.buttonHandler}
          >
            Fermé
          </RegularButton>
        </ModalView>
      </ModalPressableContainer>
    </Modal>
  );
}

export default UserModal;