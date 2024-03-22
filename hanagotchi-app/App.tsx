import { SafeAreaView } from 'react-native';
import "expo-dev-client";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import CounterScreen from './src/screens/CounterScreen';

export default function App() {

  GoogleSignin.configure({
    webClientId: '1029732192625-gisom6p85duv00p5pic8d5e9p9gp89qp.apps.googleusercontent.com',
  });  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7EAC8" }}>
      <CounterScreen />
    </SafeAreaView>
  );
}
