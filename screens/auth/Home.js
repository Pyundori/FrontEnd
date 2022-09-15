import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import MainLogo from '../../components/auth/MainLogo';
import { setIsLogined, setToken } from '../../redux/userSlice';
import GoogleLogin from '../../components/auth/GoogleLogin';
import api from '../../api';
import { useEffect, useState } from 'react';
import MainModal from '../../components/MainModal';
import Loading from '../../components/Loading';

const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: #68c2ff;
  align-items: center;
  justify-content: center;
  padding-top: 45%;
`;

const BodyContainer = styled.View`
  height: 75%;
  width: 90%;
  align-items: flex-start;
`;

const LoginContainer = styled.View`
  width: 100%;
  height: 30%;
  align-items: center;
  margin-top: 8%;
  margin-bottom: 20%;
`;

const LoginInput = styled.TextInput`
  width: 80%;
  height: 28%;
  background-color: #fff;
  border: 1px solid #c8c8c8;
  border-radius: 15px;
  margin-bottom: 3%;
  padding-left: 15px;
`;

const LoginBtnContainer = styled.View`
  width: 80%
  flex-direction: row;
  justify-content: space-between;
  margin-top: 3%
`;
const SignUpBtn = styled.Pressable`
  justify-content: center;
  align-items: center;
  background-color: pink;
  border-radius: 15px;
  padding: 2% 6%;
`;
const LoginBtn = styled.Pressable`
  justify-content: center;
  align-items: center;
  background-color: #0096ff;
  border-radius: 10px;
  padding: 2% 6%;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const SignUp = styled.Text`
  font-size: 18px;
  color: #fff;
`;
const Login = styled.Text`
  font-size: 18px;
  color: #fff;
`;

const BoundaryContainer = styled.View`
  width: 100%
  height: 30%
  flex-direction: row;
  align-items: center;
  justify-content: center
`;

const BoundaryMargin = styled.View`
  width: 40%
  height: 1px;
  background-color: rgba(0, 0, 0, 0.35);
`;

const BoundaryText = styled.Text`
  width: 50px;
  text-align: center;
  color: rgba(0, 0, 0, 0.35);
`;

const ExBtnContainer = styled.View`
  width: 100%;
  height: 10%;
  align-items: center;
  justify-content: center;
`;

const KakaoBtn = styled.Pressable`
  margin-bottom: 5%;
`;
const KakaoImg = styled.Image``;

const GoogleBtn = styled.Pressable``;
const GoogleImg = styled.Image``;

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id && pw) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [id, pw]);

  const login = async () => {
    try {
      setIsLoading(true);
      const {
        data: { res_code, token },
      } = await api.login(id, pw);
      console.log(res_code);
      if (res_code === 201) {
        setIsLoading(false);
        dispatch(setToken(token));
        dispatch(setIsLogined());
      } else {
        setIsLoading(false);
        setModalVisible(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Container>
      <MainLogo />
      <BodyContainer>
        <LoginContainer>
          <LoginInput
            placeholder={'ID'}
            maxLength={20}
            value={id}
            onChangeText={(value) => setId(value)}
          />
          <LoginInput
            placeholder={'Password'}
            maxLength={16}
            value={pw}
            secureTextEntry={true}
            onChangeText={(value) => setPw(value)}
          />
          <LoginBtnContainer>
            <SignUpBtn onPress={() => navigation.navigate('SignUp')}>
              <SignUp>회원가입</SignUp>
            </SignUpBtn>
            <LoginBtn disabled={!isValid} onPress={login}>
              <Login>로그인</Login>
            </LoginBtn>
          </LoginBtnContainer>
        </LoginContainer>
        <BoundaryContainer>
          <BoundaryMargin />
          <BoundaryText>OR</BoundaryText>
          <BoundaryMargin />
        </BoundaryContainer>
        <ExBtnContainer>
          <KakaoBtn onPress={() => navigation.navigate('KakaoLogin')}>
            <KakaoImg source={require('../../assets/kakao_login.png')} />
          </KakaoBtn>
          <GoogleLogin setIsLoading={setIsLoading} />
        </ExBtnContainer>
        <MainModal
          navigation={navigation}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title="로그인 실패"
          btnText="다시 시도"
        />
      </BodyContainer>
    </Container>
  );
};
export default Home;
