import styled from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLikeProducts } from '../redux/userSlice';
import { useIsFocused } from '@react-navigation/native';
import utils from '../utils';

const CardContainer = styled.SafeAreaView`
  width: 100%;
  height: 128px
  border-radius: 10px;
  padding: 0px 5px 5px 5px;
  border: 1.5px solid ${(props) => props.borderColor};
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  margin-vertical: 1.5%;
`;

const ImageContainer = styled.View`
  width: 30%;
  align-items: center;
  margin: auto;
  margin-left: 0px;
`;

const SaleTypeContainer = styled.View`
  width: 90%
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgColor};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const SaleTypeText = styled.Text`
  font-size: 17px;
  color: #fff
  font-family: sansBold;
`;

const ImageView = styled.View`
  width: 100px
  height: 100px
  border-radius: 10px;
  border: 1px solid ${(props) => props.borderColor};
  margin: auto;
`;

const ProductImage = styled.Image`
  width: 90px;
  height: 90px;
  margin: auto;
`;

const ProductContainer = styled.View`
  width: 62%;
  height: 100%;
  justify-content: center;
`;
const ProductNameView = styled.View`
  width: 100%;
  height: 40%
  align-items: flex-start;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px
`;
const ProductPriceView = styled.View`
  width: 100%;
  align-items: flex-start;
  margin-bottom: 2px;
`;
const ProductConvView = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const BrandView = styled.View`
  width: 100%;
  margin: auto;
  margin-bottom: 10px;
`;
const Brand = styled.Text`
  font-size: 15px;
  margin-left: 5%;
  font-family: netmarbleM;
  letter-spacing: 0.5px;
`;

const TitleView = styled.View`
  width: 100%;
  margin: auto;
`;
const Title = styled.Text`
  font-size: 15px;
  font-family: sansBold;
  margin-left: 5%;
  letter-spacing: 0.5px;
  line-height: 19px;
`;

const Price = styled.Text`
  font-size: 17px;
  font-family: netmarbleM;
  margin-left: 5%;
  word-spacing: 3px;
  margin-bottom: 3px;
`;

const Conv = styled.Text`
  font-size: 14px;
  font-family: sansBold;
  color: ${(props) => props.color}
  margin-left: 3%;
  padding: 2% 4%
  border-radius: 10px
  background-color: ${(props) => props.bgColor};
`;

const LikeContainer = styled.View`
  width: 10%;
  margin: auto;
  justify-content: center;
`;

const LikeBtn = styled.TouchableOpacity``;

let tmpProducts = [];

const dTypeToText = {
  '1N1': '1+1',
  '2N1': '2+1',
  GIFT: '덤증정',
  SALE: '할인',
};

const dTypeToColor = {
  '1N1': '#EB5353',
  '2N1': '#FFB200',
  GIFT: '#36AE7C',
  SALE: '#187498',
};

const venderToText = {
  seven_eleven: '7-ELEVEN',
  emart24: 'Emart24',
  cu: 'CU',
  gs25: 'GS25',
};

const venderToTextColor = {
  seven_eleven: '#1B932A',
  emart24: '#FFB718',
  cu: '#652F8D',
  gs25: '#007CFF',
};

const venderToBgColor = {
  seven_eleven: '#F07D00',
  emart24: '#58585A',
  cu: '#ACCD3D',
  gs25: '#00D4EA',
};

const ProductsCard = ({ item, likeProducts }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [isLike, setIsLike] = useState(false);
  const [isValidImg, setIsValidImg] = useState(undefined);

  // likeProducts ==> Search 탭에서만 가져오는 param
  if (likeProducts) {
    useEffect(() => {
      const isLikeProduct = likeProducts.find((product) => product.pName === item.pName);
      isLikeProduct ? setIsLike(true) : setIsLike(false);
      CheckImgStatus(item);
    }, [likeProducts]);
  } else {
    // Likes TAB
    useEffect(() => {
      setIsLike(true);
      CheckImgStatus(item);
    }, [item]);
    useEffect(() => {
      tmpProducts.forEach((product) => dispatch(setLikeProducts(product)));
      tmpProducts = [];
    }, [isFocused]);
  }

  // 좋아요 버튼 콜백
  const handleLike = () => {
    // Search TAB
    if (likeProducts) {
      setIsLike(!isLike);
      dispatch(setLikeProducts(item));
    } else {
      // Likes TAB
      const isDuplicated = tmpProducts.find((product) => product.pName === item.pName);
      if (isDuplicated) {
        tmpProducts = tmpProducts.filter((product) => product.pName !== item.pName);
      } else {
        tmpProducts.push(item);
      }
      setIsLike(!isLike);
    }
  };

  // 이미지를 불러올 수 없으면 IsValidImg = false
  const CheckImgStatus = async (item) => {
    setIsValidImg(await utils.CheckImgStatus(item.pImg));
  };

  return (
    <CardContainer borderColor={dTypeToColor[item.dType]}>
      <ImageContainer>
        <SaleTypeContainer bgColor={dTypeToColor[item.dType]}>
          <SaleTypeText>{dTypeToText[item.dType]}</SaleTypeText>
        </SaleTypeContainer>
        <ImageView borderColor={dTypeToColor[item.dType]}>
          <ProductImage
            resizeMode="contain"
            source={isValidImg ? { uri: item.pImg } : require('../assets/not_image.png')}
          />
        </ImageView>
      </ImageContainer>
      <ProductContainer>
        <ProductNameView>
          <BrandView>
            <Brand>
              {/[)$][\w\W]+$/.test(item.pName) ? item.pName.replace(/[$()][\w\W]+$/, '') : ''}
            </Brand>
          </BrandView>
          <TitleView>
            <Title>
              {item.pName
                .replace(/[a-zA-Z가-힣]+([(]*[\w\W][)]|\))/, '')
                .replace('/', '')
                .replace(/\($/, '')
                .replace(/[0-9]+[a-zA-Z]*[()]*$/, '\n$&')}
            </Title>
          </TitleView>
        </ProductNameView>
        <ProductPriceView>
          <Price>{item.pPrice} 원</Price>
        </ProductPriceView>
        <ProductConvView>
          <FontAwesome name="map-marker" size={21} color="orange" style={{ marginLeft: '5%' }} />
          <Conv bgColor={venderToBgColor[item.vender]} color={venderToTextColor[item.vender]}>
            {venderToText[item.vender]}
          </Conv>
        </ProductConvView>
      </ProductContainer>
      <LikeContainer>
        <LikeBtn onPress={() => handleLike(item)}>
          <AntDesign name={isLike ? 'heart' : 'hearto'} size={28} color="red" />
        </LikeBtn>
      </LikeContainer>
    </CardContainer>
  );
};
export default ProductsCard;
