import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from "react-native";
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import SmallText from './smallText';



const StyledPressable = styled.Pressable`
  align-self: center;
`;

interface Props {
  children: React.ReactNode;
  onPress: any;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const PressableText: FunctionComponent<Props> = (props) => {
  return (
    <>
    {props.disabled && 
      <StyledPressable>
        <SmallText
          textStyle={[{color: colors.darkGreen}, props.textStyle]}
        >
          {props.children}
        </SmallText>
      </StyledPressable>
    }
    {!props.disabled &&     
      <StyledPressable onPress={props.onPress}>
        <SmallText
          textStyle={[{color: colors.darkGreen}, props.textStyle]}
        >
          {props.children}
        </SmallText>
      </StyledPressable>
    }
    </>
  );
}

export default PressableText;