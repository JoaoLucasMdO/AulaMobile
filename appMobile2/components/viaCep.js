import { useState } from 'react';
import { Alert, Text, TextInput } from 'react-native';
import { css } from './css/style';
import { Button } from 'react-native-paper';
import Loading from './loading';

export default ViaCep = () => {
  const [cep, setCep] = useState('');
  let [dados, setDados] = useState({});
  let [isLoading, setLoading] = useState(false)

  const buscaCep = (arg) => {
    setLoading(true);

    let url = `https://viacep.com.br/ws/${arg}/json/`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((xjson) => {
        setDados(xjson);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Ocorreu um erro: ' + error)
      });
      setTimeout(() => {
        setLoading(false);
      }, 1500);

  };

  const limpaCep = () => {
    setDados({});
  }

  return (
    <>
      <TextInput
        keyboardType="number-pad"
        placeholder="Digite o cep"
        onChangeText={(value) => {
          setCep(value);
        }}
        style={css.text}
      />

    <Button  mode="contained" onPress={() => {
          buscaCep(cep);
        }}>
    Buscar Cep
  </Button>

  <Button buttonColor='#aa1107' mode="contained" onPress={() => {
          limpaCep(cep);
        }}>
   Limpar Dados
  </Button>
        {isLoading ? (

            <Loading />

        ): (

    <Text style={css.text}>
        Logradouro: {dados?.logradouro} {'\n'}
        Bairro: {dados?.bairro} {'\n'}
        Cidade: {dados?.localidade} {'\n'}
        Estado: {dados?.estado} {'\n'}
        UF: {dados?.uf} {'\n'}
        Região: {dados?.regiao}
      </Text>

        )}

    </>
  );
};