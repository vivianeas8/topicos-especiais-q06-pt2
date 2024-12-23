import { Button, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import BottomStack from './BottomStack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Product':
      return 'Produto';
    case 'ProductList':
      return 'Produtos Cadastrados';
  }
}

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#FEF3B4' }}>
      <StatusBar style="auto" backgroundColor="#AD6200" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: '#E37D00' },
            headerTintColor: '#FFFFFF',
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Login',
              headerTitleStyle: { fontWeight: 'bold', textAlign: 'center' },
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: 'Cadastre-se' }}
          />
          <Stack.Screen
            name="BottomStack"
            component={BottomStack}
            options={({ navigation, route }) => ({
              headerTitle: getHeaderTitle(route),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Atenção!',
                      'Deseja sair do aplicativo?',
                      [
                        {
                          text: 'Sim',
                          onPress: () => navigation.replace('Login'),
                        },
                        {
                          text: 'Não',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                  style={{ padding: 10 }}>
                  <MaterialCommunityIcons
                    name="exit-run"
                    color="#FFF"
                    size={26}
                  />
                </TouchableOpacity>
              ),
              headerTitleStyle: { fontWeight: 'bold', textAlign: 'center' },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
