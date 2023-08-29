import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { View, Platform, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { deleteActivity } from '../../services/activityServices/deleteActivity';
import { getLevelOptions } from '../../components/levelOptions';
import { getTypeOptions } from '../../components/typeOptions';
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
import SmallText from '../../components/texts/smallText';
import UserContainer from '../../components/containers/userContainer';


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
      const result = await deleteActivity({_idActivity: activity._id, type: activity.type}, user.accessToken) as any;
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

  console.log(activity);
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
          <ScrollView
            style={{marginTop: ScreenHeight * 0.02}}
            contentContainerStyle={{paddingBottom: 400}}
          >
            <View
              style={{paddingLeft: 20, paddingRight: 20}}
            > 
              <SmallText>
                Description
              </SmallText>
              <RegularText textStyle={{marginBottom: ScreenHeight * 0.04, color: colors.darkGreen}}>
                {activity.description}
              </RegularText>
              <View
                style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}
              >
                <View>
                  <SmallText>
                    Type d'activité
                  </SmallText>
                  <RegularText textStyle={{marginBottom: ScreenHeight * 0.01, color: colors.darkGreen, fontWeight: 'bold'}}>
                    {getTypeOptions(activity.type)}
                  </RegularText>
                </View>
                <View>
                  <SmallText>
                    Importance
                  </SmallText>
                  <RegularText textStyle={{marginBottom: ScreenHeight * 0.01, color: colors.darkGreen, fontWeight: 'bold', textAlign: 'right'}}>
                    {getLevelOptions(activity.level)}
                  </RegularText>
                </View>
              </View>
              <View
                style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}
              >
                <View>
                  <SmallText>
                    Département
                  </SmallText>
                  <RegularText textStyle={{marginBottom: ScreenHeight * 0.01, color: colors.darkGreen, fontWeight: 'bold'}}>
                    {getDepartmentOptions(activity.department)}
                  </RegularText>
                </View>
                <View>
                  <SmallText>
                    Système concerné
                  </SmallText>
                  <RegularText textStyle={{marginBottom: ScreenHeight * 0.01, color: colors.darkGreen, fontWeight: 'bold', textAlign: 'right'}}>
                    {activity.system}
                  </RegularText>
                </View>
              </View>
              <View
                style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}
              >
                <View>
                  <SmallText>
                    Emplacement
                  </SmallText>
                  <RegularText textStyle={{marginBottom: ScreenHeight * 0.01, color: colors.darkGreen, fontWeight: 'bold'}}>
                    {activity.site}
                  </RegularText>
                </View>
                <View>
                  <SmallText>
                    Activité céduler pour le
                  </SmallText>
                  <RegularText
                    textStyle={{fontWeight: 'bold', marginBottom: ScreenHeight * 0.01, color: colors.darkGreen}}
                    >
                      {new Date(activity.activityDate).toLocaleDateString()}   {Platform.OS === 'ios' ? new Date(activity.activityDate).toLocaleTimeString().slice(0, -3) : new Date(activity.activityDate).toLocaleTimeString().slice(0, -9)}
                  </RegularText>
                </View>
              </View>
              <SmallText>
                Créé par
              </SmallText>
              <UserContainer
                userId={activity.creator}
                accessToken={user.accessToken}
                style={{paddingTop: ScreenHeight * 0.01, paddingLeft: ScreenHeight * 0.01}}
                textStyle={{fontWeight: 'bold'}}
              />
              {activity.employee &&
                <>
                  <SmallText>
                    Assigné à
                  </SmallText>
                    <UserContainer
                      userId={activity.employee}
                      accessToken={user.accessToken}
                      style={{paddingLeft: ScreenHeight * 0.01, paddingTop: ScreenHeight * 0.01}}
                      textStyle={{fontWeight: 'bold'}}
                    />
                </>
              }
              <SmallText>
                Cette activité à été créé le
              </SmallText>
              <RegularText
                textStyle={{fontWeight: 'bold', marginBottom: ScreenHeight * 0.01, color: colors.darkGreen}}
                >
                  {new Date(activity.dateCreated).toLocaleDateString()}   {Platform.OS === 'ios' ? new Date(activity.dateCreated).toLocaleTimeString().slice(0, -3) : new Date(activity.dateCreated).toLocaleTimeString().slice(0, -9)}
              </RegularText>
            </View>
          </ScrollView>
          }
          {focusTab === 'acquiter' && 
            <>
            {activity.acquit ?
              <ScrollView
                style={{marginTop: ScreenHeight * 0.02}}
                contentContainerStyle={{paddingBottom: 400}}
              >
                <View
                  style={{paddingLeft: 20, paddingRight: 20}}
                > 
                  <SmallText>
                    Acquitté par
                  </SmallText>
                  <UserContainer
                    userId={activity.creator}
                    accessToken={user.accessToken}
                    style={{paddingTop: ScreenHeight * 0.01, paddingLeft: ScreenHeight * 0.01}}
                    textStyle={{fontWeight: 'bold'}}
                  />
                  <SmallText>
                    Acquitté le
                  </SmallText>
                  <RegularText
                    textStyle={{fontWeight: 'bold', marginBottom: ScreenHeight * 0.01, color: colors.darkGreen}}
                    >
                      {new Date(activity.acquitDate).toLocaleDateString()}   {Platform.OS === 'ios' ? new Date(activity.acquitDate).toLocaleTimeString().slice(0, -3) : new Date(activity.acquitDate).toLocaleTimeString().slice(0, -9)}
                  </RegularText>
                  {activity.acquitHelp.length > 0 &&
                  <>
                    <SmallText>
                      Avec l'aide de 
                    </SmallText>
                    {activity.acquitHelp.map((id: any) =>
                      <UserContainer
                        userId={id}
                        accessToken={user.accessToken}
                        style={{paddingLeft: ScreenHeight * 0.01, paddingTop: ScreenHeight * 0.01}}
                        textStyle={{fontWeight: 'bold'}}
                        key={id}
                      />
                    )}
                  </>
                  }
                  {activity.acquitComments &&
                  <>
                    <SmallText>
                      Commentaires : 
                    </SmallText>
                    <RegularText
                      textStyle={{fontWeight: 'bold', marginBottom: ScreenHeight * 0.01, color: colors.darkGreen}}
                    >
                      {activity.acquitComments}
                    </RegularText>
                  </>
                  }
                  {activity.acquitEquipment &&
                  <>
                    <SmallText>
                      Équipements : 
                    </SmallText>
                    <RegularText
                      textStyle={{fontWeight: 'bold', marginBottom: ScreenHeight * 0.01, color: colors.darkGreen}}
                    >
                      {activity.acquitEquipment}
                    </RegularText>
                  </>
                  }
                  {activity.acquitDescription &&
                  <>
                    <SmallText>
                      Description : 
                    </SmallText>
                    <RegularText
                      textStyle={{fontWeight: 'bold', marginBottom: ScreenHeight * 0.01, color: colors.darkGreen}}
                    >
                      {activity.acquitDescription}
                    </RegularText>
                  </>
                  }
                  {activity.acquitResult &&
                  <>
                    <SmallText>
                      Résultat : 
                    </SmallText>
                    <RegularText
                      textStyle={{fontWeight: 'bold', marginBottom: ScreenHeight * 0.01, color: colors.darkGreen}}
                    >
                      {activity.acquitResult}
                    </RegularText>
                  </>
                  }
                  {activity.acquitObservation &&
                  <>
                    <SmallText>
                      Observations : 
                    </SmallText>
                    <RegularText
                      textStyle={{fontWeight: 'bold', marginBottom: ScreenHeight * 0.01, color: colors.darkGreen}}
                    >
                      {activity.acquitObservation}
                    </RegularText>
                  </>
                  }
                </View>
              </ScrollView>
            : 
              <View>
                {activity.type === 'intervention' && 
                  <RegularButton
                    onPress={() => navigation.navigate('AcquitIntervention', activity)}
                    style={{height: ScreenHeight * 0.2, width: ScreenWidth * 0.8, marginTop: ScreenHeight * 0.1}}
                    textStyle={{textAlign: 'center', fontSize: ScreenHeight * 0.04}}
                  >
                    Cliquer ici pour acquiter l'activité
                  </RegularButton>
                }
                {activity.type === 'routine' && 
                  <RegularButton
                    onPress={() => navigation.navigate('AcquitRoutine', activity)}
                    style={{height: ScreenHeight * 0.2, width: ScreenWidth * 0.8, marginTop: ScreenHeight * 0.1}}
                    textStyle={{textAlign: 'center', fontSize: ScreenHeight * 0.04}}
                  >
                    Appuyer ici pour acquiter l'activité
                  </RegularButton>
                }
                {activity.type === 'general' && 
                  <RegularButton
                    onPress={() => navigation.navigate('AcquitGeneral', activity)}
                    style={{height: ScreenHeight * 0.2, width: ScreenWidth * 0.8, marginTop: ScreenHeight * 0.1}}
                    textStyle={{textAlign: 'center', fontSize: ScreenHeight * 0.04}}
                  >
                    Appuyer ici pour acquiter l'activité
                  </RegularButton>
                }
              </View>
            }
            </>
          }
          {focusTab === 'comments' && 
            <ScrollView
              style={{display: 'flex', flexDirection: 'column', width: '100%', height: '80%'}}
              contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingBottom: 400}}
            >
              {!comments.length &&
                <RegularText
                  style={{marginTop: ScreenHeight * 0.02}}
                >
                  Aucun commentaires.
                </RegularText>
              }
              {comments.map((comment: comment) => 
                <View
                  key={comment._id.toString()}
                >
                  <CommentContainer
                    comment={comment.comments}
                    commentId={comment._id}
                    creator={comment.creator}
                    accessToken={user.accessToken}
                    ownComment={comment.creator === user._id}
                  />
                </View>
              )}
            </ScrollView>
          }
          {(activity.creator === user._id || user.admin) && 
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