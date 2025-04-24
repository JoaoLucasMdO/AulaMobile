import { Modal, View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import config from '../config/config';
import React from "react";

export default function EditUserModal({ visible, onClose, message, status}) {


  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
            <Text style={styles.title}>Status: {status}</Text>
            <Text>{message}</Text>
            <View style={styles.row}>
                <Button title="Fechar" onPress={onClose} />
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
