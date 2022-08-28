import 'expo-dev-client';
import React, { useState, useEffect } from 'react';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Image, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import Gate from './navigator/Gate';

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
  App.displayName = 'Pyundori';
  const [isLoading, setIsLoading] = useState(false);
  const handleFinish = () => setIsLoading(true);
  useEffect(() => {
    async function loadAssets() {
      try {
        const images = [
          require('./assets/logo.png'),
          require('./assets/cu.png'),
          require('./assets/emart24.png'),
          require('./assets/gs25.png'),
          require('./assets/seven_eleven.png'),
        ];
        const fonts = [Ionicons.font];
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
        <Gate />
      </PersistGate>
    </Provider>
  ) : (
    <ActivityIndicator color="blue" />
  );
}
