import styled from 'styled-components';

const Logo = styled.Image`
  width: 170px;
  height: 50px;
`;

const LogoContainer = styled.View`
  width: 100%;
  height: 10%;
  justify-content: center;
  margin-left: 10%;
`;

const MainLogo = () => {
  return (
    <LogoContainer>
      <Logo source={require('../assets/logo.png')} />
    </LogoContainer>
  );
};

export default MainLogo;
