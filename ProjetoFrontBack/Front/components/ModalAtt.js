import { Modal, View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import config from '../config/config';
import React from "react";


export default function EditUserModal({ visible, onClose, userId}) {
    const [name, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

  useEffect(() => {
    if (!visible) return;
    (async () => {
      const res = await fetch(config.PORT + `/user/${userId}`);
      const data = await res.json();
      setNome(data.User.name ?? "");
      setEmail(data.User.email ?? "");
      setPassword(data.User.password ?? "");
    })();
  }, [visible, userId]);

  const onSave = (response) => {
    window.alert(response.Msg);
  }


  const handleSubmit = async () => {
    response = await fetch(config.PORT + `/update/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password}),
    });
    const data = await response.json();
    onSave(data);
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Editar usuário</Text>

         <TextInput
                placeholder="Nome"
                onChangeText={(text) => setNome(text)}
                value={name}
                style={styles.input}
            />

            <TextInput
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                style={styles.input}
            />

            <TextInput
                placeholder="Senha"
                type="password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
                style={styles.input}
            />

          <View style={styles.row}>
            <Button title="Cancelar" onPress={onClose} />
            <Button title="Salvar" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 6,
  },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
});
