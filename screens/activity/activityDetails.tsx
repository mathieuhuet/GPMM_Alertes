import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { View, Platform, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { deleteActivity } from '../../services/activityServices/deleteActivity';
import { getLevelOptions } from '../../components/levelOptions';
import { getDepartmentOptions } from '../../components/departmentOptions';
import { fetchComments } from '../../services/activityServices/fetchComments';
import { comment } from '../../utils/interface/commentInterface';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight, ScreenWidth } from '../../components/shared';
import { colors } from '../../components/colors';
import { UserContext } from '../../context/user/userContext';
import RegularText from '../../components/texts/regularText';
import StyledView from '../../components/views/styledView';
import RegularButton from '../../components/buttons/regularButton';
import DeleteActivityModal from '../../components/modals/deleteActivityModal';
import CommentModal from '../../components/modals/commentModal';
import RoundIconButton from '../../components/buttons/roundIconButton';
import CommentContainer from '../../components/containers/commentContainer';


const ActivityDetails: FunctionComponent = ({navigation, route}: any) => {
  const user = useContext(UserContext);
  const activity = route.params;
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteModalMessage, setDeleteModalMessage] = useState("Voulez-vous vraiment supprimer l'activité?");
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [focusTab, setFocusTab] = useState('detail');



  //fetch comments
  useEffect(() => {
    const getComments = async () => {
      try {
        const result = await fetchComments(user.accessToken, {activityId: activity._id}) as any;
        setComments(result.data);
        setCommentsLoaded(true);
      } catch (error) {
        console.log(error);
        setCommentsLoaded(true);
        setComments([]);
      }
    }
    getComments();
  }, [user]);

  const deleteActivityPress = async () => {
    try {
      const result = await deleteActivity({_id: activity._id}, user.accessToken) as any;
      if (result.data) {
        closeDeleteModal();
        navigation.navigate('Dashboard');
      } else {
        setDeleteModalMessage('Erreur lors de la requête.');
      }
    } catch (error) {
      setDeleteModalMessage('Erreur lors de la requête.');
    }
  }

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setDeleteModalMessage("Voulez-vous vraiment supprimer l'activité?");
  }

  
  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.white, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} >
      <View
        style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
      >
        <View>
          <View
            style={{backgroundColor: colors.darkGreen}}
          >
            <LargeText textStyle={{paddingBottom: 30, color: colors.whiteGreen, fontWeight: 'bold', fontSize: 40, paddingLeft: 20, paddingTop: 50}}>
              {activity.title}
            </LargeText>
          </View>
          <View
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
          >
            <TouchableOpacity
              style={[{flex: 1, height: ScreenHeight * 0.05, justifyContent: 'center', borderBottomWidth: 2, borderColor: colors.darkGreen}, focusTab === 'detail' ? {backgroundColor: colors.white} : {backgroundColor: colors.darkGreen}]}
              onPress={() => setFocusTab('detail')}
            >
              <RegularText
                textStyle={[{textAlign: 'center', fontWeight: 'bold'}, focusTab === 'detail' ? {color: colors.darkGreen} : {color: colors.white}]}
              >
                Détails
              </RegularText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[{flex: 1, height: ScreenHeight * 0.05, justifyContent: 'center', borderBottomWidth: 2, borderColor: colors.darkGreen}, focusTab === 'acquiter' ? {backgroundColor: colors.white} : {backgroundColor: colors.darkGreen}]}
              onPress={() => setFocusTab('acquiter')}
            >
              <RegularText
                textStyle={[{alignSelf: 'center', fontWeight: 'bold'}, focusTab === 'acquiter' ? {color: colors.darkGreen} : {color: colors.white}]}
              >
                Acquitement
              </RegularText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[{flex: 1, height: ScreenHeight * 0.05, justifyContent: 'center', borderBottomWidth: 2, borderColor: colors.darkGreen}, focusTab === 'comments' ? {backgroundColor: colors.white} : {backgroundColor: colors.darkGreen}]}
              onPress={() => setFocusTab('comments')}
            >
              <RegularText
                textStyle={[{alignSelf: 'center', fontWeight: 'bold'}, focusTab === 'comments' ? {color: colors.darkGreen} : {color: colors.white}]}
              >
                Commentaires
              </RegularText>
            </TouchableOpacity>
          </View>
          {focusTab === 'detail' && 
          <View
            style={{marginTop: ScreenHeight * 0.02}}
          >
            <View
              style={{paddingLeft: 20}}
            >
              <RegularText textStyle={{marginBottom: 20, color: colors.darkGreen}}>
                {activity.description}
              </RegularText>
              <RegularText textStyle={{marginBottom: 20, color: colors.darkGreen}}>
                {activity.creator}
              </RegularText>
              <RegularText textStyle={{marginBottom: 5, color: colors.darkGreen, fontWeight: 'bold'}}>
                {getDepartmentOptions(activity.department)}
              </RegularText>
              <RegularText textStyle={{marginBottom: 5, color: colors.darkGreen, fontWeight: 'bold'}}>
                {getLevelOptions(activity.level)}
              </RegularText>
              <RegularText
                textStyle={{fontWeight: 'bold', marginBottom: 20, color: colors.darkGreen}}
                >
                  {new Date(activity.activityDate).toLocaleDateString()} {Platform.OS === 'ios' ? new Date(activity.activityDate).toLocaleTimeString().slice(0, -3) : new Date(activity.activityDate).toLocaleTimeString().slice(0, -9)}
              </RegularText>
            </View>
          </View>
          }
          {focusTab === 'acquiter' && 
            <>
            {activity.acquiter ?
              <View>

              </View>
            : 
              <View>
                <RegularText>
                  L'activité n'a pas été acquité.
                </RegularText>
                <RegularButton>
                  Appuyer ici pour acquiter l'activité
                </RegularButton>
              </View>
            }
            </>
          }
          {focusTab === 'comments' && 
            <ScrollView
              style={{display: 'flex', flexDirection: 'column', width: '100%', height: '80%'}}
              contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingBottom: 400}}
            >
              {comments.map((comment: comment) => 
                <View
                  key={comment._id.toString()}
                >
                  <CommentContainer
                    comment={comment.comments}
                    commentId={comment._id}
                    creator={comment.creator}
                    accessToken={user.accessToken}
                  />
                </View>
              )}
            </ScrollView>
          }
            <View
              style={{position: 'absolute', left: ScreenWidth * 0.7, top: ScreenHeight * 0.8}}
            >
              <RoundIconButton
                onPress={() => setCommentModalVisible(true)}
                style={{backgroundColor: colors.lightGreen}}
                size={8}
              >
                <FontAwesome5
                  name='comment-alt'
                  size={30}
                  color={colors.darkGreen}
                />
              </RoundIconButton>
            </View>
            <View
              style={{position: 'absolute', left: ScreenWidth * 0.1, top: ScreenHeight * 0.8}}
            >
              <RoundIconButton
                onPress={() => setDeleteModalVisible(true)}
                style={{backgroundColor: colors.failure}}
                size={8}
              >
                <Entypo
                  name='trash'
                  size={30}
                  color={colors.darkGreen}
                />
              </RoundIconButton>
            </View>
        </View>
      </View>
      <DeleteActivityModal
        buttonHandler={deleteActivityPress}
        modalVisible={deleteModalVisible}
        closeModal={closeDeleteModal}
        message={deleteModalMessage}
      />
      <CommentModal
        modalVisible={commentModalVisible}
        closeModal={() => setCommentModalVisible(false)}
        activityId={activity._id}
        userId={user._id}
        userAccessToken={user.accessToken}
      />
    </MainContainer>
  );
}

export default ActivityDetails;