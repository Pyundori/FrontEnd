/* eslint-disable react/display-name */
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/main/Home';
import Search from '../screens/main/search/Search';
import Likes from '../screens/main/likes/Likes';
import Profile from '../screens/main/Profile/Profile';
import RecentList from '../screens/main/recentList/RecentList';
import { Ionicons } from '@expo/vector-icons';
import utils from '../utils';
import { Text } from 'react-native';

const TabsNavigator = createBottomTabNavigator();

const Tabs = () => {
  const LikesTab = ({ navigation }) => {
    return <Likes navigation={navigation} />;
  };

  return (
    <TabsNavigator.Navigator
      initialRouteName="Home"
      backBehavior="history"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 60,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: 'white',
        },
        tabBarLabel: ({ focused }) =>
          focused ? (
            <Text style={{ color: '#0096FF', fontSize: 14, marginBottom: 7 }}>{route.name}</Text>
          ) : null,
        tabBarIcon: ({ focused }) => {
          const isAndroid = utils.isAndroid();
          let iconName = `${isAndroid ? 'md-' : 'ios-'}`;
          if (route.name === 'Search') {
            iconName += 'search';
          } else if (route.name === 'Likes') {
            iconName += 'heart';
          } else if (route.name === 'RecentList') {
            iconName += 'pricetags';
          } else if (route.name === 'Profile') {
            iconName += 'person';
          } else if (route.name === 'Home') {
            iconName += 'home';
          }
          return <Ionicons name={iconName} size={30} color={focused ? '#0096FF' : '#68c2ff'} />;
        },
      })}
    >
      <TabsNavigator.Screen name="Search" component={Search} />
      <TabsNavigator.Screen name="Likes" component={LikesTab} />
      <TabsNavigator.Screen name="Home" component={Home} />
      <TabsNavigator.Screen name="RecentList" component={RecentList} />
      <TabsNavigator.Screen name="Profile" component={Profile} />
    </TabsNavigator.Navigator>
  );
};
const MainNavigator = createStackNavigator();

export default function Main() {
  return (
    <MainNavigator.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
      <MainNavigator.Screen name="Tabs" component={Tabs} />
    </MainNavigator.Navigator>
  );
}
