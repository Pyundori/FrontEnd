import styled from 'styled-components';
import { SafeAreaView, useNavigation,} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogined, setToken } from '../../../redux/userSlice';
import React, { useEffect, useState } from 'react';
import api from '../../../api';

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

const Innercontaniner = styled.View`
  
  width: 93%;
  height: 78%;
  border-radius: 10px;
  background-color: white;
`;

const ExternalText = styled.Text`
text-align: center;
margin-top: 15%;
font-size: 20px;
color: black;
font-weight: bold;
`;

const InformationText = styled.Text`
  margin-top: 10%;
  margin-left: 15%;
  font-size: 20px;
  color: #68c2ff;
  width: 100%; 
  align-items: flex-start; 
`;
  //text-align: center;



const Modbtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #68c2ff
  height: 50px;
  width: 200px;
  border-radius : 20px;
  margin: auto;


`;

const Logoutbtn = styled.TouchableOpacity`

  backgroundColor: #ff68c2;
  justify-content: center;
  height: 50px;
  width: 200px;
  border-radius : 20px;
  margin: auto;

  `;

 const  Textbtn = styled.Text`
   text-align: center;
   font-size: 18px;
   width: 200px;
   color : white;
  `;
 


const Profile = ( )=> {

  const dispatch = useDispatch();
  
  const navigation = useNavigation();

  const [userData, setUserData] = useState('');

  const token = useSelector((state) => state.users.token);
  const a = async () => {
    const { data } = await api.getUserData(token);
    setUserData(data);
    console.log(data);
  };

  useEffect(() => {
    a();
  }, []);

 
  return(
  <SafeAreaView>
    <Container>  
        <MainLogoView>
          <MainLogo source={require('../../../assets/logo.png')} />
        </MainLogoView>
      <Innercontaniner>
          <ExternalText> 현재 접속한 회원정보 </ExternalText>
          <InformationText> 계정 연동 : {userData.login} </InformationText>
          <InformationText> Id : {userData.id} </InformationText>
          <InformationText> Name : {userData.name} </InformationText>
          <Modbtn 
             onPress={() => {
        
              
              }}>
            <Textbtn> 변경사항 수정 </Textbtn>
          </Modbtn>          
          <Logoutbtn
            onPress={() => {
              dispatch(setToken(''));
              dispatch(setIsLogined());}}>
             <Textbtn> 로그아웃 </Textbtn>
          </Logoutbtn>
        </Innercontaniner>
    </Container>
  </SafeAreaView>

  )
};

export default Profile;