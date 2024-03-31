import "expo-dev-client";
import { theme } from './src/themes/globalThemes';
import { PaperProvider, ThemeProvider } from 'react-native-paper';
import { AuthProvider } from "./src/contexts/AuthContext";
import Navigator from "./src/navigation/Navigator";
import * as SplashScreen from 'expo-splash-screen';
import { HanagotchiApiProvider } from "./src/contexts/HanagotchiServiceContext";
import MyErrorBoundary from "./src/common/MyErrorBoundaries";
import { ToastAndroid } from "react-native";

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 4000);

const handleError = (error: Error, stackTrace: string) => {
  ToastAndroid.show(error.message, ToastAndroid.LONG);
}

export default function App() {
  return (
    <PaperProvider>
      <ThemeProvider theme={theme}>
        <MyErrorBoundary onError={handleError}>
          
            <HanagotchiApiProvider>
              <AuthProvider>
                <Navigator />
              </AuthProvider>
            </HanagotchiApiProvider>
        
        </MyErrorBoundary>
      </ThemeProvider>
    </PaperProvider>
  );
}
