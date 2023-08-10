import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { View, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import { deleteActivity } from '../../services/activityServices/deleteActivity';
import { getLevelOptions } from '../../components/levelOptions';


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


  const deleteActivityPress = async () => {
    try {
      const result = await deleteActivity({_id: activity._id}, user.accessToken);
      if (result.data) {
        closeDeleteModal();
        navigation.navigate('Dashboard');
      } else {
        setDeleteModalMessage('Erreur lors de la requête.')
      }
    } catch (error) {
      
    }
  }

  const resolveBet = () => {
    closeDeleteModal();
    if (user._id === activity.creator) {

    }
  }

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setDeleteModalMessage("Voulez-vous vraiment supprimer l'activité?");
  }

  
  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.white}} >
      <MainContainer style={{backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <View
          style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1}}
        >
          <View>
            <LargeText textStyle={{marginBottom: 5, color: colors.darkGreen}}>
              {activity.title}
            </LargeText>
            <RegularText textStyle={{marginBottom: 20, color: colors.darkGreen}}>
              {activity.description}
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
          <View>
            <RegularButton
              onPress={() => setDeleteModalVisible(true)}
            >
              <Entypo
                name='menu'
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
    </MainContainer>
  );
}

export default ActivityDetails;