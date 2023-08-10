import React, { FunctionComponent } from 'react';
import { Modal, View } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
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
  closeModal: any;
  message: string;
  modalVisible: boolean;
}

const ConfirmModal: FunctionComponent<Props> = (props) => {
  return (
    <Modal
      animationType='slide'
      visible={props.modalVisible}
      transparent={true}
    >
      <ModalPressableContainer>
        <ModalView>
          <MaterialCommunityIcons 
            name={'progress-question'} 
            size={100}
            color={colors.lightGreen}  
          />
          <LargeText
            textStyle={{fontSize: 25, color: colors.lightGreen, marginVertical: 10}}
          >
            {props.message}
          </LargeText>
          <View
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 20}}
          >
            <RegularButton
              style={{width: '40%'}}
              onPress={props.closeModal}
              textStyle={{fontSize: 20}}
            >
              No
            </RegularButton>
            <RegularButton
              style={{width: '40%'}}
              onPress={props.buttonHandler}
              textStyle={{fontSize: 20}}
            >
              Yes
            </RegularButton>

          </View>
        </ModalView>
      </ModalPressableContainer>
    </Modal>
  );
}

export default ConfirmModal;