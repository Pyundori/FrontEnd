import axios from 'axios';
import qs from 'qs';
import React, { useState } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import { setIsLogined } from '../../redux/userSlice';

const REST_API_KEY = '1f876c2cec349665dba6cd8b67eb5cd1';
const REDIRECT_URI = 'https://auth.expo.io/@dltjrrbs2020/pyundori';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

export default KakaoLogin = ({ navigation }) => {
  const getCode = (target) => {
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
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      });
      await navigation.goBack();
      const tokenResponse = await axios.post(requestTokenUrl, options);
      const ACCESS_TOKEN = tokenResponse.data.access_token;
      console.log(tokenResponse.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&prompt=login`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          const data = event.nativeEvent.url;
          getCode(data);
        }}
      />
    </View>
  );
};
