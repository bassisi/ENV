// Adapted from https://reactnavigation.org/docs/auth-flow.html
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer } from "react-navigation";

import AuthLoadingScreen from './views/AuthLoadingScreen';
import SignInScreen from './views/SignInScreen';
import HomeScreen from './views/HomeScreen';
import ActivityScreen from './views/ActivityScreen';
import CalendarScreen from './views/CalendarScreen';
import DrawerMenuContent from './menus/DrawerMenu';

const headerOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#A72055'
    },
    headerTintColor: 'white'
  }
};

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen
  },
  headerOptions
);

const AppDrawer = createDrawerNavigator(
  {
    Home: createStackNavigator({ Home: HomeScreen }, headerOptions),
    Activity: createStackNavigator({ Activity: ActivityScreen }, headerOptions),
    Calendar: createStackNavigator({ Calendar: CalendarScreen }, headerOptions),
    'Sign Out': 'SignOut'
  },
  {
    hideStatusBar: true,
    contentComponent: DrawerMenuContent
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppDrawer,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
));