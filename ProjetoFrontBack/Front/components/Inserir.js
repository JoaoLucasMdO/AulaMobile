import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import config from '../config/config';
import ModalMsg from './ModalMsg';

const DadoInserir = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Aviso
    const [msg, setMsg] = useState('');
    const [status, setStatus] = useState('');
    const [aviso, setAviso] = useState(false);


    const AddUser = async () => {
        await fetch(config.PORT + '/add', {
          method: 'POST',
          body:JSON.stringify({
            name: nome,
            email: email,
            password: password
          }),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
        .then((resp) => resp.json())
        .then((json) => {
            setMsg(json.Msg);
            setStatus(json.Status);
            setAviso(true);
        })
      };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Usuários</Text>
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

            <TextInput
                placeholder="Senha"
                type="password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
            />

            <Button title="Enviar" onPress={() => {AddUser()}} />
            <ModalMsg visible={aviso} message={msg} status={status} onClose={() => setAviso(false)}/>
        </View>
    );
};

export const styles = StyleSheet.create({
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
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 24,
        textAlign: "center",
        color: "#0F172A",
      },
});

export default DadoInserir;
