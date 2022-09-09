import api from '../../api';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setIsLogined } from '../../redux/userSlice';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import getEnvVars from '../../environment';

const GoogleBtn = styled.Pressable`
  opacity: ${(props) => (props.disabled ? '0.6' : '1')};
`;
const GoogleImg = styled.Image``;

WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const { expoClientId, iosClientId, androidClientId, webClientId } = getEnvVars();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId,
    iosClientId,
    androidClientId,
    webClientId,
  });

  const googleMainLogin = async (token) => {
    const response = await api.googleLogin(token);
    console.log(response);
    await dispatch(setIsLogined());
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const { accessToken } = response.authentication;
      googleMainLogin(accessToken);
    }
  }, [response]);

  return request ? (
    <GoogleBtn onPress={() => promptAsync()}>
      <GoogleImg source={require('../../assets/google_login.png')} />
    </GoogleBtn>
  ) : (
    <ActivityIndicator
      style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
      size={50}
    />
  );
};

export default GoogleLogin;
