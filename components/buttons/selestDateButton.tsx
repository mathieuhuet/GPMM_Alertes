import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from "react-native";
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import RegularText from '../texts/regularText';
import { ScreenHeight } from '../shared';


const ButtonViewEnabled = styled.TouchableOpacity`
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  alignItems: center;
  border-radius: 10px;
  height: 48px;
  color: ${colors.lightGreen};
  border-color: ${colors.lightGreen};
  border-width: 2px;
`;

const ButtonViewDisabled = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${colors.lightGreen};
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  height: 60px;
  align-self: center;
`;

interface Props {
  children: React.ReactNode;
  onPress?: any;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
  disabled?: Boolean
}

const SelectDateButton: FunctionComponent<Props> = (props) => {
  return (
    <>
      {props.disabled &&       
      <ButtonViewDisabled style={props.style}>
        <RegularText
          textStyle={[{color: colors.darkGreen, textAlign: 'center', fontSize: 20}, props.textStyle]}
        >
          {props.children}
        </RegularText>
      </ButtonViewDisabled>}
      {!props.disabled && 
      <ButtonViewEnabled style={props.style} onPress={props.onPress}>
        <RegularText
          textStyle={[{color: colors.darkGreen, textAlign: 'center', fontSize: 20}, props.textStyle]}
        >
          {props.children}
        </RegularText>
      </ButtonViewEnabled>}
    </>
  );
}

export default SelectDateButton;