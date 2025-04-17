import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import DadoExiba from './components/Exiba';
import config from './config/config';
import { ScrollView } from 'react-native-web';


export default function App() {

  const [campos, setCampos] = useState([]); 

  useEffect(() => {
    const Exibir = async() => {
      await fetch(config.PORT + '/add')
      .then((resp) => resp.json())
      .then((resp) => setCampos(resp)) 
    };

    Exibir();
    
  }, []);

  const AddUser = async () => {
    await fetch(config.PORT + '/add', {
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
    await fetch(`${config.PORT}/${id}`, {
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

  return (
    <View style={styles.container}>
      <ScrollView>
      <Button onPress={AddUser} title={'Botão POST'}/>
      <Button onPress={() => Atualizar('67eddaebb374b556f6172bea')} title={'Botão Atualizar'}/>
      

      <DadoExiba campo = {campos} />

      <StatusBar style="auto" />
      </ScrollView>
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
