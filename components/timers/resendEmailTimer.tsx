import React, { FunctionComponent, useState, useEffect } from 'react';
// Styled components
import styled from 'styled-components/native';
import SmallText from '../texts/smallText';
import PressableText from '../texts/pressableText';
import { colors } from '../colors';


const StyledView = styled.View`
  align-items: center;
`;

interface Props {
  activeResend: Boolean;
  setActiveResend: any;
  resendEmail: any;
  targetTime: number;
}

const ResendEmailTimer: FunctionComponent<Props> = (props) => {
  const [timeLeft, setTimeLeft] = useState(0); 

  let resendTimerInterval: any;

  const triggerTimer = (targetTime = 30000) => {
    props.setActiveResend(false);
    const finalTime = +new Date() + targetTime;
    resendTimerInterval = setInterval(() => calculateTimeLeft(finalTime), 1000)
  }

  const calculateTimeLeft = (finalTime: number) => {
    const difference = finalTime - +new Date();
    if (difference > 0) {
      setTimeLeft(Math.round(difference));
    } else {
      clearInterval(resendTimerInterval);
      props.setActiveResend(true);
      setTimeLeft(30000); 
    }
  }

  return (
    <StyledView>
      <SmallText textStyle={{marginTop: 30, padding: 5}}>
        Vous n'avez pas reçu le courriel?
      </SmallText>
      <PressableText
        onPress={() => props.resendEmail(triggerTimer(props.targetTime))}
        disabled={!props.activeResend}
        textStyle={{opacity: !props.activeResend ? 0.6 : 1, fontWeight: 'bold', padding: 5, color: colors.darkGreen, marginTop: -10}}
      >
        Cliquer ici pour envoyer un nouveau code
      </PressableText>
      {timeLeft === 30000 || timeLeft === 0 ? <></> : 
        <SmallText textStyle={{fontWeight: 'bold', color:colors.failure, textAlign: 'center'}}>
          Vous pouvez demander un nouveau code dans {Math.round(timeLeft / 1000)} seconde(s).
        </SmallText>
      }
    </StyledView>
  )
}

export default ResendEmailTimer;