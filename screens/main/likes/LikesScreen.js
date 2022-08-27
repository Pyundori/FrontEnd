import React, { useState } from 'react';
import styled from 'styled-components/native';
import MainLogo from '../../../components/MainLogo';
import ProductsCard from '../../../components/ProductsCard';

const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: #68c2ff;
  align-items: center;
  justify-content: flex-start;
  margin-top: 40px;
`;

const BodyContainer = styled.View`
  height: 89%;
  width: 93%;
  background-color: #fff;
  align-items: flex-start;
  border-radius: 25px;
`;

const TitleContainer = styled.View`
  margin-left: 5%;
  margin-top: 3%;
`;
const Title = styled.Text`
  font-size: 30px;
  color: #68c2ff;
`;

const LikeProductsContainer = styled.View`
  width: 100%;
  height: 90%;
  align-items: center;
  justify-content: flex-start;
`;

const NotLikeProductsView = styled.View`
  width: 100%;
  height: 75%;
  align-items: center;
  justify-content: center;
`;
const NotLikeProductsText = styled.Text`
  font-size: 30px;
`;

const ProductsList = styled.FlatList`
  width: 95%;
  height: 10%;
  margin: 3% auto;
`;

const Likes = ({ likeProducts, getLikeProducts }) => {
  const [like, setLike] = useState(true);
  const ProductsCardContainer = ({ item }) => {
    return <ProductsCard item={item} />;
  };
  return (
    <Container>
      <MainLogo />
      <BodyContainer>
        <TitleContainer>
          <Title>좋아요 상품</Title>
        </TitleContainer>
        <LikeProductsContainer>
          {likeProducts[0] ? (
            <ProductsList
              data={likeProducts}
              extraData={like}
              renderItem={ProductsCardContainer}
              keyExtractor={(_, idx) => idx.toString()}
            />
          ) : (
            <NotLikeProductsView>
              <NotLikeProductsText>상품이 없어요...</NotLikeProductsText>
            </NotLikeProductsView>
          )}
        </LikeProductsContainer>
      </BodyContainer>
    </Container>
  );
};

export default Likes;
