import React, { FunctionComponent } from 'react';
import { StyleProp, ViewStyle } from "react-native";
// Styled components
import styled from 'styled-components/native';
import { StatusBarHeight } from '../shared';
import { colors } from '../colors';


const StyledView = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 25}px;
  background-color: ${colors.white};
`;

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const MainContainer: FunctionComponent<Props> = (props) => {
  return (
    <StyledView {...props}>
      { props.children }
    </StyledView>
  );
}

export default MainContainer;