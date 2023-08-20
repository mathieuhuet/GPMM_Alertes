import React, { FunctionComponent, useState, useEffect } from 'react';
import { StyleProp, ViewStyle, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { reportComment } from '../../services/activityServices/reportComment';
// Styled components
import styled from 'styled-components/native';
import { ScreenHeight, ScreenWidth } from '../shared';
import { colors } from '../colors';
import RegularText from '../texts/regularText';
import ConfirmModal from '../modals/confirmModal';
import UserContainer from './userContainer';


const StyledView = styled.View`
  width: ${ScreenWidth * 0.9}px;
  background-color: ${colors.whiteGreen};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  margin-top: ${ScreenHeight * 0.02}px;
  padding: ${ScreenWidth * 0.04}px;
`;

interface Props {
  comment: string,
  commentId: any,
  creator: string,
  accessToken: string,
  ownComment: boolean,
  style?: StyleProp<ViewStyle>;
}


const CommentContainer: FunctionComponent<Props> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const reportComm = async () => {
    try {
      const result = await reportComment({commentId: props.commentId}, props.accessToken);
      setModalVisible(false);
    } catch (error) {
      setModalVisible(false);
      console.log(error);
    }
  }

  return (
    <StyledView
      style={[{}, props.style]}
    >
      <View
        style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
      >
          <UserContainer
            userId={props.creator}
            accessToken={props.accessToken}
          />
          {!props.ownComment &&
            <MaterialIcons
              name='report'
              onPress={() => setModalVisible(true)}
              color={colors.failure}
              size={ScreenWidth * 0.06}
            />
          }
      </View>
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