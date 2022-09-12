import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import api from '../../../api';
import MainLogo from '../../../components/MainLogo';
import ProductsCard from '../../../components/ProductsCard';
import SearchOptionBtn from '../../../components/SearchOptionBtn';
import {
  setHistory,
  setOnSearch,
  setSales,
  setSearchWord,
  setVenders,
} from '../../../redux/productSlice';

function Search() {
  const dispatch = useDispatch();
  const likeProducts = useSelector((state) => state.users.likeProducts, shallowEqual);
  const { onSearch, history, venders, sales, searchWord } = useSelector(
    (state) => state.products.search,
    shallowEqual,
  );

  const [searchText, setSearchText] = useState('');
  const [venderOptions, setVenderOptions] = useState(['전체']);
  const [saleOptions, setSaleOptions] = useState(['전체']);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    history && setSearchData(history);
    venders && setVenderOptions(venders);
    sales && setSaleOptions(sales);
    searchWord && setSearchText(searchWord);
  }, []);

  const handleVender = (vender) => {
    const isDuplicated = venderOptions.find((option) => option === vender);
    const isAll = venderOptions.find((option) => option === '전체');
    if (vender === '전체') {
      setVenderOptions(['전체']);
    } else if (isAll) {
      setVenderOptions([vender]);
    } else if (isDuplicated && venderOptions.length !== 1) {
      setVenderOptions(venderOptions.filter((option) => option !== vender));
    } else if (
      (isDuplicated && venderOptions.length === 1) ||
      (!isDuplicated && venderOptions.length === 3)
    ) {
      setVenderOptions(['전체']);
    } else {
      setVenderOptions([...venderOptions, vender]);
    }
  };

  const handleSale = async (sale) => {
    const isDuplicated = saleOptions.find((option) => option === sale);
    const isAll = saleOptions.find((option) => option === '전체');
    if (sale === '전체') {
      setSaleOptions(['전체']);
    } else if (isAll) {
      setSaleOptions([sale]);
    } else if (isDuplicated && saleOptions.length !== 1) {
      setSaleOptions(saleOptions.filter((option) => option !== sale));
    } else if (
      (isDuplicated && saleOptions.length === 1) ||
      (!isDuplicated && saleOptions.length === 3)
    ) {
      setSaleOptions(['전체']);
    } else {
      setSaleOptions([...saleOptions, sale]);
    }
  };

  const searchProduct = async () => {
    const localVenders = {
      전체: ['gs25', 'cu', 'seven_eleven', 'emart24'],
      GS25: ['gs25'],
      CU: ['gs25'],
      세븐: ['seven_eleven'],
      이마트: ['emart24'],
    };

    const localSales = {
      전체: ['1N1', '2N1', '3N1', 'SALE'],
      '1+1': ['1N1'],
      '2+1': ['2N1'],
      '3+1': ['3N1'],
      할인: ['SALE'],
    };

    const vender = venderOptions.map((option) => localVenders[option]);
    const sale = saleOptions.map((option) => localSales[option]);
    const {
      data: { data },
    } = await api.search(vender[0].join(','), sale[0].join(','), searchText, 1);
    setSearchData(data);
    dispatch(setVenders(venderOptions));
    dispatch(setSales(saleOptions));
    dispatch(setSearchWord(searchText));
    dispatch(setHistory(data));
    dispatch(setOnSearch(false));
  };

  return (
    <Container>
      <LogoContainer>
        <Logo source={require('../../../assets/logo.png')} />
      </LogoContainer>
      <HeadContainer>
        <SearchContainer>
          <SearchBar
            placeholder="검색어를 입력하세요"
            Value={searchText}
            defaultValue={searchWord}
            onChangeText={(value) => setSearchText(value)}
            returnKeyType="search"
            onSubmitEditing={searchProduct}
            onFocus={() => dispatch(setOnSearch(true))}
            maxLength={40}
          />
        </SearchContainer>
      </HeadContainer>
      {onSearch ? (
        <BodyContainer>
          <MiddleContainer>
            <VenderSearchContainer>
              <VenderTitleContainer>
                <Title>편의점 검색</Title>
              </VenderTitleContainer>
              <VenderBtnContainer>
                <SearchOptionBtn
                  venderText="전체"
                  handleVender={handleVender}
                  venderOptions={venderOptions}
                />
                <SearchOptionBtn
                  venderText="세븐"
                  handleVender={handleVender}
                  venderOptions={venderOptions}
                />
                <SearchOptionBtn
                  venderText="이마트"
                  handleVender={handleVender}
                  venderOptions={venderOptions}
                />
                <SearchOptionBtn
                  venderText="CU"
                  handleVender={handleVender}
                  venderOptions={venderOptions}
                />
                <SearchOptionBtn
                  venderText="GS25"
                  handleVender={handleVender}
                  venderOptions={venderOptions}
                />
              </VenderBtnContainer>
            </VenderSearchContainer>
            <SaleSearchContainer>
              <SaleTitleContainer>
                <Title>할인 검색</Title>
              </SaleTitleContainer>
              <SaleBtnContainer>
                <SearchOptionBtn
                  saleText="전체"
                  handleSale={handleSale}
                  saleOptions={saleOptions}
                />
                <SearchOptionBtn saleText="1+1" handleSale={handleSale} saleOptions={saleOptions} />
                <SearchOptionBtn saleText="2+1" handleSale={handleSale} saleOptions={saleOptions} />
                <SearchOptionBtn saleText="3+1" handleSale={handleSale} saleOptions={saleOptions} />
                <SearchOptionBtn
                  saleText="할인"
                  handleSale={handleSale}
                  saleOptions={saleOptions}
                />
              </SaleBtnContainer>
            </SaleSearchContainer>
          </MiddleContainer>
          <BottomContainer>
            <LatelySearchViewContainer>
              <LatelySearchTitle>
                <Title>최근 검색어</Title>
                <ClearBtn title="전체 삭제" type="button" onClick={null}></ClearBtn>
              </LatelySearchTitle>
              <LatelySearchBoard></LatelySearchBoard>
            </LatelySearchViewContainer>
            <FamousSearchViewContainer>
              <FamousSearchTitle>
                <Title>인기 검색어</Title>
              </FamousSearchTitle>
              <FamousSearchBoard></FamousSearchBoard>
            </FamousSearchViewContainer>
          </BottomContainer>
        </BodyContainer>
      ) : (
        <BodyContainer>
          {searchData[0] ? (
            <ProductLists
              data={searchData}
              renderItem={({ item }) => <ProductsCard item={item} likeProducts={likeProducts} />}
              keyExtractor={(_, idx) => idx.toString()}
            />
          ) : (
            <NoSearchDataView>
              <NoSearchData>검색결과가 없어요!</NoSearchData>
            </NoSearchDataView>
          )}
        </BodyContainer>
      )}
    </Container>
  );
}

const Container = styled.View`
  width: 100%
  height: 100%
  background-color: #68c2ff;
  align-items: center;
  justify-content: flex-start;
  padding-top: 40px
`;

const LogoContainer = styled.View`
  width: 100%;
  height: 12%;
  justify-content: center;
  align-items: center;
  margin-left: 2%;
`;

const Logo = styled.Image`
  width: 170px;
  height: 60px;
`;

const BodyContainer = styled.View`
  width: 93%;
  height: 81%;
  background-color: #fff;
  align-items: center;
  border-radius: 25px;
`;

const HeadContainer = styled.View`
  height: 8%;
  width: 93%;
  justify-content: center;
  align-items: center;
`;

const MiddleContainer = styled.View`
  width: 90%;
  height: 35%;
  align-items: center;
`;

const BottomContainer = styled.View`
  width: 100%;
  height: 65%;
  justify-content: flex-start;
  background-color: white;
  border-radius: 8px;
`;

const SearchContainer = styled.View`
  width: 95%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const VenderSearchContainer = styled.View`
  width: 100%;
  height: 50%;
  align-items: flex-start;
`;

const SaleSearchContainer = styled.View`
  width: 100%;
  height: 50%;
  align-items: flex-start;
`;

const VenderTitleContainer = styled.View`
  margin-top: 3%;
  align-items: flex-start;
`;

const SaleTitleContainer = styled.View`
  margin-top: 3%;
  align-items: flex-start;
`;

const VenderBtnContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const SaleBtnContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const LatelySearchViewContainer = styled.View``;

const FamousSearchViewContainer = styled.View``;

const LatelySearchTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-left: 5%;
  margin-top: 2%;
`;

const FamousSearchTitle = styled.View`
  margin-left: 5%;
  margin-top: 2%;
`;

const Title = styled.Text`
  font-size: 30px;
  color: #68c2ff;
`;

const SearchBar = styled.TextInput`
  width: 100%;
  border-radius: 20px;
  padding: 7px;
  padding-left: 15px;
  background-color: #fff;
  font-size: 16px;
`;

const ClearBtn = styled.Button`
  background-color: transparent;
`;

const LatelySearchBoard = styled.View``;

const FamousSearchBoard = styled.View``;

const ProductLists = styled.FlatList`
  width: 95%;
  height: 10%;
  margin: 3% auto;
`;

const NoSearchDataView = styled.View`
  width: 100%;
  height: 85%;
  align-items: center;
  justify-content: center;
`;

const NoSearchData = styled.Text`
  font-size: 25px;
  color: #c8c8c8;
`;

export default Search;
