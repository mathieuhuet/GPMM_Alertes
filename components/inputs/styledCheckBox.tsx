import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from "react-native";
import Checkbox from 'expo-checkbox';
// Styled components
import styled from 'styled-components/native';
import SmallText from '../texts/smallText';
import { StatusBarHeight } from '../shared';
import { colors } from '../colors';


const StyledView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;


interface Props {
  children: React.ReactNode;
  name?: string;
  isChecked: boolean;
  setChecked: any;
  style?: StyleProp<TextStyle>;
  boxColor: string;
}

const StyledCheckBox: FunctionComponent<Props> = (props) => {
  return (
    <StyledView>
      <Checkbox
        style={[{margin: 8}, props.style]}
        value={props.isChecked}
        onValueChange={props.setChecked}
        color={props.isChecked ? colors.lightGreen : props.boxColor}
      />
      {props.children}
    </StyledView>
  );
}

export default StyledCheckBox;