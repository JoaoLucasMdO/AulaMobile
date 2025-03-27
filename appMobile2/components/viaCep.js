import { useState } from 'react';
import { ScrollView, Button, View, ActivityIndicator } from 'react-native';
import { List, TextInput } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { css } from './css/style';
import CustomModal from './modal';

export default function ViaCep() {
  const [cep, setCep] = useState('');
  const [dados, setDados] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);
  const [isVisible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  const buscaCep = (arg) => {
    setIsLoading(true); // Inicia o loading

    let url = `https://viacep.com.br/ws/${arg}/json/`;

    fetch(url)
      .then((response) => response.json())
      .then((xjson) => {
        setDados(xjson);
        setSelectedValue(xjson.uf);
      })
      .catch(() => {
        setMessage('Ocorreu um erro ao buscar o CEP.');
        setVisible(true);
        setDados({});
      })
      .finally(() => {
        setIsLoading(false); // Finaliza o loading
      });
  };

  const handleSubmit = () => {
    if (!dados[0] || !nome || !email) {
      setMessage('Preencha todos os campos!');
      setVisible(true);
    } else {
      setMessage('Cadastrado com sucesso!');
      setVisible(true);
    }
  };

  return (
    <View style={css.container}>
      <CustomModal visible={isVisible} message={message} onClose={() => setVisible(false)} />

      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>

        <TextInput
          placeholder="Nome"
          style={css.textInput}
          onChangeText={setNome}
        />

        <TextInput
          placeholder="Email"
          style={css.textInput}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Digite o CEP"
          onChangeText={setCep}
          onEndEditing={() => buscaCep(cep)}
          style={css.textInput}
        />

        {isLoading ? (
          <ActivityIndicator size="large" color="#6200EE" style={{ marginVertical: 20 }} />
        ) : (
          <>
            <TextInput label="Estado" value={dados.uf || ''} style={css.textInput} editable={false} />
            <TextInput label="Logradouro" value={dados.logradouro || ''} style={css.textInput} editable={false} />
            <TextInput label="Bairro" value={dados.bairro || ''} style={css.textInput} editable={false} />
            <TextInput label="Cidade" value={dados.localidade || ''} style={css.textInput} editable={false} />
          </>
        )}

        <List.Section title="Estado" style={css.listSection}>
          <List.Accordion title={selectedValue ?? 'Selecione o Estado'}>
            <List.Item title="MG" onPress={() => setSelectedValue('MG')} />
            <List.Item title="AC" onPress={() => setSelectedValue('AC')} />
            <List.Item title="RJ" onPress={() => setSelectedValue('RJ')} />
          </List.Accordion>
        </List.Section>

        <Button title="Cadastrar" onPress={handleSubmit} />

        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}
