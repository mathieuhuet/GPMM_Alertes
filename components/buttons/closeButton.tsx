import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from "react-native";
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeight } from '../shared';

const ButtonView = styled.TouchableOpacity`
  padding: 15px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  align-self: center;
  width: ${ScreenHeight * 0.1}px;
  height: ${ScreenHeight * 0.1}px;
`;

interface Props {
  children?: React.ReactNode;
  onPress?: any;
  size: any;
  color?: string;
  style?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const CloseButton: FunctionComponent<Props> = (props) => {

  const buttonSize = ScreenHeight * (props.size / 100);
  const iconSize = ScreenHeight * (props.size / 200);

  return (
      <ButtonView 
        style={[props.style, {height: buttonSize, width: buttonSize}]} 
        onPress={props.onPress}
      >
        {props.children ? props.children : 
        <Ionicons 
          name={'ios-close-circle-sharp'}
          size={iconSize}
          color={props.color ? props.color : colors.darkGreen}
        />}
      </ButtonView>
  );
}

export default CloseButton;