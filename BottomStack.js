import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Home from './src/screens/Home';
import Product from './src/screens/Product';
import ProductList from './src/screens/ProductList';

const Tab = createMaterialBottomTabNavigator();

export default function BottomStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#FFFFFF"
      inactiveColor="#FFC300"
      barStyle={{ backgroundColor: '#E37D00' }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Product"
        component={Product}
        options={{
          tabBarLabel: 'Novo',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="plus-box-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProductList"
        component={ProductList}
        options={{
          tabBarLabel: 'Listar',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list-alt" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
