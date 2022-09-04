import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import MainLogo from '../../components/auth/MainLogo';
import { setIsLogined } from '../../redux/userSlice';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

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
  background-color: #2687ff;
  border-radius: 10px;
  padding: 2% 6%;
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

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '429326430308-cfli6dksco3dqfj13g0318415bf17136.apps.googleusercontent.com',
    iosClientId: '429326430308-rmb8a7t2si9mnk9816s5mf5rr82sn6pp.apps.googleusercontent.com',
    androidClientId: '429326430308-6msf7vl7jpsetccfidsu1gj2t47tkpb8.apps.googleusercontent.com',
    webClientId: '429326430308-cfli6dksco3dqfj13g0318415bf17136.apps.googleusercontent.com',
  });
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log(authentication);
    }
  }, [response]);
  return (
    <Container>
      <MainLogo />
      <BodyContainer>
        <LoginContainer>
          <LoginInput placeholder={'ID'} />
          <LoginInput placeholder={'Password'} />
          <LoginBtnContainer>
            <SignUpBtn onPress={() => navigation.navigate('SignIn')}>
              <SignUp>회원가입</SignUp>
            </SignUpBtn>
            <LoginBtn onPress={() => dispatch(setIsLogined())}>
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
          <GoogleBtn
            disabled={!request}
            title="Login"
            onPress={() => {
              promptAsync();
            }}
          >
            <GoogleImg source={require('../../assets/google_login.png')} />
          </GoogleBtn>
        </ExBtnContainer>
      </BodyContainer>
    </Container>
  );
};
export default Home;
