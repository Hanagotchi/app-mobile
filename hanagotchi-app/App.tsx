import { SafeAreaView } from 'react-native';
import "expo-dev-client";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import CounterScreen from './src/screens/CounterScreen';
import { globalTheme } from './src/themes/globalThemes';

export default function App() {

  GoogleSignin.configure({
    webClientId: '1029732192625-gisom6p85duv00p5pic8d5e9p9gp89qp.apps.googleusercontent.com',
  });  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: globalTheme.pallete.background }}>
      <CounterScreen />
    </SafeAreaView>
  );
}
