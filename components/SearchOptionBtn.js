import styled from 'styled-components/native';

const Container = styled.View`
  width: 60px
  margin-right: 3%;
  border-radius: 15px
  background-color: #0096ff;
  justify-content: center
  align-items: center
  opacity: ${(props) => (props.isContain ? 1 : 0.6)}
`;

const OptionBtn = styled.TouchableOpacity`
  padding: 8px;
`;

const OptionText = styled.Text`
  font-size: 16px;
  color: white;
`;

const SearchOptionBtn = ({
  venderText,
  saleText,
  handleVender,
  handleSale,
  venderOptions,
  saleOptions,
}) => {
  const isContain =
    venderOptions?.find((option) => option === venderText) ||
    saleOptions?.find((option) => option === saleText);
  return venderText ? (
    <Container isContain={isContain}>
      <OptionBtn onPress={() => handleVender(venderText)}>
        <OptionText>{venderText}</OptionText>
      </OptionBtn>
    </Container>
  ) : (
    <Container isContain={isContain}>
      <OptionBtn onPress={() => handleSale(saleText)}>
        <OptionText>{saleText}</OptionText>
      </OptionBtn>
    </Container>
  );
};

export default SearchOptionBtn;
