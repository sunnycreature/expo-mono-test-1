// import { NativeModules } from 'react-native'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { Provider } from "react-redux";
// import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import store from "./src/store";
import DrawerNavigator from './src/components/DrawerNavigator';

export default function App() {
  // if (__DEV__) {
  //   NativeModules.DevSettings.setIsDebuggingRemotely(true)
  // }

  // const navigationRef = useNavigationContainerRef();

  // useReduxDevToolsExtension(navigationRef);

  return (
    // <NavigationContainer ref={navigationRef}>
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  );
}