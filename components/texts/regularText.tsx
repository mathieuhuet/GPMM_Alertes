import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';


const StyledText = styled.Text`
  font-size: 15px;
  color: ${colors.lightGreen};
  text-align: left;
`;



interface Props {
  children: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

const RegularText: FunctionComponent<Props> = (props) => {
  return (
    <View style={props.style}>
      <StyledText style={props.textStyle}>
        { props.children }
      </StyledText>
    </View>
  );
}

export default RegularText;