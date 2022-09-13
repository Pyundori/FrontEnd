import styled from 'styled-components/native';
import React from 'react';
import utils from '../utils';

const Container = styled.View`
  width: 160px;
  height: 98%;
  border-radius: 8px;
  margin: 4px;
`;

const LikeContainer = styled.View`
  height: 100%;
  width: 160px;
  border-radius: 8px;
  border: 1px solid #dadce0;
  margin: auto;
`;

const LikeImg = styled.Image`
  width: 100%;
  height: 55%;
  border-radius: 8px;
`;

const ServerText = styled.Text`
  font-size: 18px;
`;

const IosServerText = styled.Text`
  font-size: 20%;
`;

const util = utils.isAndroid();

const MainCard = ({ item }) => {
  return (
    <Container>
      {util ? (
        <LikeContainer>
          <LikeImg source={{ uri: item.pImg }} />
          <ServerText>{item.vender}</ServerText>
          <ServerText>{item.dType}</ServerText>
          <ServerText>{item.pName}</ServerText>
          <ServerText>{new String(item.pPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</ServerText>
        </LikeContainer>
      ) : (
        <LikeContainer>
          <LikeImg source={{ uri: item.pImg }} />
          <IosServerText>{item.vender}</IosServerText>
          <IosServerText>{item.dType}</IosServerText>
          <IosServerText>{item.pName}</IosServerText>
          <IosServerText>
            {new String(item.pPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </IosServerText>
        </LikeContainer>
      )}
    </Container>
  );
};

export default MainCard;
