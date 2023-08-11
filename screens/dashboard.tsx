import React, { FunctionComponent, useContext, useState } from 'react';
import { View, ActivityIndicator, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { UserContext, UserDispatchContext } from '../context/user/userContext';
import * as SecureStore from 'expo-secure-store';


// Custom components
import REM_Network from '../assets/REM_network';
import MainContainer from '../components/containers/mainContainer';
import LargeText from '../components/texts/largeText';
import { ScreenHeight } from '../components/shared';
import { colors } from '../components/colors';
import ProfileIcon from '../components/icons/profileIcon';
import IconButton from '../components/buttons/iconButton';
import RoundIconButton from '../components/buttons/roundIconButton';
import DashboardMenuModal from '../components/modals/dashboardMenuModal';



const Dashboard: FunctionComponent = ({navigation}) => {
  const user = useContext(UserContext);
  const dispatch = useContext(UserDispatchContext);

  const [modalVisible, setModalVisible] = useState(false);

  const goToMore = () => {
    setModalVisible(false);
    navigation.navigate('More');
  }

  const goToList = () => {
    setModalVisible(false);
    navigation.navigate('List');
  }

  console.log(user);

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0}} >
      {user.firstName ? 
        <>
          <View
            style={{zIndex: 3, display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginTop: ScreenHeight / 8, marginRight: ScreenHeight / 24, marginLeft: ScreenHeight / 24}}
          >            
            <IconButton
              name='menu'
              size={8}
              style={{backgroundColor: colors.darkGreen}}
              onPress={() => setModalVisible(true)}
              color={colors.white}
            />
            <RoundIconButton
              name='plus'
              size={8}
              onPress={() => navigation.navigate('Create')}
            />
          </View>
          <View
            style={{marginTop: -ScreenHeight / 4, zIndex: 2}}
          >
            <REM_Network
              RIVOnPress={() => navigation.navigate('SiteActivity', {acronym: 'RIV', name: "Brossard"})}
              DUQOnPress={() => navigation.navigate('SiteActivity', {acronym: 'DUQ', name: "Du Quartier"})}
              PANOnPress={() => navigation.navigate('SiteActivity', {acronym: 'PAN', name: "Panama"})}
              IDSOnPress={() => navigation.navigate('SiteActivity', {acronym: 'IDS', name: "Île-des-Soeurs"})}
              GCTOnPress={() => navigation.navigate('SiteActivity', {acronym: 'GCT', name: "Gare Centrale"})}
              PCCOnPress={() => navigation.navigate('SiteActivity', {acronym: 'PCC', name: "Poste de Commande Centralisé"})}
              PCCROnPress={() => navigation.navigate('SiteActivity', {acronym: 'PCCR', name: "Poste de Commande Centralisé de Relève"})}
              MSFOnPress={() => navigation.navigate('SiteActivity', {acronym: 'MSF', name: "Atelier de Maintenance"})}
            />
          </View>
          <DashboardMenuModal
            modalVisible={modalVisible}
            closeModal={() => setModalVisible(false)}
            navigateList={goToList}
            navigateMore={goToMore}
          />
        </>
      :
        <MainContainer style={{backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
              size='large'
              color={colors.lightGreen}
          />
        </MainContainer>  
      }
    </MainContainer>
  );
}

export default Dashboard;