import { createStackNavigator } from '@react-navigation/stack';
import KakaoLogin from '../components/auth/KakaoLogin';
import Home from '../screens/auth/Home';

const AuthNavigator = createStackNavigator();

export default function Main() {
  return (
    <AuthNavigator.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <AuthNavigator.Screen name="Home" component={Home} />
      <AuthNavigator.Screen name="KakaoLogin" component={KakaoLogin} />
    </AuthNavigator.Navigator>
  );
}
