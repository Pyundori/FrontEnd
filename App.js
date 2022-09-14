import 'expo-dev-client';
import { StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import Gate from './navigator/Gate';
import Loading from './components/Loading';

const cacheImages = (images) =>
  images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });

const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const handleFinish = () => setIsLoading(true);
  useEffect(() => {
    async function loadAssets() {
      try {
        const customFonts = {
          sansBold: require('./assets/fonts/GmarketSansBold.otf'),
          sansLight: require('./assets/fonts/GmarketSansLight.otf'),
          sansMedium: require('./assets/fonts/GmarketSansMedium.otf'),
          netmarbleB: require('./assets/fonts/netmarbleB.ttf'),
          netmarbleL: require('./assets/fonts/netmarbleL.ttf'),
          netmarbleM: require('./assets/fonts/netmarbleM.ttf'),
        };
        const images = [
          require('./assets/google_login.png'),
          require('./assets/google_login_pressed.png'),
          require('./assets/kakao_login.png'),
          require('./assets/not_image.png'),
          require('./assets/logo.png'),
          require('./assets/cu.png'),
          require('./assets/emart24.png'),
          require('./assets/gs25.png'),
          require('./assets/seven_eleven.png'),
        ];
        const fonts = [Ionicons.font, customFonts];
        const imagePromises = cacheImages(images);
        const fontPromises = cacheFonts(fonts);
        return Promise.all([...fontPromises, ...imagePromises]);
      } catch (e) {
        console.warn(e);
      } finally {
        handleFinish();
      }
    }
    loadAssets();
  }, []);

  return isLoading ? (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <Gate />
      </PersistGate>
    </Provider>
  ) : (
    <Loading />
  );
}
