import React, { useEffect, useState } from 'react';
import { Alert, Button, Text } from 'react-native';
import { useSelector, useStore } from 'react-redux';
import styled from 'styled-components/native';
import LogoBtn from '../../../components/LogoBtn';
import conv from '../../../conv';
import MartDataFilter from "../../../Data/MartDataFilter";
import SaleDataFilter from "../../../Data/SaleDataFilter";
import { element } from 'prop-types';

function Search_Filter() {
  const a = useSelector((state) => state.products.search);
  console.log(a);
  const [searchText, setSearchText] = useState('');

  const [duplicated, setDuplicated] = useState(["전체"]);

  useEffect(() => {
    if(duplicated.length === 4 || duplicated.length === 0) {
      setDuplicated(["전체"]);
    }
  }, [duplicated]);

  const handleDuplicated = (e) => {
    console.log(e.target.value);
    const isIncludes = duplicated.find((el) => el === e.target.value);

    if (e.target.value === "전체") {
      setDuplicated(["전체"])
    }
    else if (isIncludes) {
      setDuplicated(duplicated.filter((el) => el !== e.target.value));
    }
    else if (duplicated.length > 0) {
      setDuplicated([...duplicated.filter((el) => el !== "전체"), e.target.value, ]);
    }
  }

  return (
    <Container>
      <UpperContainer>
        <MainLogoView>
          <MainLogo source={require('../../../assets/logo.png')} />
        </MainLogoView>
        <SearchContainer>
          <SearchBar
            placeholder="검색어를 입력하세요"
            Value={searchText}
            onChangeText={(value) => setSearchText(value)}
            maxLength={40}
          />
        </SearchContainer>
      </UpperContainer>
      <MiddleContainer>
        <MartSearchContainer>
          <MartTitleContainer>
            <Title>마트 검색</Title>
          </MartTitleContainer>
          <MartButtoncontainer>
            <MartAttriBtn>
              {MartDataFilter.map((el, index) => (
                <AttriBtn
                  title = {el.value}
                  key = {index}
                  type = "button"
                  onClick = {handleDuplicated}
                  value = {el.value}
                  backgroundColor = { duplicated.find((element) => element === el.value)} >
                  </AttriBtn>
              ))}
            </MartAttriBtn>
          </MartButtoncontainer>
        </MartSearchContainer>
        <SaleSearchContainer>
          <SaleTitleContainer>
            <Title>할인 검색</Title>
          </SaleTitleContainer>
          <SaleButtonContainer>
            <SaleAttriBtn>
              {SaleDataFilter.map((el, index) => (
                <AttriBtn
                  title = {el.value}
                  key = {index}
                  type = "button"
                  onClick = {handleDuplicated}
                  value = {el.value}
                  backgroundColor = { duplicated.find((element) => element === el.value)} >
                  </AttriBtn>
              ))}
            </SaleAttriBtn>
          </SaleButtonContainer>
        </SaleSearchContainer>
      </MiddleContainer> 
      <BottomContainer>
        <LatelySearchViewContainer>
          <LatelySearchTitle>
            <Title>최근 검색어</Title>
            <ClearBtn
              title = "전체 삭제"
              type = "button"
              onClick = {null}>
              </ClearBtn>
          </LatelySearchTitle>
          <LatelySearchBoard>

          </LatelySearchBoard>
        </LatelySearchViewContainer>
        <FamousSearchViewContainer>
          <FamousSearchTitle>
            <Title>인기 검색어</Title>
          </FamousSearchTitle>
          <FamousSearchBoard>
            
          </FamousSearchBoard>
        </FamousSearchViewContainer>
      </BottomContainer> 
    </Container>
  );
};

const Container = styled.View`
  flex: 1
  background-color: #68c2ff;
  align-items: space-between;
  justify-content: flex-start;
`;

const UpperContainer = styled.View`
  flex: 0.12;
  margin-top: 15px;
  height: 10%;
  width: 95%;
  padding-top: 5%;
  justify-content: space-around;
`;

const MiddleContainer = styled.View`
  flex: 0.25;
  width: 95%;
  height: 10%;
  justify-content: flex-start;
  background-color: white;
  border-radius: 8px;
  margin-left: 1%;
  margin-right: 2.4%;
  margin-top: 1%
`;

const BottomContainer = styled.View`
  flex: 0.6;
  width: 95%;
  height: 10%;
  justify-content: flex-start;
  background-color: white;
  border-radius: 8px;
  margin-top: 2%;
  margin-left: 1%;
  margin-right: 2.4%;
`;

const MainLogoView = styled.View``;

const SearchContainer = styled.View`
  flex-direction: row;
  width: 48%;
  margin: auto;
  margin-left: 1%;
`;

const MartSearchContainer = styled.View``;

const SaleSearchContainer = styled.View``;

const MartTitleContainer = styled.View`
  margin-left: 5%;
  margin-top: 2%;
`;

const SaleTitleContainer = styled.View`
  margin-left: 5%;
  margin-top: 2%;
`;

const MartButtoncontainer = styled.View`
  width: 85%;
`;

const SaleButtonContainer = styled.View`
  width: 85%;
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

const MainLogo = styled.Image`
  width: 180px;
  height: 50px;
  margin-left: 25%;
  margin-right: 50%;
`;

const SearchBar = styled.TextInput`
  width: 303px;
  border-radius: 18px;
  margin-left: 40%;
  margin-right: 50%;
  padding: 5px;
  background-color: #fff;
  text-align: left;
`;

const MartAttriBtn = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2%;
  width: 85%;
  padding-left: 5%;
  padding-right: 2%;
  padding-top: 3%
`;

const SaleAttriBtn = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2%;
  width: 85%;
  padding-left: 5%;
  padding-right: 2%;
  padding-top: 3%
  `;

const AttriBtn = styled.Button`
  margin: 0 3px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 400;

  color: ${({ backgroundColor }) => (backgroundColor ? "white" : "black")};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? "#428bca" : "#fff"};
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  &:hover {
    color: #333;
    color: ${({ backgroundColor }) => (backgroundColor ? "white" : "black")};
    background-color: ${({ backgroundColor }) =>
      backgroundColor ? "#428bca" : "#e6e6e6"};
    border-color: #adadad;
  }
`;

const ClearBtn = styled.Button`
  background-color: transparent;
`;

const LatelySearchBoard = styled.View``;

const FamousSearchBoard = styled.View``;

export default Search_Filter;