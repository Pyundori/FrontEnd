import React, { useState } from 'react';
import { Text } from 'react-native';
import { useSelector, useStore } from 'react-redux';
import styled from 'styled-components/native';
import LogoBtn from '../../../components/LogoBtn';
import conv from '../../../conv';

const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: #fff;
  align-items: center;
  justify-content: flex-start;
`;
const SearchBtnContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
`;

const SearchBarContainer = styled.View`
  width: 80%;
`;

const SearchBar = styled.TextInput`
  height: 40px;
  border-width: 1px;
  border-color: #dadce0;
  border-radius: 10px;
  padding: 5px;
`;

const Search = () => {
  const a = useSelector((state) => state.products.search);
  console.log(a);
  const [searchText, setSearchText] = useState('');
  return (
    <Container>
      <SearchBtnContainer>
        <LogoBtn source={require('../../../assets/seven_eleven.png')} searchOption={conv.seven} />
        <LogoBtn source={require('../../../assets/gs25.png')} searchOption={conv.gs} />
        <LogoBtn source={require('../../../assets/emart24.png')} searchOption={conv.emart} />
        <LogoBtn source={require('../../../assets/cu.png')} searchOption={conv.cu} />
      </SearchBtnContainer>
      <SearchBarContainer>
        <SearchBar
          placeholder="검색어를 입력하세요"
          Value={searchText}
          onChangeText={(value) => setSearchText(value)}
          maxLength={40}
        />
      </SearchBarContainer>
      <Text>이제 시작...</Text>
    </Container>
  );
};

export default Search;
