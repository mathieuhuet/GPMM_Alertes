import React, { FunctionComponent, useContext, useState, useEffect } from 'react';
import { View, ActivityIndicator, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getUserInfo } from '../services/userServices/getUserInfo';
import { UserContext, UserDispatchContext } from '../context/user/userContext';
import { sortDataFromActivities } from '../utils/sortDataFromActivities';



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
import { fetchActivitiesByDepartment } from '../services/activityServices/fetchActivitiesByDepartment';



const Dashboard: FunctionComponent = ({navigation}: any) => {
  const user = useContext(UserContext);
  const dispatch = useContext(UserDispatchContext);
  const [activities, setActivities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activitiesStats, setActivitiesStats] = useState({
    activityGCT: '',
    activityIDS: '',
    activityPAN: '',
    activityDUQ: '',
    activityRIV: '',
    activityPCC: '',
    activityPCCR: '',
    activityMSF: '',
    numberOfBlue: 0,
    numberOfYellow: 0,
    numberOfRed: 0
  })

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

  useEffect(() => {
    const getActivities = async () => {
      if (user.departement) {
        try {
          const result = fetchActivitiesByDepartment(user.accessToken, {departement: user.departement}) as any;
          setActivities(result.data);
          setActivitiesStats(sortDataFromActivities(activities));
        } catch (err) {
          console.log(err, 'FETCHALLACTIVITIESDASHBOARD');
        }
      }
    }
    getActivities();
  }, [user.departement, user.reload]);

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0}} >
      {user.firstName ? 
        <>
          <View
            style={{zIndex: 3, display: 'flex', flexDirection: "row", justifyContent: 'space-between', paddingRight: ScreenHeight / 24, paddingLeft: ScreenHeight / 24, backgroundColor: colors.darkGreen, height: ScreenHeight * 0.3}}
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
            <View
              style={{alignSelf: 'center', alignItems: 'flex-end'}}
            >
              <View
                style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
              >
                <RegularText>
                  Alerte Mineur : {activitiesStats.numberOfBlue}
                </RegularText>
                <View style={{backgroundColor:colors.blue, width: 10, height: 10, borderRadius: 10, marginLeft: 8}}></View>
              </View>
              <View
                style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
              >
                <RegularText>
                  Alerte Important : {activitiesStats.numberOfYellow}
                </RegularText>
                <View style={{backgroundColor:colors.yellow, width: 10, height: 10, borderRadius: 10, marginLeft: 8}}></View>
              </View>
              <View
                style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
              >
                <RegularText>
                  Alerte Urgent : {activitiesStats.numberOfRed}
                </RegularText>
                <View style={{backgroundColor:colors.red, width: 10, height: 10, borderRadius: 10, marginLeft: 8}}></View>
              </View>
            </View>
          </View>
          <View
            style={{marginTop: -ScreenHeight / 2, zIndex: 2}}
          >
            <REM_Network
              RIVOnPress={() => navigation.navigate('SiteActivity', {acronym: 'RIV', name: "Brossard"})}
              RIVColor={activitiesStats.activityRIV}
              DUQOnPress={() => navigation.navigate('SiteActivity', {acronym: 'DUQ', name: "Du Quartier"})}
              DUQColor={activitiesStats.activityDUQ}
              PANOnPress={() => navigation.navigate('SiteActivity', {acronym: 'PAN', name: "Panama"})}
              PANColor={activitiesStats.activityPAN}
              IDSOnPress={() => navigation.navigate('SiteActivity', {acronym: 'IDS', name: "Île-des-Soeurs"})}
              IDSColor={activitiesStats.activityIDS}
              GCTOnPress={() => navigation.navigate('SiteActivity', {acronym: 'GCT', name: "Gare Centrale"})}
              GCTColor={activitiesStats.activityGCT}
              PCCOnPress={() => navigation.navigate('SiteActivity', {acronym: 'PCC', name: "Poste de Commande Centralisé"})}
              PCCColor={activitiesStats.activityPCC}
              PCCROnPress={() => navigation.navigate('SiteActivity', {acronym: 'PCCR', name: "Poste de Commande Centralisé de Relève"})}
              PCCRColor={activitiesStats.activityPCCR}
              MSFOnPress={() => navigation.navigate('SiteActivity', {acronym: 'MSF', name: "Atelier de Maintenance"})}
              MSFColor={activitiesStats.activityMSF}
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