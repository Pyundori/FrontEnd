import axios from 'axios';
import qs from 'qs';
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import { setIsLogined } from '../../redux/userSlice';

const REST_API_KEY = '1f876c2cec349665dba6cd8b67eb5cd1';

// Expo용 URI
// const REDIRECT_URI = 'https://auth.expo.io/@dltjrrbs2020/pyundori';

// Production용 URI
const REDIRECT_URI = 'http://py.pyundori.kro.kr:5000/kakao/oauth2/callback';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

export default KakaoLogin = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
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
      const tokenResponse = await axios.post(requestTokenUrl, options);
      const token = tokenResponse.data.access_token;
      const body = {
        token,
      };
      const response = await axios.post(REDIRECT_URI, body);
      console.log(response);
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
          style={{ flex: 0 }}
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled
          onMessage={(event) => {
            const data = event.nativeEvent.url;
            setIsLoading(true);
            getCode(data);
          }}
        />
      )}
    </View>
  );
};
