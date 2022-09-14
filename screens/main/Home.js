import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import React, { useEffect, useState, useCallback } from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import api from '../../api';
import { Asset } from 'expo-asset';
import Mainlogo from '../../components/MainLogo';
import MainCard from '../../components/MainCard';

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
  width: 100%;
`;

const Body_1Container = styled.View`
  flex-direction: row;
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

const AroundBtn = styled.Pressable`
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

const LikeView = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const ServerImage = styled.Image`
  width: 100%;
  height: 42%;
  margin-top: 10%;
  border-radius: 8px;
`;

const ServerText = styled.Text`
  font-size: 15px;
`;

const LikeList = styled.FlatList`
  width: 10%;
  height: 100%;
  border-radius: 8px;
`;

const Home = (focus) => {
  const [text, onChangeText] = React.useState('');
  const [Dtype, setDtype] = useState('');
  const [Image, setImage] = useState(require('../../assets/not_image.png'));
  const [Pname, setPname] = useState('');
  const [Pprice, setPprice] = useState('');
  const [Vender, setVender] = useState('');

  const Run_Api = async () => {
    const tmp = await api.search('cu', '1N1');
    setDtype(tmp.data.data[0].dType);
    setImage({ uri: tmp.data.data[0].pImg });
    setPname(tmp.data.data[0].pName);
    setPprice(tmp.data.data[0].pPrice);
    setVender(tmp.data.data[0].vender);
  };

  useEffect(() => {
    Run_Api();
  }, []);

  const Render_Img = useCallback(() => {
    return <ServerImage source={Image} />;
  }, [Image]);

  const Render_All = ({ tmp }) => {
    return (
      <LikeView>
        {Render_Img()}
        <ServerText>종류: {Dtype}</ServerText>
        <ServerText>
          상품명:{'\n'}
          {Pname}
        </ServerText>
        <ServerText>가격: {new String(Pprice).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</ServerText>
        <ServerText>편의점: {Vender}</ServerText>
      </LikeView>
    );
  };

  const List = [Dtype, Pname, Pprice, Vender];

  const item = useSelector((state) => state.users.likeProducts);

  return (
    <Container>
      <SafeAreaView>
        <Mainlogo />
        <MainContainer>
          <Body_1Container>
            {item[0] ? (
              <LikeList
                pagingEnabled={true}
                scrollEnabled={true}
                data={item}
                horizontal={true}
                renderItem={({ item }) => <MainCard item={item} />}
              />
            ) : (
              <ServerImage source={require('../../assets/not_image.png')} />
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
                <AroundBtn>
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
