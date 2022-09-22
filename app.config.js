import 'dotenv/config';

// API Server Address
const baseUrl = 'http://py.pyundori.kro.kr:5000/';
// Google Secrets
const expoClientId = process.env.expoClientId;
const iosClientId = process.env.iosClientId;
const androidClientId = process.env.androidClientId;
const webClientId = process.env.webClientId;
// Kakao Secrets
const kakaoRestApiKey = process.env.kakaoRestApiKey;
const kakaoRedirectUri = process.env.kakaoRedirectUri;
// Check All of Platform Secrets exist
const isGoogleSecretExist = expoClientId && iosClientId && androidClientId && webClientId;
const isKakaoSecretExist = kakaoRestApiKey && kakaoRedirectUri;
// 빌드 중에만 로드되는 EAS 내장환경변수
const easBuildProfile = process.env.EAS_BUILD_PROFILE;
const isEasProd = easBuildProfile && easBuildProfile === 'production';

module.exports = {
  name: `편도리${!isEasProd ? '\n' + easBuildProfile : ''}`,
  slug: 'pyundori',
  owner: 'pyundori',
  scheme: 'pyundori',
  version: '1.0.0',
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  privacy: 'public',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  userInterfaceStyle: 'automatic',
  updates: {
    url: 'https://u.expo.dev/8e0f4397-e22a-43bb-8f3a-5ecee3bd4f65',
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    runtimeVersion: {
      policy: 'appVersion',
    },
    bundleIdentifier: 'com.dltjrrbs2020.pyundori',
  },
  android: {
    softwareKeyboardLayoutMode: 'pan',
    runtimeVersion: {
      policy: 'appVersion',
    },
    adaptiveIcon: {
      foregroundImage: './assets/icon_2.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.dltjrrbs2020.pyundori',
  },
  extra: {
    eas: {
      projectId: '8e0f4397-e22a-43bb-8f3a-5ecee3bd4f65',
    },
    baseUrl,
    expoClientId,
    iosClientId,
    androidClientId,
    webClientId,
    kakaoRestApiKey,
    kakaoRedirectUri,
    isGoogleSecretExist,
    isKakaoSecretExist,
  },
};
