import api from '../../api';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setIsLogined, setToken } from '../../redux/userSlice';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { useEffect } from 'react';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

const GoogleBtn = styled.Pressable`
  opacity: ${(props) => (props.disabled ? '0.6' : '1')};
`;

const GoogleImg = styled.Image``;

const isExpo = Constants.appOwnership === 'expo';

const EXPO_REDIRECT_PARAMS = { useProxy: true, projectNameForProxy: '@pyundori/pyundori' };
const NATIVE_REDIRECT_PARAMS = { native: 'com.dltjrrbs2020.pyundori://' };
const REDIRECT_PARAMS = isExpo ? EXPO_REDIRECT_PARAMS : NATIVE_REDIRECT_PARAMS;
const redirectUri = AuthSession.makeRedirectUri(REDIRECT_PARAMS);

const { expoClientId, iosClientId, androidClientId, webClientId } = isExpo
  ? Constants.expoConfig.extra
  : Constants.manifest.extra;

const GoogleLogin = ({ setIsLoading }) => {
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId,
    iosClientId,
    androidClientId,
    webClientId,
    redirectUri,
  });

  const googleMainLogin = async (accessToken) => {
    try {
      const {
        data: { token },
      } = await api.googleLogin(accessToken);
      dispatch(setToken(token));
      dispatch(setIsLogined());
      setIsLoading(false);
    } catch (e) {
      console.log('Local Token Request Error', e);
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      setIsLoading(true);
      const { authentication } = response;
      const { accessToken } = authentication;
      console.log(authentication);
      googleMainLogin(accessToken);
    }
  }, [response]);

  return (
    <GoogleBtn disabled={!request} onPress={() => promptAsync(REDIRECT_PARAMS)}>
      <GoogleImg source={require('../../assets/google_login.png')} />
    </GoogleBtn>
  );
};

export default GoogleLogin;
