import styled from 'styled-components';
import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogined, setToken } from '../../../redux/userSlice';
import React, { useEffect, useState } from 'react';
import api from '../../../api';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #68c2ff;
`;

const MainLogo = styled.Image`
  width: 180px;
  height: 58px;
  margin-bottom: 10%;
`;

const MainLogoView = styled.View``;

const InnerContainer = styled.View`
  width: 93%;
  height: 78%;
  align-items:center
  border-radius: 10px;
  background-color: white;
`;

const ExternalText = styled.Text`
  margin-top: 15%;
  font-size: 20px;
  color: black;
  font-weight: bold;
`;

const InformationText = styled.Text`
  margin-top: 10%;
  margin-left: 25%;
  font-size: 20px;
  color: #68c2ff;
  width: 100%;
`;
//text-align: center;

const ModBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #68c2ff
  height: 50px;
  width: 200px;
  margin-top: 35%;
  border-radius : 20px;
`;

const LogoutBtn = styled.TouchableOpacity`
  background-color: #ff68c2;
  justify-content: center;
  height: 50px;
  width: 200px;
  border-radius: 20px;
  margin: auto;
`;

const TextBtn = styled.Text`
  text-align: center;
  font-size: 18px;
  width: 200px;
  color: white;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [userData, setUserData] = useState('');
  const token = useSelector((state) => state.users.token);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const { data } = await api.getUserData(token);
    setUserData(data);
  };

  return (
    <SafeAreaView>
      <Container>
        <MainLogoView>
          <MainLogo source={require('../../../assets/logo.png')} />
        </MainLogoView>
        <InnerContainer>
          <ExternalText> 현재 접속한 회원정보 </ExternalText>
          <InformationText> 계정 연동 : {userData.login} </InformationText>
          <InformationText> Id : {userData.id} </InformationText>
          <InformationText> Name : {userData.name} </InformationText>
          <ModBtn
            onPress={() => {
              navigation.navigate('ModifyProfile', { userData });
            }}
          >
            <TextBtn> 변경사항 수정 </TextBtn>
          </ModBtn>
          <LogoutBtn
            onPress={() => {
              dispatch(setToken(''));
              dispatch(setIsLogined());
            }}
          >
            <TextBtn> 로그아웃 </TextBtn>
          </LogoutBtn>
        </InnerContainer>
      </Container>
    </SafeAreaView>
  );
};

export default Profile;
