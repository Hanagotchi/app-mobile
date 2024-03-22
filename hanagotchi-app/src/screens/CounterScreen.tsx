import { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Button from '../components/Button';

const CounterScreen: React.FC = () => {
  const [count, setCount] = useState<number>(10);

  return (
    <View style={style.container}>
        <Text style={style.title}>{count}</Text>
        <Button
          label="Incrementar"
          color='primary'
          textColor='light'
          size='small'
          onPress= {() => setCount((n) => n+1)}
          onLongPress= {() => setCount(0)}
          style={style.button}
        />
        <Text style={style.description}>¡Mantenme presionado para reiniciar el contador!</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#F7EAC8"
  },
  title: {
    fontSize: 45,
    fontFamily: "IBMPlexMono_600SemiBold",
    textAlign: 'center',
    color: '#4F4C4F',
    padding: 20
  },
  description: {
    fontSize: 20,
    fontFamily: "IBMPlexMono_600SemiBold",
    textAlign: 'center',
    color: '#4F4C4F',
    padding: 20,
    width: "75%"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: "50%"
  },
})

export default CounterScreen
