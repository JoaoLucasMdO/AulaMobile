import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Dialog } from 'react-native';
import { useEffect, useState } from 'react';
import config from '../config/config';

const DadoAtualiza = ({ id, visible }) => {
    const [campos, setCampos] = useState([]);

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const response = await fetch(`${config.PORT}/`);
                const data = await response.json();
                setCampos(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(id);
    }, [id]);


    return (
        <View>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Atualizar Usuário</Dialog.Title>
          <Dialog.Description>
          <FlatList
                data={campos}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.idText}>ID: {item._id}</Text>
                        <Text style={styles.nameText}>Nome: {item.name}</Text>
                        <Text style={styles.emailText}>Email: {item.email}</Text>
                    </View>
                )}
            />
          </Dialog.Description>
          <Dialog.Button label="Atualizar" />
          <Dialog.Button label="Cancelar" />
        </Dialog.Container>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        flex: 1,
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    idText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    nameText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 2,
    },
    emailText: {
        fontSize: 14,
        color: '#777',
    },
});

export default DadoAtualiza;
