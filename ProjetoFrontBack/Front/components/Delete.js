import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import config from '../config/config';
import ModalMsg from './ModalMsg';

const DadoDelete = (props) => {
    //Aviso
    const [msg, setMsg] = useState('');
    const [status, setStatus] = useState('');
    const [aviso, setAviso] = useState(false);
    

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
                setMsg(json.Msg);
                setStatus(json.Status);
                setAviso(true);
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
             <ModalMsg visible={aviso} message={msg} status={status} onClose={() => setAviso(false)}/>
        </View>
    );
};

export default DadoDelete;
