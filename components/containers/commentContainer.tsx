import React, { FunctionComponent, useState, useEffect } from 'react';
import { StyleProp, ViewStyle, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { getOtherUserInfo } from '../../services/userServices/getOtherUserInfo';
import { reportComment } from '../../services/activityServices/reportComment';
// Styled components
import styled from 'styled-components/native';
import { ScreenHeight, ScreenWidth } from '../shared';
import { colors } from '../colors';
import ProfileIcon from '../icons/profileIcon';
import SmallText from '../texts/smallText';
import RegularButton from '../buttons/regularButton';
import RegularText from '../texts/regularText';
import RoundIconButton from '../buttons/roundIconButton';
import ConfirmModal from '../modals/confirmModal';


const StyledView = styled.View`
  width: ${ScreenWidth * 0.9}px;
  background-color: ${colors.lightGreen};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  margin-top: ${ScreenHeight * 0.02};
  padding: ${ScreenWidth * 0.04}px;
`;

interface Props {
  comment: string,
  commentId: any,
  creator: string,
  accessToken: string,
  style?: StyleProp<ViewStyle>;
}


const CommentContainer: FunctionComponent<Props> = (props) => {
  const [policeColor, setPoliceColor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  //fetch comments
  useEffect(() => {
    const getComments = async () => {
      try {
        const result = await getOtherUserInfo({userId: props.creator}, props.accessToken);
        setFirstName(result.data.firstName);
        setLastName(result.data.lastName);
        setBackgroundColor(result.data.profileIconBackgroundColor);
        setPoliceColor(result.data.profileIconColor);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
        setIsLoaded(true);
      }
    }
    getComments();
  }, [props.creator]);

  const reportComm = async () => {
    try {
      const result = await reportComment({commentId: props.commentId}, props.accessToken);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <StyledView
      style={[{}, props.style]}
    >
      {isLoaded && 
      <View
        style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
      >
        <View
          style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: ScreenWidth * 0.02}}
        >
          <ProfileIcon
            backgroundColor={backgroundColor}
            color={policeColor}
            firstName={firstName}
            lastName={lastName}
            size={4}
          />
          <SmallText
            textStyle={{marginLeft: ScreenWidth * 0.02, color: colors.darkGreen}}
          >
            {firstName} {lastName}
          </SmallText>
        </View>
          <MaterialIcons
            name='report'
            onPress={() => setModalVisible(true)}
            color={colors.failure}
            size={ScreenWidth * 0.06}
          />
      </View>
      }
      <RegularText
        textStyle={{color: colors.darkGreen}}
      >
        {props.comment}
      </RegularText>
      <ConfirmModal
        buttonHandler={reportComm}
        closeModal={() => setModalVisible(false)}
        message='Êtes-vous sûre de vouloir flagger ce commentaire?'
        modalVisible={modalVisible}
      />
    </StyledView>
  );
}

export default CommentContainer;