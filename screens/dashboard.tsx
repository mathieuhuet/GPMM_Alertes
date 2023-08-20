import React, { FunctionComponent, useContext, useState, useEffect } from 'react';
import { View, ActivityIndicator, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getUserInfo } from '../services/userServices/getUserInfo';
import { UserContext, UserDispatchContext } from '../context/user/userContext';



// Custom components
import REM_Network from '../assets/REM_network';
import MainContainer from '../components/containers/mainContainer';
import { ScreenHeight, ScreenWidth } from '../components/shared';
import { colors } from '../components/colors';
import IconButton from '../components/buttons/iconButton';
import RoundIconButton from '../components/buttons/roundIconButton';
import DashboardMenuModal from '../components/modals/dashboardMenuModal';
import RegularButton from '../components/buttons/regularButton';
import RegularText from '../components/texts/regularText';



const Dashboard: FunctionComponent = ({navigation}: any) => {
  const user = useContext(UserContext);
  const dispatch = useContext(UserDispatchContext);

  const [modalVisible, setModalVisible] = useState(false);

  const goToMore = () => {
    setModalVisible(false);
    navigation.navigate('More');
  }

  const goToList = () => {
    setModalVisible(false);
    navigation.navigate('ListSites');
  }

  const goToAll = () => {
    setModalVisible(false);
    navigation.navigate('AllActivities')
  }


  useEffect(() => {
    getUserInfo(user.accessToken).then((result: any) => {
      dispatch({ type: 'SET_CREDENTIALS', 
      payload: {
        firstName: result.data.firstName, 
        lastName: result.data.lastName,
        email: result.data.email,
        profileIconColor: result.data.profileIconColor, 
        profileIconBackgroundColor: result.data.profileIconBackgroundColor,
        _id: result.data._id,
        role: result.data.role,
        departement: result.data.departement,
        admin: result.data.admin
      }});
    }).catch((err) => {
      console.log(err, 'APP 2');
      dispatch({ type: 'SET_ACCESSTOKEN', payload: {accessToken: ''}})
    })
  }, [user.accessToken])

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0}} >
      {user.firstName ? 
        <>
          <View
            style={{zIndex: 3, display: 'flex', flexDirection: "row", paddingRight: ScreenHeight / 24, paddingLeft: ScreenHeight / 24, backgroundColor: colors.darkGreen, height: ScreenHeight * 0.3}}
          >            
            <IconButton
              style={{backgroundColor: colors.lightGreen, height: ScreenHeight * (8 / 100), width: ScreenHeight * (8 / 100)}}
              onPress={() => setModalVisible(true)}
              color={colors.white}
            >
              <MaterialCommunityIcons
                name= 'menu'
                size={ScreenHeight * (8 / 200)}
                color={colors.darkGreen}
              />
            </IconButton>
          </View>
          <View
            style={{marginTop: -ScreenHeight / 2, zIndex: 2}}
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
            navigateAll={goToAll}
          />
          <RoundIconButton
            size={8}
            onPress={() => navigation.navigate('Create')}
            style={{position: 'absolute', left: ScreenWidth * 0.7, top: ScreenHeight * 0.75, zIndex: 4}}
          >
            <MaterialCommunityIcons
              name='plus'
              size={ScreenHeight * (8 / 200)}
              color={colors.darkGreen}
            />
          </RoundIconButton>
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