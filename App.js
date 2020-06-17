import React from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView, View, Image, Text } from 'react-native';
// react-navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
// importing screens
// import Home from './src/components/drawer/home';
import Splash from './src/components/splash';
import HomeScreen from './src/components/screens/homeScreen'
import OrdersScreen from './src/components/screens/ordersScreen';
import AccountScreen from './src/components/screens/accountScreen';
import SettingsScreen from './src/components/screens/settingsScreen';
import AboutScreen from './src/components/screens/aboutScreen';
import LoginScreen from './src/components/screens/loginScreen';
import colors from './src/config/colors';
import StoreScreen from './src/components/screens/storeScreen';
import CategoryScreen from './src/components/screens/categoryScreen';
import UserModeScreen from './src/components/screens/userModeScreen';
import CartScreen from './src/components/screens/cartScreen'

// drawer custom look
const customDrawer = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 150, alignItems: "center", justifyContent: "center" }}>
      <Image source={require('./src/assets/logo.jpg')} style={{ height: 100, width: 100, borderRadius: 60 }}></Image>
    </View>
    <View style={{height:50,  alignItems: "center", justifyContent: "center"}}>
      <Text>User Name</Text>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)
// This navigator makes the drawer
const DrawerNavigator = createDrawerNavigator({
  Home: HomeScreen,
  ActiveOrders: OrdersScreen,
  Account: AccountScreen,
  Settings: SettingsScreen,
  About: AboutScreen
},
  {
    contentComponent: customDrawer,
    contentOptions: {
      activeTintColor: colors.primaryColor
    } 
  });

const AppStackNavigator = createStackNavigator({
  drawerNavigator:  {screen: DrawerNavigator, 
                     navigationOptions: {
                                          headerShown: false},
                                        },
  storeScreen: {screen: StoreScreen},
  categoryScreen: {screen: CategoryScreen},
  cartScreen: {screen: CartScreen},
});
// We used createSwitchNavigator because we don't want our user to // navigate back to Splash screen by pressing back button. Hence
// Splash screen just get seen once by the user.
const AppSwitchNavigator = createSwitchNavigator(
  {
    Splash: { screen: Splash },
    Login: {screen: LoginScreen},
    UserMode: {screen: UserModeScreen},
    Drawer: { screen: AppStackNavigator },
  },
  {
    initialRouteName: 'Splash',
  },
);
const App = createAppContainer(AppSwitchNavigator);
export default App;
