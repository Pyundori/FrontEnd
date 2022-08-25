import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import utils from '../../utils';

const Container = styled.View`
  flex: 1
  background-color: #fff;
  align-items: center;
  justify-content: flex-start;
`;

const HeadContainer = styled.View`
  height: 20%;
  width: 90%;
  justify-content: center;
  align-items: center;
`;

const MainLogo = styled.Image`
  width: 170px;
  height: 50px;
`;

const MainLogoView = styled.View``;

const SearchContainer = styled.View`
  flex-direction: row;
  margin-left: auto;
  margin-top: 20px;
`;

const SearchPressable = styled.Pressable`
  padding: 5px;
`;

const Home = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <HeadContainer>
        <SearchContainer>
          <SearchPressable onPress={() => navigation.navigate('Search')}>
            <Ionicons
              name={utils.isAndroid() ? 'md-search' : 'ios-search'}
              size={30}
              color="black"
            />
          </SearchPressable>
        </SearchContainer>
        <MainLogoView>
          <MainLogo source={require('../../assets/logo.png')} />
        </MainLogoView>
      </HeadContainer>
    </Container>
  );
};

export default Home;
