import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import utils from '../../utils';
import { TextInput } from 'react-native-gesture-handler';

const Container = styled.View`
  flex: 1
  background-color: #68c2ff;
  align-items: space-between;
  justify-content: flex-start;
`;

const HeadContainer = styled.View`
  height: 20%;
  width: 95%;
  padding-top: 5%;
  justify-content: space-around;
  flex-direction: row;
`;

const MainLogo = styled.Image`
  width: 180px;
  height: 50px;
  margin: auto;
`;

const MainLogoView = styled.View``;

const SearchContainer = styled.View`
  flex-direction: row;
  width: 50%;
  margin: auto;
  margin-left: 1%;
`;

const SearchBar = styled.TextInput`
  width: 90%;
  height: 100%;
  border: solid;
  border-radius: 10px;
  background-color: #fff;
`;

const Home = () => {
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState("검색어를 입력하시오.");
  return (
    <Container>
      <HeadContainer>
        <MainLogoView>
          <MainLogo source={require('../../assets/logo.png')} />
        </MainLogoView>
        <SearchContainer>
          <Feather name="search" size={25} color="black"/>
          <SearchBar onChangeText={onChangeText} value={text}/>
        </SearchContainer>
      </HeadContainer>
    </Container>
  );
};

export default Home;
