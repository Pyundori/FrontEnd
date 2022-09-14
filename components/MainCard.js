import styled from 'styled-components/native';
import React from 'react';
import utils from '../utils';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Container = styled.View`
  width: ${width / 1.13}px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const LikeContainer = styled.View`
  height: 95%;
  width: 95%
  border-radius: 8px;
  border: 1px solid #dadce0;
`;

const LikeImg = styled.Image`
  width: 100%;
  height: 55%;
  border-radius: 8px;
  margin-top: 5px;
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
          <LikeImg resizeMode="contain" source={{ uri: item.pImg }} />
          <ServerText>{item.vender}</ServerText>
          <ServerText>{item.dType}</ServerText>
          <ServerText>{item.pName}</ServerText>
          <ServerText>{new String(item.pPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</ServerText>
        </LikeContainer>
      ) : (
        <LikeContainer>
          <LikeImg resizeMode="contain" source={{ uri: item.pImg }} />
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
