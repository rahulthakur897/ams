import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import App from './App';
import store from './src/store';
import {name as appName} from './app.json';

const originalConsoleError = console.error;
console.error = (message, ...args) => {
  if (
    typeof message === 'string' &&
    message.includes('defaultProps will be removed')
  ) {
    return;
  }
  originalConsoleError.apply(console, [message, ...args]);
};

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  return (
    <SafeAreaProvider>
      <Provider store={store}>
          <App />
      </Provider>
    </SafeAreaProvider>
  );
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
