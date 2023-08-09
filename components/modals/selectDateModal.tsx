import React, { FunctionComponent, useState } from 'react';
import { Modal, Platform, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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

const ModalViewIOS = styled.View`
  background-color: ${colors.whiteGreen};
  border-radius: 20px;
  width: 100%;
  align-items: center;
  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
`;

const ModalView = styled.View`
  background-color: ${colors.darkGreen};
  border-radius: 20px;
  padding: 35px;
  align-items: center;
`;

interface Props {
  buttonHandler: any;
  buttonText: string;
  modalVisible: boolean;
  date: any;
  setDate: any;
}

const SelectDateModal: FunctionComponent<Props> = (props) => {
  if (Platform.OS === 'ios') {
  
    const onChange = (event, selectedDate) => {
      props.setDate(selectedDate);
    };
  
    return (
      <Modal
        animationType='slide'
        visible={props.modalVisible}
        transparent={true}
      >
        <ModalPressableContainer>
          <ModalViewIOS>
              <DateTimePicker
                testID="dateTimePicker"
                value={props.date}
                mode={'date'}
                display='inline'
                onChange={onChange}
                minimumDate={new Date()}
              />
            <RegularButton
              onPress={props.buttonHandler}
            >
              {props.buttonText || 'OK'}
            </RegularButton>
          </ModalViewIOS>
        </ModalPressableContainer>
      </Modal>
    );
  } else {
  
    const onChange = (event, selectedDate) => {
      props.setDate(selectedDate);
      props.buttonHandler();
    };
  
    return (
      <Modal
        animationType='slide'
        visible={props.modalVisible}
        transparent={true}
      >
        <ModalPressableContainer>
          <DateTimePicker
            testID="dateTimePicker"
            value={props.date}
            mode={'date'}
            display='inline'
            onChange={onChange}
            minimumDate={new Date()}
          />
        </ModalPressableContainer>
      </Modal>
    );
  }
}

export default SelectDateModal;