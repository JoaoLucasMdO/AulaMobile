import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, ScrollView  } from 'react-native';
import { useEffect, useState } from 'react';
import DadoExiba from './components/Exiba';
import DadoInserir from './components/Inserir';
import config from './config/config';


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


  return (
    <View style={styles.container}>
      <ScrollView>
      <DadoInserir />
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
