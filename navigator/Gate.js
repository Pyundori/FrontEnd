import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Main';
import Auth from './Auth'
import { useSelector } from 'react-redux';

export default function Gate() {
  const isLogined = useSelector((state) => state.users.isLogined)
  return (
    <NavigationContainer>
      {isLogined ? <Main /> : <Auth />}
    </NavigationContainer>
  );
}
