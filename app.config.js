import 'dotenv/config';

const baseUrl = process.env.baseUrl;
const expoClientId = process.env.expoClientId;
const iosClientId = process.env.iosClientId;
const androidClientId = process.env.androidClientId;
const webClientId = process.env.webClientId;
const kakaoRestApiKey = process.env.kakaoRestApiKey;
const kakaoRedirectUri = process.env.kakaoRedirectUri;

module.exports = {
  name: '편도리',
  slug: 'pyundori',
  owner: 'pyundori',
  scheme: 'pyundori',
  version: '1.0.0',
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
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.dltjrrbs2020.pyundori',
  },
  android: {
    softwareKeyboardLayoutMode: 'pan',
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
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
  },
};
