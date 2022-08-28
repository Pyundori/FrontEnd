import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Main';

export default function Gate() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}
