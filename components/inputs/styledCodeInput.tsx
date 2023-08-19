import React, { FunctionComponent, useRef, useState, useEffect } from 'react';
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';


const CodeInputSection = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-vertical: 70px;
`;

const HiddenTextInput = styled.TextInput`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

const CodeInputsContainer = styled.Pressable`
  width: 70%;
  flex-direction: row;
  justify-content: space-between;
`;

const CodeInput = styled.View`
  min-width: 15%;
  padding: 12px;
  border-bottom-width: 6px;
  border-radius: 6px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-color: ${colors.lightGreen};
`;

const CodeInputText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: ${colors.darkGreen};
`;

const CodeInputFocused = styled(CodeInput)`
  border-color: ${colors.darkGreen};
`;

interface Props {
  code: string;
  setCode: any;
  maxLength: number;
  setPinReady: any;
}

const StyledCodeInput: FunctionComponent<Props> = (props) => {
  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);
  const codeDigitsArray = new Array(props.maxLength).fill(0);
  const textInputRef = useRef(null);

  useEffect(() =>{
    props.setPinReady(props.code.length === props.maxLength);
    return () => props.setPinReady(false);
  }, [props.code])

  const handleOnSubmitEditing = () => {
    setInputContainerIsFocused(false);
  }

  const handleOnPress = () => {
    setInputContainerIsFocused(true);
    textInputRef?.current?.focus();
  } 

  const ToCodeDigitInput = (value: any, index:number) => {
    const emptyInputChar = ' ';
    const digit = props.code[index] || emptyInputChar;
    const isCurrentDigit = index === props.code.length;
    const isDigitFocused = isCurrentDigit;
    const StyledCodeInput = inputContainerIsFocused && isDigitFocused ? CodeInputFocused : CodeInput;
    return (
      <StyledCodeInput key={index}>
        <CodeInputText>{digit}</CodeInputText>
      </StyledCodeInput>
    )
  }

  return (
    <CodeInputSection>
      <CodeInputsContainer onPress={handleOnPress}>
        {codeDigitsArray.map(ToCodeDigitInput)}
      </CodeInputsContainer>
      <HiddenTextInput
        autoCapitalize={'characters'}
        keyboardType="default"
        returnKeyType="done"
        textContentType="oneTimeCode"
        ref={textInputRef}
        value={props.code}
        onChangeText={(text) => props.setCode(text.toUpperCase())}
        maxLength={props.maxLength}
        onSubmitEditing={handleOnSubmitEditing}
      />
    </CodeInputSection>
  );
}

export default StyledCodeInput;