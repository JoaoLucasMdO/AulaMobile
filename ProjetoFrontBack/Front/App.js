import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

  const Exibir = async() => {
    await fetch('http://localhost:3000/add')
    .then((resp) => resp.json())
    .then((resp) => console.log(resp))
  };


  const AddUser = async () => {
    await fetch('http://localhost:3000/add', {
      method: 'POST',
      body:JSON.stringify({
        name: 'Jão',
        email: 'jao@email.com'
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  };

  const Atualizar = async (id) => {
    await fetch(`http://localhost:3000/update/${id}`, {
      method:'PUT',
      body: JSON.stringify({
        name:'ABC',
        email:'abc@email.com'
      }),
      headers:{
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
    .then((resp) => resp.json())
    .then((json) => console.log(json))
  };

  const Deletar = async (id) => {
    await fetch(`http://localhost:3000/delete/${id}`, {
      method:'DELETE',
      headers:{
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
    .then((resp) => resp.json())
    .then((json) => console.log(json))
  };


  return (
    <View style={styles.container}>
      <Text>Teste</Text>
      <Button onPress={Exibir} title={'Botão Exibir'}/>
      <Button onPress={AddUser} title={'Botão POST'}/>
      <Button onPress={() => Atualizar('67eddaebb374b556f6172bea')} title={'Botão Atualizar'}/>
      <Button onPress={() => Deletar('67eddaebb374b556f6172bea')} title={'Botão Deletar'}/>
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
