import React, { FunctionComponent } from 'react';
import { Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import LargeText from '../texts/largeText';
import RegularText from '../texts/regularText';
import RegularButton from '../buttons/regularButton';


const ModalPressableContainer = styled.Pressable`
  flex: 1;
  padding: 25px;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.View`
  background-color: ${colors.neonGreen};
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
  type: string;
  headerText: string;
  message: string;
  buttonText: string;
  modalVisible: boolean;
}

const MessageModal: FunctionComponent<Props> = (props) => {
  return (
    <Modal
      animationType='slide'
      visible={props.modalVisible}
      transparent={true}
    >
      <ModalPressableContainer>
        <ModalView>
          <MaterialCommunityIcons 
            name={props.type === 'success' ? 'check-circle' : 'close-circle'} 
            size={100}
            color={props.type === 'success' ? colors.darkGreen : colors.failure}  
          />
          <LargeText
            textStyle={{fontSize: 25, color: colors.darkGreen, marginVertical: 10}}
          >
            {props.headerText}
          </LargeText>
          <RegularText
            textStyle={{marginBottom: 20, textAlign: 'center', color: colors.darkGreen}}
          >
            {props.message}
          </RegularText>
          <RegularButton
            onPress={props.buttonHandler}
          >
            {props.buttonText || 'OK'}
          </RegularButton>
        </ModalView>
      </ModalPressableContainer>
    </Modal>
  );
}

export default MessageModal;