import { useSelector } from 'react-redux';
import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import Mainlogo from '../../components/MainLogo';
import MainCard from '../../components/MainCard';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: #68c2ff;
  align-items: center;
  justify-content: flex-start;
  padding-top: 10%;
`;

const HeadContainer = styled.View`
  margin-top: 6%;
  height: 20%;
  width: 90%;
  justify-content: center;
  border: solid;
`;

const MainContainer = styled.View`
  width: 100%;
  height: 90%;
  align-items: center;
`;

const Body_1Container = styled.View`
  width: 89%;
  height: 47%;
  border: 1px solid #e8e8e8;
  background-color: white;
  border-radius: 8px;
`;

const Body_2Container = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 35%;
`;

const AroundContainer = styled.View`
  width: 42%;
  height: 87%;
  margin: 4% 2% 4% 4%;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  background-color: white;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
`;

const AroundView = styled.View`
  width: 100%;
  height: 50%;
  position: absolute;
`;

const AroundImg = styled.Image`
  width: 75%;
  height: 95%;
  border-radius: 5px;
`;

const BBBB = styled.View`
  width: 55%;
  height: 53%;
  margin: 30% 0% 0% 47%;
  position: absolute;
`;

const SearchIcon = styled.Image`
  width: 80px;
  height: 80px;
  margin: auto;
  padding: 1px;
`;

const BtnView = styled.View`
  width: 55%;
  height: 15%;
  margin: 90% 0% 0% 40%;
  position: absolute;
`;

const AroundBtn = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 20px;
  background-color: #68c2ff;
`;

const AroundText = styled.Text`
  font-size: 20px;
  color: white;
  margin: auto;
`;

const BlankContainer = styled.View`
  width: 42%;
  height: 87%;
  margin: 4% 4% 4% 2%;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  background-color: white;
`;

const StoreBtnContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5%;
  width: 100%;
  height: 13%;
  padding-left: 5%;
  padding-right: 5%;
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

const ServerImage = styled.Image`
  width: 100%;
  height: 80%;
  border-radius: 8px;
`;

const LikeList = styled.FlatList`
  width: 100%
  border-radius: 8px;
`;

const Home = (focus) => {
  const Navigation = useNavigation();
  const likeProducts = useSelector((state) => state.users.likeProducts);

  return (
    <Container>
      <SafeAreaView style={{ width: '100%', height: '100%' }}>
        <Mainlogo />
        <MainContainer>
          <Body_1Container>
            {likeProducts[0] ? (
              <LikeList
                pagingEnabled={true}
                data={likeProducts}
                horizontal={true}
                renderItem={({ item }) => <MainCard item={item} />}
              />
            ) : (
              <ServerImage resizeMode="contain" source={require('../../assets/not_image.png')} />
            )}
          </Body_1Container>
          <Body_2Container>
            <AroundContainer>
              <AroundView>
                <AroundImg source={require('../../assets/AroundVender.png')} />
              </AroundView>
              <BBBB>
                <SearchIcon source={require('../../assets/search.png')} />
              </BBBB>
              <BtnView>
                <AroundBtn
                  onPress={() => {
                    Navigation.navigate('Map');
                  }}
                >
                  <AroundText>찾아보기</AroundText>
                </AroundBtn>
              </BtnView>
            </AroundContainer>
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
      </SafeAreaView>
    </Container>
  );
};

export default Home;
