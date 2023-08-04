import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from "react-native";
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';


const StyledText = styled.Text`
  font-size: 30px;
  color: ${colors.lightGreen};
  text-align: left;
`;

interface Props {
  children: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
}

const LargeText: FunctionComponent<Props> = (props) => {
  return (
    <StyledText style={props.textStyle}>
      { props.children }
    </StyledText>
  );
}

export default LargeText;