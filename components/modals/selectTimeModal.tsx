import React, { FunctionComponent, useState } from 'react';
import { Modal, Platform } from 'react-native';
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
  headerText: string;
  buttonText: string;
  modalVisible: boolean;
}

const SelectTimeModal: FunctionComponent<Props> = (props) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    setDate(selectedDate);
  };

  return (
    <Modal
      animationType='slide'
      visible={props.modalVisible}
      transparent={true}
    >
      <ModalPressableContainer>
        <ModalView>
          <LargeText
            textStyle={{fontSize: 25, color: colors.darkGreen, marginVertical: 10}}
          >
            {props.headerText}
          </LargeText>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'time'}
            display='spinner'
            is24Hour={true}
            onChange={onChange}
            style={{alignSelf: 'center', width: '80%'}}
            minimumDate={new Date()}
          />
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

export default SelectTimeModal;