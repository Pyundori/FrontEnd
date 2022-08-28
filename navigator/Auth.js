import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/auth/Home';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';

const AuthNavigator = createStackNavigator();

export default function Main() {
  return (
    <AuthNavigator.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <AuthNavigator.Screen name="Home" component={Home} />
      <AuthNavigator.Screen name="SignIn" component={SignIn} />
      <AuthNavigator.Screen name="SignUp" component={SignUp} />
    </AuthNavigator.Navigator>
  );
}
