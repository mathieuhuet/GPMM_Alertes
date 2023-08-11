import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { ActivityIndicator, View, Platform, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { fetchActivitiesBySite } from '../../services/activityServices/fetchActivitiesBySite';

// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import { UserContext } from '../../context/user/userContext';
import RegularText from '../../components/texts/regularText';
import StyledView from '../../components/views/styledView';
import { getLevelOptions } from '../../components/levelOptions';
import RegularButton from '../../components/buttons/regularButton';



const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;

const SiteActivity: FunctionComponent = ({navigation, route}) => {
  const user = useContext(UserContext);
  const site = route.params;
  const [activities, setActivities] = useState([]);
  const [activityLoaded, setActivityLoaded] = useState(false);
  const [focusTab, setFocusTab] = useState('now');

  useEffect(() => {
    const getActivities = async () => {
      try {
        const result = await fetchActivitiesBySite(user.accessToken, site);
        setActivities(result.data);
        setActivityLoaded(true);
      } catch (error) {
        console.log(error);
        setActivityLoaded(true);
        setActivities([]);
      }
    }
    getActivities();
  }, [user])

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.white}} >
      <View
        style={{backgroundColor: colors.lightGreen}}
      >
        <LargeText
          textStyle={{fontWeight: 'bold', fontSize: 40, paddingLeft: 20, paddingTop: 50, color: colors.white}}
        >
          {site.acronym}
        </LargeText>
        <RegularText
          textStyle={{marginBottom: 20, paddingLeft: 20, color: colors.white}}
        >
          {site.name}
        </RegularText>
      </View>
      <View
        style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}
      >
        <TouchableOpacity
          style={[{flex: 1, height: 28}, focusTab === 'past' ? {backgroundColor: colors.white} : {backgroundColor: colors.lightGreen}]}
          onPress={() => setFocusTab('past')}
        >
          <RegularText
            textStyle={[{textAlign: 'center'}, focusTab === 'past' ? {color: colors.lightGreen} : {color: colors.white}]}
          >
            Acquité
          </RegularText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{flex: 1, height: 28}, focusTab === 'now' ? {backgroundColor: colors.white} : {backgroundColor: colors.lightGreen}]}
          onPress={() => setFocusTab('now')}
        >
          <RegularText
            textStyle={[{alignSelf: 'center'}, focusTab === 'now' ? {color: colors.lightGreen} : {color: colors.white}]}
          >
            En cours
          </RegularText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{flex: 1, height: 28}, focusTab === 'futur' ? {backgroundColor: colors.white} : {backgroundColor: colors.lightGreen}]}
          onPress={() => setFocusTab('futur')}
        >
          <RegularText
            textStyle={[{alignSelf: 'center'}, focusTab === 'futur' ? {color: colors.lightGreen} : {color: colors.white}]}
          >
            À venir
          </RegularText>
        </TouchableOpacity>
      </View>
      {activityLoaded ?
        <View
          style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center'}}
        >
          {activities.map((activity) => 
            <StyledView
              style={{backgroundColor: colors.white, width: '90%', marginBottom: 10, padding: 10, borderRadius: 10}}
              key={activity._id.toString()}
              onPress={() => navigation.navigate('ActivityDetails', activity)}
            >
              <View
                style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}
              >
                <LargeText
                  textStyle={{fontWeight: 'bold'}}
                >
                  {activity.title}
                </LargeText>
              </View>
              <LargeText
                textStyle={{fontSize: 20, textAlign: 'right'}}
              >
                {getLevelOptions(activity.level)}
              </LargeText>
              <RegularText
                textStyle={{fontWeight: 'bold', marginTop: 10}}
              >
                {new Date(activity.activityDate).toLocaleDateString()}
              </RegularText>
              <RegularText
                textStyle={{fontWeight: 'bold'}}
              >
                {Platform.OS === 'ios' ? new Date(activity.activityDate).toLocaleTimeString().slice(0, -3) : new Date(activity.activityDate).toLocaleTimeString().slice(0, -9)}
              </RegularText>
            </StyledView>
          )}
        </View>
        :
        <ActivityIndicator
            size='large'
            color={colors.darkGreen}
        />
        }
    </MainContainer>
  );
}

export default SiteActivity;