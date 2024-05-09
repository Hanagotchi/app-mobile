import "expo-dev-client";
import 'react-native-gesture-handler';
import { theme } from './src/themes/globalThemes';
import { PaperProvider, ThemeProvider } from 'react-native-paper';
import { AuthProvider } from "./src/contexts/AuthContext";
import Navigator from "./src/navigation/Navigator";
import * as SplashScreen from 'expo-splash-screen';
import { HanagotchiApiProvider } from "./src/contexts/HanagotchiServiceContext";
import MyErrorBoundary from "./src/common/MyErrorBoundaries";
import { ToastAndroid } from "react-native";
import { LocationProvider } from "./src/contexts/LocationContext";
import { FirebaseProvider } from "./src/contexts/FirebaseContext";
import { useSession } from "./src/hooks/useSession";
import { OpenWeatherApiProvider } from "./src/contexts/OpenWeatherServiceContext";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 4000);

const handleError = (error: Error, stackTrace: string) => {
  ToastAndroid.show(error.message, ToastAndroid.LONG);
}

export default function App() {
  const loadFromSecureStore = useSession((state) => state.loadFromSecureStore);

  useEffect(() => {
    const load = async () => {
      await loadFromSecureStore();
    };
    load()
  }, [])

  return (
  <PaperProvider>
      <ThemeProvider theme={theme}>
        <MyErrorBoundary onError={handleError}>
          <OpenWeatherApiProvider>
            <HanagotchiApiProvider>
              <AuthProvider>
                <FirebaseProvider>
                  <LocationProvider>
                    <Navigator />
                  </LocationProvider>
                </FirebaseProvider>
              </AuthProvider>
            </HanagotchiApiProvider>            
          </OpenWeatherApiProvider>
        </MyErrorBoundary>
      </ThemeProvider>
    </PaperProvider>
  );
}
