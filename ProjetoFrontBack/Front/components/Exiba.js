import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import DadoDelete from './Delete';
import EditUserModal from './ModalAtt';
import { useEffect, useState } from 'react';
import config from '../config/config';

const DadoExiba = () => {
    const [campo, setCampos] = useState([]); 
    const [list, setList] = useState(true);
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState('');

    
  
  useEffect(() => {
    const Exibir = async() => {
      await fetch(config.PORT + '/add')
      .then((resp) => resp.json())
      .then((resp) => setCampos(resp)) 
    };
    Exibir();    
  }, [campo]);

    return list == false ? 

        (
            <View style={styles.container}>
                <Button title='Listar Usuários' onPress={() => setList(true)}/>
            </View>

            ) : (

            <View style={styles.container}>
             
            <FlatList
                data={campo}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.idText}>ID: {item._id}</Text>
                        <Text style={styles.nameText}>Nome: {item.name}</Text>
                        <Text style={styles.emailText}>Email: {item.email}</Text>
                        <DadoDelete id = {item._id}/>
                        <Button title="Atualizar" onPress={() => {setVisible(true); setId(item._id)}} />
                    </View>
                )}
            />
            <Button title='Esconder Usuários' onPress={() => setList(false)}/>
            <EditUserModal visible = {visible} onClose={() => setVisible(false)} userId={id}/>
        </View>
            )
        }

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

export default DadoExiba;
