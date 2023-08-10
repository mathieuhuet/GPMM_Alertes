import React, { FunctionComponent } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import RegularButton from '../buttons/regularButton';
import CloseButton from '../buttons/closeButton';
import { ScreenHeight, ScreenWidth } from '../shared';


const ModalPressableContainer = styled.Pressable`
  flex: 1;
  padding: 25px;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
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
          style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '100%', height: ScreenHeight}}
        >
          <RegularButton
            style={{}}
            onPress={props.navigateList}
            textStyle={{fontSize: 20}}
          >
            <Ionicons name="list-outline" size={24} color={colors.darkGreen} />
            Liste
          </RegularButton>
          <RegularButton
            style={{}}
            onPress={props.navigateMore}
            textStyle={{fontSize: 20}}
          >
            <MaterialCommunityIcons name="account" size={24} color={colors.darkGreen} />
            More
          </RegularButton>
        </View>
      </ModalPressableContainer>
    </Modal>
  );
}

export default DashboardMenuModal;