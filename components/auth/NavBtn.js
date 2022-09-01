import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Button = styled.View`
  margin-bottom: 25%;
  border: 1px solid ${(props) => (props.accent ? 'transparent' : 'black')};
  border-radius: 30px;
  padding: 5% 15%;
  align-items: center;
  background-color: ${(props) => (props.accent ? 'red' : 'transparent')};
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: ${(props) => (props.accent ? 'white' : 'black')};
`;

const NavBtn = ({ loading = false, onPress, text, accent = false }) => (
  <TouchableOpacity onPress={onPress}>
    <Button accent={accent}>
      <Text accent={accent}>{text}</Text>
    </Button>
  </TouchableOpacity>
);

NavBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  accent: PropTypes.bool,
  loading: PropTypes.bool,
};

export default NavBtn;
