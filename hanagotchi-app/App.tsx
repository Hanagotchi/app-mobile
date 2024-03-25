import "expo-dev-client";
import { theme } from './src/themes/globalThemes';
import { ThemeProvider } from 'react-native-paper';
import { AuthProvider } from "./src/contexts/AuthContext";
import Navigator from "./src/navigation/Navigator";
import * as SplashScreen from 'expo-splash-screen';
import { HanagotchiApiProvider } from "./src/contexts/HanagotchiServiceContext";

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 4000);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <HanagotchiApiProvider>
        <AuthProvider>
          <Navigator />
        </AuthProvider>
      </HanagotchiApiProvider>
    </ThemeProvider>
  );
}
