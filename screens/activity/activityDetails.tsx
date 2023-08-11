import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import { deleteActivity } from '../../services/activityServices/deleteActivity';
import { getLevelOptions } from '../../components/levelOptions';
import { getDepartmentOptions } from '../../components/departmentOptions';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import { UserContext } from '../../context/user/userContext';
import RegularText from '../../components/texts/regularText';
import StyledView from '../../components/views/styledView';
import RegularButton from '../../components/buttons/regularButton';
import DeleteActivityModal from '../../components/modals/deleteActivityModal';



const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;

const ActivityDetails: FunctionComponent = ({navigation, route}) => {
  const user = useContext(UserContext);
  const activity = route.params;
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteModalMessage, setDeleteModalMessage] = useState("Voulez-vous vraiment supprimer l'activité?");
  const [focusTab, setFocusTab] = useState('detail');


  const deleteActivityPress = async () => {
    try {
      const result = await deleteActivity({_id: activity._id}, user.accessToken);
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
            <LargeText textStyle={{marginBottom: 5, color: colors.whiteGreen, fontWeight: 'bold', fontSize: 40, paddingLeft: 20, paddingTop: 50}}>
              {activity.title}
            </LargeText>
          </View>
          <View
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}
          >
            <TouchableOpacity
              style={[{flex: 1, height: 28}, focusTab === 'detail' ? {backgroundColor: colors.white} : {backgroundColor: colors.darkGreen}]}
              onPress={() => setFocusTab('detail')}
            >
              <RegularText
                textStyle={[{textAlign: 'center'}, focusTab === 'detail' ? {color: colors.darkGreen} : {color: colors.white}]}
              >
                Détails
              </RegularText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[{flex: 1, height: 28}, focusTab === 'acquiter' ? {backgroundColor: colors.white} : {backgroundColor: colors.darkGreen}]}
              onPress={() => setFocusTab('acquiter')}
            >
              <RegularText
                textStyle={[{alignSelf: 'center'}, focusTab === 'acquiter' ? {color: colors.darkGreen} : {color: colors.white}]}
              >
                Acquitement
              </RegularText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[{flex: 1, height: 28}, focusTab === 'comments' ? {backgroundColor: colors.white} : {backgroundColor: colors.darkGreen}]}
              onPress={() => setFocusTab('comments')}
            >
              <RegularText
                textStyle={[{alignSelf: 'center'}, focusTab === 'comments' ? {color: colors.darkGreen} : {color: colors.white}]}
              >
                Commentaires
              </RegularText>
            </TouchableOpacity>
          </View>
          <View
            style={{paddingLeft: 20}}
          >
            <RegularText textStyle={{marginBottom: 20, color: colors.darkGreen}}>
              {activity.description}
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
        <View>
          <RegularButton
            onPress={() => setDeleteModalVisible(true)}
            style={{backgroundColor: colors.failure, width: '20%'}}
          >
            <Entypo
              name='trash'
              size={30}
              color={colors.darkGreen}
            />
          </RegularButton>
        </View>
      </View>
      <DeleteActivityModal
        buttonHandler={deleteActivityPress}
        modalVisible={deleteModalVisible}
        closeModal={closeDeleteModal}
        message={deleteModalMessage}
      />
    </MainContainer>
  );
}

export default ActivityDetails;