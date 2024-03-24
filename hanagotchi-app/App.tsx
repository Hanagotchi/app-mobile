import "expo-dev-client";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { theme } from './src/themes/globalThemes';
import { ThemeProvider } from 'react-native-paper';
import { AuthProvider } from "./src/contexts/AuthContext";
import Navigator from "./src/navigation/Navigator";


export default function App() {

  GoogleSignin.configure({
    webClientId: '1029732192625-gisom6p85duv00p5pic8d5e9p9gp89qp.apps.googleusercontent.com',
  });  

  return (
    <ThemeProvider theme={theme}> 
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
