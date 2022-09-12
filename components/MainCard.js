import react from 'react';
import styled from 'styled-components/native';
import React, { useEffect, useState, useCallback } from 'react';
import Home from '../screens/main/Home';

const Container = styled.View`
  width: 160px;
  border-radius: 8px;
  margin: 4px;
`;

const LikeContainer = styled.View`
  height: 290px;
  width: 160px;
  border-radius: 8px;
  border: 1px solid #dadce0;
`;

const LikeImg = styled.Image`
  width: 100%;
  height: 170px;
  border-radius: 8px;
`;

const ServerText = styled.Text`
  font-size: 17px;
`;

const MainCard = ({ item }) => {
  return (
    <Container>
      <LikeContainer>
        <LikeImg source={{ uri: item.pImg }} />
        <ServerText>{item.vender}</ServerText>
        <ServerText>{item.dType}</ServerText>
        <ServerText>{item.pName}</ServerText>
        <ServerText>{new String(item.pPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</ServerText>
      </LikeContainer>
    </Container>
  );
};

export default MainCard;
