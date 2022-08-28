import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import MainLogo from '../../components/auth/MainLogo';
import NavBtn from '../../components/auth/NavBtn';
import { setIsLogined } from '../../redux/userSlice';

const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: #68c2ff;
  align-items: center;
  justify-content: flex-start;
  padding-top: 15%;
`;

const BodyContainer = styled.View`
  height: 75%;
  width: 90%;
  background-color: #fff;
  align-items: flex-start;
  border-radius: 50px;
`;

const BtnContainer = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
`;

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const goToSignUp = () => navigation.navigate('SignUp');
  const goToSignIn = () => navigation.navigate('SignIn');
  return (
    <Container>
      <MainLogo />
      <BodyContainer>
        <BtnContainer>
          <NavBtn onPress={goToSignUp} text={'회원가입'} accent={true} />
          <NavBtn onPress={goToSignIn} text={'로그인'} />
          <NavBtn onPress={() => dispatch(setIsLogined())} text={'Main'} />
        </BtnContainer>
      </BodyContainer>
    </Container>
  );
};
export default Home;
