import api from '../../api';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setIsLogined, setToken } from '../../redux/userSlice';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import Loading from '../Loading';
import getEnvVars from '../../environment';

WebBrowser.maybeCompleteAuthSession();

const GoogleBtn = styled.Pressable`
  opacity: ${(props) => (props.disabled ? '0.6' : '1')};
`;

const GoogleImg = styled.Image``;

const GoogleLogin = ({ setIsLoading }) => {
  const dispatch = useDispatch();
  const { expoClientId, iosClientId, androidClientId, webClientId } = getEnvVars();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId,
    iosClientId,
    androidClientId,
    webClientId,
  });

  const googleMainLogin = async (accessToken) => {
    const {
      data: { token },
    } = await api.googleLogin(accessToken);
    dispatch(setToken(token));
    dispatch(setIsLogined());
    setIsLoading(false);
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
    <GoogleBtn disabled={!request} onPress={() => promptAsync()}>
      <GoogleImg source={require('../../assets/google_login.png')} />
    </GoogleBtn>
  );
};

export default GoogleLogin;
