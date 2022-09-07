import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import api from '../../api';
import { Asset } from 'expo-asset';

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

const MainContainer = styled.View`
  flex: 3.3;
  align-items: center;
  width: 100%;
`;

const Body_1Container = styled.View`
  flex: 2.5;
  flex-direction: row;
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
  flex-direction: row;
  position: relative;
  justify-content: space-between;
`;

const AroundImg = styled.Image`
  width: 70%;
  height: 50%;
  margin-left: 5%;
  berder-radius: 5px;
  position: absolute;
`;

const SearchIcon = styled.Image`
  width: 55%;
  height: 47%;
  margin-left: 45%;
  margin-top: 30%;
  position: absolute;
`;

const AroundBtn = styled.Pressable`
  width: 70%;
  height: 20%;
  border-radius: 20px;
  background-color: #68c2ff;
  margin: 90% 0% 0% 29%;
  padding: 5% 5% 5% 12%;
`;
const AroundText = styled.Text`
  font-size: 20px;
  color: white;
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
  justify-content: space-between;
  margin-bottom: 3%;
  width: 100%;
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
  flex-direction: center;
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

const Home = (focus) => {
  const [text, onChangeText] = React.useState('');
  const [Dtype, setDtype] = useState('');
  const [Image, setImage] = useState(require('../../assets/not_image.png'));
  const [Pname, setPname] = useState('');
  const [Pprice, setPprice] = useState('');
  const [Vender, setVender] = useState('');

  useEffect(() => {
    const Run_Api = async () => {
      const tmp = await api.search('cu', '1N1');
      setDtype(tmp.data.data[0].dType);
      setImage({ uri: tmp.data.data[0].pImg });
      setPname(tmp.data.data[0].pName);
      setPprice(tmp.data.data[0].pPrice);
      setVender(tmp.data.data[0].vender);
    };
    Run_Api();
  }, []);

  const Render_Img = useCallback(() => {
    return <ServerImage source={Image} />;
  }, [Image]);

  const Render_All = ({ tmp }) => {
    return (
      <LikeView style={{ flex: 'wrap' }}>
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

  return (
    <Container>
      <HeadContainer>
        <MainLogoView>
          <MainLogo source={require('../../assets/logo.png')} />
        </MainLogoView>
      </HeadContainer>
      <MainContainer>
        <Body_1Container>
          <FlatList data={List} renderItem={Render_All} />
          <FlatList data={List} renderItem={Render_All} />
        </Body_1Container>
        <Body_2Container>
          <AroundContainer>
            <AroundImg source={require('../../assets/AroundVender.png')} />
            <SearchIcon source={require('../../assets/search.png')} />
            <AroundBtn>
              <AroundText>찾아보기</AroundText>
            </AroundBtn>
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
    </Container>
  );
};

export default Home;
