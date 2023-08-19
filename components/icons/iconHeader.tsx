import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import { ScreenHeight } from '../shared';


const IconBackground = styled.View`
  width: ${ScreenHeight * 0.15}px;
  height: ${ScreenHeight * 0.15}px;
  border-radius: ${ScreenHeight * 0.15}px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;


interface Props {
  children: React.ReactNode;
  color?: string;
  style?: StyleProp<TextStyle>;
}

const IconHeader: FunctionComponent<Props> = (props) => {
  return (
    <IconBackground style={props.style}>
      {props.children}
    </IconBackground>
  );
}

export default IconHeader;