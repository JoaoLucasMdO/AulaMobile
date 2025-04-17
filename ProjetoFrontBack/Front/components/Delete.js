import React from "react";
import { View, Text, Pressable } from "react-native";
import config from '../config/config';

const DadoDelete = (props) => {

    const Deletar = async (id) => {
        await fetch(`${config.PORT}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
        .then((resp) => resp.json())
        .then(
            (json) => {
                window.alert(json.Msg);
                window.location.reload();
            });
    };

    return (
        <View>
            <Pressable
                onPress={() => Deletar(props.id)}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    backgroundColor: '#ff0000',
                    borderRadius: 5,
                }}
            >
                <Text style={{ color: '#fff' }}>Excluir</Text>
            </Pressable>
        </View>
    );
};

export default DadoDelete;
