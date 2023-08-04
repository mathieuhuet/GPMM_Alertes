import React, { FunctionComponent } from 'react';
import { StyleProp, ViewStyle } from "react-native";

// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';



const ShadowView = styled.TouchableOpacity`
  background-color: ${colors.lightGreen};
  color: ${colors.darkGreen};
  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;


interface Props {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: any;
}

const StyledView: FunctionComponent<Props> = (props) => {
  return (
    <ShadowView
      style={props.style}
      onPress={props.onPress}
    >
      {props.children}
    </ShadowView>
  );
}

export default StyledView;