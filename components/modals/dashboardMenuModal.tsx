import React, { FunctionComponent } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import RegularButton from '../buttons/regularButton';
import { ScreenHeight, ScreenWidth } from '../shared';


const ModalPressableContainer = styled.Pressable`
  flex: 1;
  padding: 25px;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: flex-start;
  align-items: center;
`;


interface Props {
  closeModal: any;
  modalVisible: boolean;
  navigateMore: any;
  navigateList: any;
}

const DashboardMenuModal: FunctionComponent<Props> = (props) => {
  return (
    <Modal
      animationType='slide'
      visible={props.modalVisible}
      transparent={true}
    >
      <ModalPressableContainer
        onPress={props.closeModal}
      >
        <View
          style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', width: '100%', height: '40%'}}
        >
          <RegularButton
            style={{backgroundColor: colors.darkGreen}}
            onPress={props.navigateList}
            textStyle={{fontSize: 20, color: colors.whiteGreen}}
          >
            <Ionicons name="list-outline" size={24} color={colors.whiteGreen} />
            Liste
          </RegularButton>
          <RegularButton
            style={{backgroundColor: colors.darkGreen}}
            onPress={props.navigateMore}
            textStyle={{fontSize: 20, color: colors.whiteGreen}}
          >
            <MaterialCommunityIcons name="account" size={24} color={colors.whiteGreen} />
            Plus
          </RegularButton>
        </View>
      </ModalPressableContainer>
    </Modal>
  );
}

export default DashboardMenuModal;