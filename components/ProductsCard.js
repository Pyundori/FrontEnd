import styled from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

const CardContainer = styled.View`
  width: 100%;
  border-radius: 10px;
  padding: 5px
  border: 1px solid #dadce0;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  margin-vertical: 2%;
`;

const ImageContainer = styled.View`
  width: 30%;
  border-radius: 10px;
  border: 1px solid #dadce0;
  padding: 2px;
  margin: auto;
`;

const ProductImage = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
`;

const ProductDetail = styled.View`
  width: 50%;
  align-items: center;
  margin: auto;
`;
const TitleView = styled.View`
  width: 100%;
  align-items: flex-start;
  margin-bottom: 4%;
`;
const PriceView = styled.View`
  width: 100%;
  align-items: flex-start;
`;
const ConvView = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 20px;
  margin-left: 5%;
`;
const Price = styled.Text`
  font-size: 18px;
  margin-left: 5%;
`;
const Conv = styled.Text`
  font-size: 18px;
  margin-left: 2%;
`;

const LikeContainer = styled.View`
  width: 10%;
  margin: auto;
  justify-content: center;
`;

const LikeBtn = styled.Pressable``;

const ProductsCard = ({ item }) => {
  const [like, setLike] = useState(true);
  console.log(item.pImg);
  return (
    <CardContainer>
      <ImageContainer>
        <ProductImage resizeMode="contain" source={{ uri: item.pImg }} />
      </ImageContainer>
      <ProductDetail>
        <TitleView>
          <Title>{item.pName}</Title>
        </TitleView>
        <PriceView>
          <Price>{item.pPrice}원</Price>
        </PriceView>
        <ConvView>
          <FontAwesome name="map-marker" size={18} color="orange" style={{ marginLeft: '5%' }} />
          <Conv>{item.vender}</Conv>
        </ConvView>
      </ProductDetail>
      <LikeContainer>
        <LikeBtn onPress={() => setLike(!like)}>
          <AntDesign name={like ? 'heart' : 'hearto'} size={28} color="red" />
        </LikeBtn>
      </LikeContainer>
    </CardContainer>
  );
};

export default ProductsCard;
