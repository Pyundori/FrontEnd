import axios from 'axios';
import qs from 'qs';
import React, { useState } from 'react';
import styled from 'styled-components';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import api from '../../api';
import { setIsLogined, setToken } from '../../redux/userSlice';
import Loading from '../Loading';
import Constants from 'expo-constants';

const Container = styled.View`
  width: 100%
  height: 100%
`;

const ENV = Constants.expoConfig.extra;
const kakaoRestApiKey = ENV.kakaoRestApiKey;
const kakaoRedirectUri = ENV.kakaoRedirectUri;

export default KakaoLogin = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const getCode = async (target) => {
    const exp = 'code=';
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      requestToken(requestCode);
    }
  };
  const requestToken = async (code) => {
    try {
      const requestTokenUrl = 'https://kauth.kakao.com/oauth/token';

      const options = qs.stringify({
        grant_type: 'authorization_code',
        client_id: kakaoRestApiKey,
        redirect_uri: kakaoRedirectUri,
        code,
      });

      const { data } = await axios.post(requestTokenUrl, options);
      console.log(data);
      const { access_token } = data;
      const {
        data: { token },
      } = await api.kakaoLogin(access_token);
      dispatch(setToken(token));
      dispatch(setIsLogined());
    } catch (e) {
      console.log(e);
    }
  };
  return isLoading ? (
    <Loading />
  ) : (
    <Container>
      <WebView
        style={{ flex: isLoading ? 0 : 1 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${kakaoRedirectUri}&response_type=code&prompt=login`,
        }}
        onShouldStartLoadWithRequest={(event) => {
          const { url } = event;
          if (!url.includes('kakao.com')) {
            setIsLoading(true);
            getCode(url);
            return false;
          }
          return true;
        }}
      />
    </Container>
  );
};
