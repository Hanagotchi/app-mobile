import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "expo-dev-client";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function App() {

  GoogleSignin.configure({
    webClientId: '1029732192625-gisom6p85duv00p5pic8d5e9p9gp89qp.apps.googleusercontent.com',
  });  

  return (
    <View style={styles.container}>
      <Text>Hola mundo!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
