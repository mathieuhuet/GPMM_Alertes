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
  children?: React.ReactNode;
  name: string;
  onPress?: any;
  size: any;
  color?: string;
  style?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const RoundIconButton: FunctionComponent<Props> = (props) => {

  const buttonSize = ScreenHeight * (props.size / 100);
  const iconSize = ScreenHeight * (props.size / 200);

  return (
    <>
      {props.disabled &&       
      <ButtonView style={props.style}>
        {props.children ? props.children : 
        <MaterialCommunityIcons 
          name={props.name}
          size={iconSize}
          color={props.color ? props.color : colors.darkGreen}
        />}
      </ButtonView>}
      {!props.disabled && 
      <ButtonView 
        style={[props.style, {height: buttonSize, width: buttonSize, borderRadius: buttonSize / 2}]} 
        onPress={props.onPress}
      >
        {props.children ? props.children : 
        <MaterialCommunityIcons 
          name={props.name}
          size={iconSize}
          color={props.color ? props.color : colors.darkGreen}
        />}
      </ButtonView>}
    </>
  );
}

export default RoundIconButton;