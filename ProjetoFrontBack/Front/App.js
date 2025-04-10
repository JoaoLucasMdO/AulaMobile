import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

  const addUser= () => {
    fetch('http://localhost:3000/add', {
      method: 'POST',
      body:JSON.stringify({
        name: 'Jão',
        email: 'jao@email.com'
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text>Teste</Text>
      <Button onPress={addUser} title={'Botão POST'}/>
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
