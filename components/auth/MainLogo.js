import styled from 'styled-components';

const Logo = styled.Image`
  width: 250px;
  height: 120px;
`;

const LogoContainer = styled.View`
  width: 100%;
  height: 10%;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const MainLogo = () => {
  return (
    <LogoContainer>
      <Logo source={require('../../assets/logo.png')} />
    </LogoContainer>
  );
};

export default MainLogo;
