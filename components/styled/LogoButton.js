import React from "react";
import styled from "styled-components/native";

const ButtonImage = styled.Image`
  width: 80px;
  height: 40px;
  border: 1px solid #dadce0;
  border-radius: 10px;
  padding: 5px;
`;

const ButtonContainer = styled.TouchableOpacity`
  width: 100%;
`;

const LogoButton = ({ img, title }) => {
  return (
    <ButtonContainer>
      <ButtonImage source={img} title={title} />
    </ButtonContainer>
  );
};

export default LogoButton;
