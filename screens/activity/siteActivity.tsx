import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { ActivityIndicator, View, Platform } from 'react-native';
import styled from 'styled-components/native';
import { fetchActivities } from '../../services/activityServices/fetchActivities';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import { UserContext } from '../../context/user/userContext';
import RegularText from '../../components/texts/regularText';
import StyledView from '../../components/views/styledView';
import { getLevelOptions } from '../../components/levelOptions';


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;

const SiteActivity: FunctionComponent = ({navigation}) => {
  const user = useContext(UserContext);
  const [activities, setActivities] = useState([]);
  const [activityLoaded, setActivityLoaded] = useState(false);

  useEffect(() => {
    const getBets = async () => {
      try {
        const result = await fetchActivities(user.accessToken);
        setActivities(result.data);
        setActivityLoaded(true);
      } catch (error) {
        console.log(error);
        setActivities([]);
      }
    }
    getBets();
  }, [user])

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.whiteGreen}} >
      <MainContainer style={{backgroundColor: 'transparent'}}>
        {activityLoaded ?
            <View>
              <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold', color: colors.darkGreen}}>
                Sites
              </LargeText>
              {activities.map((activity) => 
                <StyledView
                  style={{backgroundColor: colors.white, width: '100%', marginBottom: 10, padding: 10, borderRadius: 10}}
                  key={activity._id.toString()}
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
                  <RegularText>
                    Betting ends : 
                  </RegularText>
                  <RegularText
                    textStyle={{fontWeight: 'bold'}}
                    >
                      {new Date(activity.activityDate).toDateString()} at {Platform.OS === 'ios' ? new Date(activity.activityDate).toLocaleTimeString().slice(0, -3) : new Date(activity.activityDate).toLocaleTimeString().slice(0, -9)}
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
    </MainContainer>
  );
}

export default SiteActivity;