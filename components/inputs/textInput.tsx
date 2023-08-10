import React, { FunctionComponent, useState } from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";

// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import SmallText from '../texts/smallText';



const InputField = styled.TextInput`
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 16px;
  height: 60px;
  margin-top: 3px;
  margin-bottom: 10px;
  color: ${colors.lightGreen};
  border-color: ${colors.lightGreen};
  border-width: 2px;
`;


interface Props {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  multiline?: boolean;
  keyboardType?: any;
  inputFieldStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  onChangeText?: any;
  onBlur?: any;
  onFocus?: any;
  value?: any;
  style?: StyleProp<ViewStyle>;
}

const TextInput: FunctionComponent<Props> = (props) => {
  const [inputBackgroundColor, setInputBackgroundColor] = useState(colors.white);
  const [iconAndBorderColor, setIconAndBorderColor] = useState(colors.lightGreen);

  const customOnBlur = () => {
    props?.onBlur;
    setInputBackgroundColor(colors.white);
    setIconAndBorderColor(colors.lightGreen);
  }

  const customOnFocus = () => {
    props?.onFocus;
    setInputBackgroundColor(colors.white);
    setIconAndBorderColor(colors.darkGreen);
  }

  return (
    <View
      style={[{width: '100%'}, props.style]}
    >
      <SmallText
        textStyle={[props.labelStyle, {color: iconAndBorderColor}]}
      >
        {props.label}
      </SmallText>
      <InputField
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        placeholderTextColor={colors.lightGray}
        style={[{backgroundColor: inputBackgroundColor, borderColor: iconAndBorderColor, color: colors.darkGreen}, props.inputFieldStyle]}
        onBlur={customOnBlur}
        onFocus={customOnFocus}
        onChangeText={props.onChangeText}
        spellCheck={false}
        multiline={props.multiline}
      />
    </View>
  );
}

export default TextInput;