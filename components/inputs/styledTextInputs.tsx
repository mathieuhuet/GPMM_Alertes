import React, { FunctionComponent, useState } from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import SmallText from '../texts/smallText';


const InputField = styled.TextInput`
  background-color: ${colors.white};
  padding: 15px;
  padding-left: 65px;
  padding-right: 55px;
  border-radius: 10px;
  font-size: 16px;
  height: 60px;
  margin-top: 3px;
  margin-bottom: 10px;
  color: ${colors.lightGreen};
  border-color: ${colors.lightGreen};
  border-width: 2px;
`;

const LeftIcon = styled.View`
  position: absolute;
  top: 35px;
  left: 15px;
  z-index: 1;
  border-right-width: 2px;
  border-color: ${colors.lightGreen};
  padding-right: 10px;
`;

const RightIcon = styled.TouchableOpacity`
  position: absolute;
  top: 35px;
  right: 10px;
  z-index: 1;
  padding-right: 10px;
`;

interface Props {
  children?: React.ReactNode;
  isPassword?: boolean;
  icon?: string;
  label?: string;
  keyboardType?: any;
  inputFieldStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  onChangeText?: any;
  onBlur?: any;
  onFocus?: any;
  value?: any;
  labelStyle?: StyleProp<TextStyle>;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
}

const StyledTextInput: FunctionComponent<Props> = (props) => {
  const [inputBackgroundColor, setInputBackgroundColor] = useState(colors.white);
  const [iconAndBorderColor, setIconAndBorderColor] = useState(colors.lightGreen);
  const [hidePassword, setHidePassword] = useState(true);

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
      style={props.style}
    >
      <LeftIcon
        style={{borderColor: iconAndBorderColor}}
      >
        <MaterialCommunityIcons 
          name={props.icon ? props.icon : "doubleright"} 
          size={30} 
          color={props.iconColor ? props.iconColor : iconAndBorderColor} 
        />
      </LeftIcon>
      <SmallText
        textStyle={[props.labelStyle, {color: iconAndBorderColor}]}
      >
        {props.label}
      </SmallText>
      {props.isPassword ?
      <>
        <InputField
          keyboardType={props.keyboardType}
          placeholder={props.placeholder}
          placeholderTextColor={colors.lightGray}
          style={[{backgroundColor: inputBackgroundColor, borderColor: iconAndBorderColor, color: colors.darkGreen}, props.inputFieldStyle]}
          onBlur={customOnBlur}
          onFocus={customOnFocus}
          secureTextEntry={props.isPassword && hidePassword}
          onChangeText={props.onChangeText}
          spellCheck={false}
        />
      <RightIcon onPress={() => {
        setHidePassword(!hidePassword);
      }}>
        <MaterialCommunityIcons 
          name={hidePassword ? 'eye-off' : 'eye'}
          size={30}
          color={colors.lightGreen}
        />
      </RightIcon>
      </>
      :
      <InputField
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        placeholderTextColor={colors.lightGray}
        style={[{backgroundColor: inputBackgroundColor, borderColor: iconAndBorderColor, color: colors.darkGreen, paddingRight: 5}, props.inputFieldStyle]}
        onBlur={customOnBlur}
        onFocus={customOnFocus}
        secureTextEntry={props.isPassword && hidePassword}
        onChangeText={props.onChangeText}
        spellCheck={false}
      />
      }
    </View>
  );
}

export default StyledTextInput;