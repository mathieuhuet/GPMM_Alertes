import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from "react-native";
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenHeight } from '../shared';

const ButtonView = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${colors.lightGreen};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  align-self: center;
  width: ${ScreenHeight * 0.1}px;
  height: ${ScreenHeight * 0.1}px;
  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

interface Props {
  children: React.ReactNode;
  onPress?: any;
  color?: string;
  style?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const IconButton: FunctionComponent<Props> = (props) => {



  return (
    <>
      {props.disabled &&       
      <ButtonView style={props.style}>
        {props.children}
      </ButtonView>}
      {!props.disabled && 
      <ButtonView 
        style={[props.style]} 
        onPress={props.onPress}
      >
        {props.children}
      </ButtonView>}
    </>
  );
}

export default IconButton;