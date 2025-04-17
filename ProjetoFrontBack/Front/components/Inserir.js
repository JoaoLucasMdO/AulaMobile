import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import config from '../config/config';

const DadoInserir = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const AddUser = async () => {
        await fetch(config.PORT + '/add', {
          method: 'POST',
          body:JSON.stringify({
            name: nome,
            email: email
          }),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
        .then((resp) => resp.json())
        .then((json) => {
            window.alert(json.Msg);
            window.location.reload();
        })
      };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nome"
                onChangeText={(text) => setNome(text)}
                style={styles.input}
            />

            <TextInput
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
            />

            <Button title="Enviar" onPress={() => {AddUser()}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#fff',
        fontSize: 16,
    },
});

export default DadoInserir;
