import React, { FunctionComponent } from 'react';
// Styled components
import styled from 'styled-components/native';
import { getProfileColorCode } from '../profileColors';
import { ScreenHeight } from '../shared';


const IconBackground = styled.View`
  width: ${ScreenHeight * 0.1}px;
  height: ${ScreenHeight * 0.1}px;
  border-radius: ${ScreenHeight * 0.1}px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const IconInitials = styled.Text`
  font-size: ${ScreenHeight * 0.05}px;
  font-weight: bold;
  text-align: center;
`;

interface Props {
  firstName: string;
  lastName?: string;
  color: string;
  backgroundColor: string;
  size: number;
}


const ProfileIcon: FunctionComponent<Props> = (props) => {
  const circleSize = ScreenHeight * (props.size / 100);
  const fontSize = ScreenHeight * (props.size / 220);
  return (
    <IconBackground style={{backgroundColor: `${getProfileColorCode(props.backgroundColor)}`, width: circleSize, height: circleSize}}>
      <IconInitials style={{color: `${getProfileColorCode(props.color)}`, fontSize: fontSize}}>
        {props.firstName[0]}{props.lastName ? props.lastName[0] : ''}
      </IconInitials>
    </IconBackground>
  );
}



export default ProfileIcon;