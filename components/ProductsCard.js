import styled from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLikeProducts } from '../redux/userSlice';
import { useIsFocused } from '@react-navigation/native';

const CardContainer = styled.SafeAreaView`
  width: 100%;
  border-radius: 10px;
  padding: 5px;
  border: 1.5px solid #dadce0;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  margin-vertical: 2%;
`;

const ImageContainer = styled.View`
  width: 30%;
  margin: auto;
  margin-left: 0px;
`;

const ImageView = styled.View`
  width: 100px
  height: 100px
  border-radius: 10px;
  border: 1px solid #dadce0;
  margin: auto;
`;

const ProductImage = styled.Image`
  width: 90px;
  height: 90px;
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
  font-size: 15px;
  font-family: sansBold;
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

const LikeBtn = styled.TouchableOpacity``;

let tmpProducts = [];
const ProductsCard = ({ item, likeProducts }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [isImgValid, setIsImgValid] = useState(undefined);
  const [isLike, setIsLike] = useState(false);

  // Search 탭에서만 가져오는 param
  if (likeProducts) {
    useEffect(() => {
      const isLikeProduct = likeProducts.find((product) => product.pName === item.pName);
      isLikeProduct ? setIsLike(true) : setIsLike(false);
      CheckImgStatus(item.pImg);
    }, [likeProducts]);
  } else {
    useEffect(() => {
      setIsLike(true);
      CheckImgStatus(item.pImg);
    }, [item]);
    useEffect(() => {
      tmpProducts.forEach((product) => dispatch(setLikeProducts(product)));
      tmpProducts = [];
    }, [isFocused]);
  }

  const handleLike = () => {
    if (likeProducts) {
      setIsLike(!isLike);
      dispatch(setLikeProducts(item));
    } else {
      const isDuplicated = tmpProducts.find((product) => product.pName === item.pName);
      if (isDuplicated) {
        tmpProducts = tmpProducts.filter((product) => product.pName !== item.pName);
      } else {
        tmpProducts.push(item);
      }
      setIsLike(!isLike);
    }
  };

  const CheckImgStatus = async (pImg) => {
    try {
      const res = await axios.get(pImg, {
        validateStatus: (status) => {
          return status === 200 || 404; // 상태 코드가 200 또는 404인 경우에만 에러 없음.
        },
      });
      if (res.status === 200) {
        setIsImgValid(true);
      } else {
        setIsImgValid(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CardContainer>
      <ImageContainer>
        <ImageView>
          <ProductImage
            source={isImgValid ? { uri: item.pImg } : require('../assets/not_image.png')}
          />
        </ImageView>
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
        <LikeBtn onPress={() => handleLike(item)}>
          <AntDesign name={isLike ? 'heart' : 'hearto'} size={28} color="red" />
        </LikeBtn>
      </LikeContainer>
    </CardContainer>
  );
};
export default ProductsCard;
