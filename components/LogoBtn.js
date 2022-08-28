import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSearchOptions } from '../redux/productSlice';

const ButtonContainer = styled.View``;

const Button = styled.Pressable`
  width: 100%;
`;

const ButtonImage = styled.Image`
  width: 80px;
  height: 40px;
  border: 1px solid #dadce0;
  border-radius: 10px;
  padding: 5px;
  opacity: ${(props) => (props.isEnabled ? '1' : '0.3')};
`;

const LogoBtn = ({ source, searchOption }) => {
  const toggle = (searchOption) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setSearchOptions(searchOption));
    }, [isEnabled]);
  };
  const [isEnabled, setIsEnabled] = useState(true);
  toggle(searchOption);
  return (
    <ButtonContainer>
      <Button onPress={() => setIsEnabled(!isEnabled)}>
        <ButtonImage source={source} isEnabled={isEnabled} />
      </Button>
    </ButtonContainer>
  );
};

LogoBtn.propTypes = {
  source: PropTypes.any.isRequired,
  searchOption: PropTypes.string.isRequired,
};

export default LogoBtn;
