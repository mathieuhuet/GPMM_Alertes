import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from "react-native";
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import RegularText from '../texts/regularText';


const ButtonViewEnabled = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${colors.lightGreen};
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  height: 60px;
  align-self: center;
  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
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

const RegularButton: FunctionComponent<Props> = (props) => {
  return (
    <>
      {props.disabled &&       
      <ButtonViewDisabled style={props.style}>
        <RegularText
          textStyle={[{color: colors.darkGreen}, props.textStyle]}
        >
          {props.children}
        </RegularText>
      </ButtonViewDisabled>}
      {!props.disabled && 
      <ButtonViewEnabled style={props.style} onPress={props.onPress}>
        <RegularText
          textStyle={[{color: colors.darkGreen}, props.textStyle]}
        >
          {props.children}
        </RegularText>
      </ButtonViewEnabled>}
    </>
  );
}

export default RegularButton;