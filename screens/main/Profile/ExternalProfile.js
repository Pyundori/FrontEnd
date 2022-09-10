import styled from 'styled-components';

const ExternalText = styled.Text`
  color: black;
`;

const ExternalProfile = ({ userData }) => {
  const { login } = userData;
  return <ExternalText>login: {login}</ExternalText>;
};

export default ExternalProfile;
