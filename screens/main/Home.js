import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import api from '../../api';

const Container = styled.View`
  flex: 1
  background-color: #68c2ff;
  align-items: space-between;
  justify-content: flex-start;
`;

const HeadContainer = styled.View`
  flex: 0.5;
  margin-top: 20px;
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
  width: 48%;
  margin: auto;
  margin-left: 1%;
`;

const SearchBar = styled.TextInput`
  width: 95%;
  border: 1px solid #e8e8e8;
  border-radius: 20px;
  margin-left: 5%;
  padding: 5px;
  background-color: #fff;
  text-align: center;
`;

const MainContainer = styled.View`
  flex: 3.3;
  align-items: center;
  width: 100%;
`;

const Body_1Container = styled.View`
  flex: 2.5;
  width: 90%;
  border: 1px solid #e8e8e8;
  flex-direction: row;
  background-color: white;
  border-radius: 8px;
`;

const Body_2Container = styled.View`
  flex: 1.8;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const AroundContainer = styled.View`
  width: 42%;
  margin: 4% 2% 4% 4%;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  background-color: white;
`;

const BlankContainer = styled.View`
  width: 42%;
  margin: 4% 4% 4% 2%;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  background-color: white;
`;

const StoreBtnContainer = styled.View`
  flex: 0.8;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 3%;
  width: 100%;
  padding-left: 2%;
  padding-right: 2%;
`;

const MartBtn = styled.TouchableOpacity`
  width: 20%;
  height: 80%;
  margin-top: 1%;
`;

const MartLogo = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

const ServerImage = styled.Image``;

const Home = (focus) => {
  const [text, onChangeText] = React.useState('');
  const a = async () => {
    const b = await api.search('cu', '1N1', 2);
    console.log(b.data.data);
  };
  a();
  return (
    <Container>
      <HeadContainer>
        <MainLogoView>
          <MainLogo source={require('../../assets/logo.png')} />
        </MainLogoView>
        <SearchContainer>
          <SearchBar
            onChangeText={onChangeText}
            value={text}
            placeholder="검색어를 입력하시오."
            maxLength={20}
          />
        </SearchContainer>
      </HeadContainer>
      <MainContainer>
        <Body_1Container></Body_1Container>
        <Body_2Container>
          <AroundContainer></AroundContainer>
          <BlankContainer></BlankContainer>
        </Body_2Container>
        <StoreBtnContainer>
          <MartBtn>
            <MartLogo source={require('../../assets/seven_eleven_2.png')} />
          </MartBtn>
          <MartBtn>
            <MartLogo source={require('../../assets/emart24_2.png')} />
          </MartBtn>
          <MartBtn>
            <MartLogo source={require('../../assets/cu_2.png')} />
          </MartBtn>
          <MartBtn>
            <MartLogo source={require('../../assets/gs25_2.png')} />
          </MartBtn>
        </StoreBtnContainer>
      </MainContainer>
    </Container>
  );
};

export default Home;
