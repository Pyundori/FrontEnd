import styled from 'styled-components';
import MainLogo from '../../components/auth/MainLogo';

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

const SignUp = ({ navigation }) => {
  return (
    <Container>
      <MainLogo />
      <BodyContainer></BodyContainer>
    </Container>
  );
};
export default SignUp;
