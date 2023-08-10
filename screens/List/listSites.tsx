import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { ActivityIndicator, View, Platform } from 'react-native';
import styled from 'styled-components/native';
import { fetchSites } from '../../services/siteServices/fetchSites';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import { UserContext } from '../../context/user/userContext';
import RegularText from '../../components/texts/regularText';
import StyledView from '../../components/views/styledView';


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;

const ListSites: FunctionComponent = ({navigation}) => {
  const user = useContext(UserContext);
  const [sites, setSites] = useState([]);
  const [siteLoaded, setSiteLoaded] = useState(false);

  useEffect(() => {
    const getBets = async () => {
      try {
        const result = await fetchSites(user.accessToken);
        setSites(result.data);
        setSiteLoaded(true);
      } catch (error) {
        console.log(error);
        setSites([]);
      }
    }
    getBets();
  }, [user])

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.whiteGreen}} >
      <MainContainer style={{backgroundColor: 'transparent'}}>
        {siteLoaded ?
            <View>
              <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold', color: colors.darkGreen}}>
                Sites
              </LargeText>
              {sites.map((site) => 
                <StyledView
                  style={{backgroundColor: colors.white, width: '100%', marginBottom: 10, padding: 10, borderRadius: 10}}
                  key={site._id.toString()}
                  onPress={() => navigation.navigate('SiteActivity', site)}
                >
                  <View
                    style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}
                  >
                    <LargeText
                      textStyle={{fontWeight: 'bold'}}
                    >
                      {site.name}
                    </LargeText>
                    <LargeText
                      textStyle={{fontWeight: 'bold'}}
                    >
                      {site.acronym}
                    </LargeText>
                  </View>
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

export default ListSites;