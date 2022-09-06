import axios from 'axios';
import qs from 'qs';
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import api from '../../api';
import getEnvVars from '../../environment';
import { setIsLogined } from '../../redux/userSlice';

const { kakaoRestApiKey, kakaoRedirectUri } = getEnvVars();

export default KakaoLogin = ({ navigation }) => {
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

      const tokenResponse = await axios.post(requestTokenUrl, options);
      const { access_token } = tokenResponse.data;
      const response = await api.kakaoLogin(access_token);
      await dispatch(setIsLogined());
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={{ width: '100%', height: '100%' }}>
      {isLoading ? (
        <ActivityIndicator
          style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
          size={50}
        />
      ) : (
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
      )}
    </View>
  );
};
