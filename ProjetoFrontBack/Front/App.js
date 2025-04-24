import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, ScrollView  } from 'react-native';
import DadoExiba from './components/Exiba';
import DadoInserir from './components/Inserir';



export default function App() {
  
  return (
    <View style={styles.container}>
      <ScrollView>
      <DadoInserir />
      <DadoExiba />
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
