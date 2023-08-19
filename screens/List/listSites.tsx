import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { ActivityIndicator, ScrollView, View, Platform } from 'react-native';
import styled from 'styled-components/native';
import { fetchSites } from '../../services/siteServices/fetchSites';
import { site } from '../../utils/interface/siteInterface';


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


const ListSites: FunctionComponent = ({navigation}: any) => {
  const user = useContext(UserContext);
  const [sites, setSites] = useState([]);
  const [siteLoaded, setSiteLoaded] = useState(false);

  useEffect(() => {
    const getBets = async () => {
      try {
        const result = await fetchSites(user.accessToken) as any;
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
    <MainContainer style={{backgroundColor: colors.whiteGreen, paddingTop: 0, paddingLeft: 0, paddingRight: 0}} >
      <View
        style={{backgroundColor: colors.darkGreen, paddingBottom: 20}}
      >
        <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold', color: colors.whiteGreen, paddingTop: 60, paddingLeft: 20}}>
          Sites
        </LargeText>
      </View>
      {siteLoaded ?
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{backgroundColor: colors.whiteGreen}}
            contentContainerStyle={{paddingBottom: 200}}
          >
            {sites.map((site: site) => 
              <StyledView
                style={{backgroundColor: colors.white, width: '90%', padding: 10, borderRadius: 10, alignSelf: 'center', marginTop: 10}}
                key={site._id.toString()}
                onPress={() => navigation.navigate('SiteActivity', site)}
              >
                <View
                  style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}
                >
                  <LargeText
                    textStyle={{fontWeight: 'bold'}}
                  >
                    {site.acronym}
                  </LargeText>
                  <RegularText
                    textStyle={{fontWeight: 'bold'}}
                  >
                    {site.name}
                  </RegularText>
                </View>
              </StyledView>
            )}
          </ScrollView>
        :
        <ActivityIndicator
            size='large'
            color={colors.darkGreen}
        />
        }
    </MainContainer>
  );
}

export default ListSites;