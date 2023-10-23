import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Alert, TouchableOpacity } from "react-native";
import { Button, TextInput } from 'react-native-paper'


/*----- Imagens -----*/
import FundoDeTela from '../../assets/fundosDeTela/golpes-de-tinta-azul-e-marrom.jpg'

/*----- Contexts -----*/
import { DadosContext } from "../contexts/dadosContext";

export default function Login() {
    const navigation = useNavigation()
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const {urlApi} = useContext(DadosContext)

    // Função que checa se existe alguma caractere especial, para evitar sql Injection
    const checaCaracteres = () => {
        const regex = /^(?! )(?!$)[A-Za-z0-9 ]+$/
        
        if(regex.test(usuario) && regex.test(senha)){
            return 'ok'
        }else{
            Alert.alert("Atenção", "Usuário ou senha estão vázios ou contém caracteres indesejados", [{text:'Ok'}])
        }

    }

    //função que faz o login
    const logar = async () => {
        try {
            if (checaCaracteres() === 'ok'){
                navigation.replace('Home')
            }
        } catch (error) {
            Alert.alert("Error", `Não foi possível logar por: ${error.message}`, [{ text: 'ok' }])
        }
    }

    return <ImageBackground source={FundoDeTela} resizeMode='cover' style={styles.container}>
        <View style={styles.containerNomeEmpresa}>
            <Text style={styles.textoNomeEmpresa}>NOME DA EMPRESA</Text>
        </View>
        <TextInput
            value={usuario}
            onChangeText={setUsuario}
            keyboardType='default'
            mode='outlined'
            placeholder="Usuário"
            style={styles.inputs}
            textColor="white"
            outlineColor="#279db9"
            activeOutlineColor="#279db9"
            placeholderTextColor={'white'}
        />
        <TextInput
            value={senha}
            onChangeText={setSenha}
            keyboardType='default'
            mode='outlined'
            placeholder="Senha"
            style={styles.inputs}
            textColor="white"
            outlineColor="#875628"
            activeOutlineColor="#875628"
            placeholderTextColor={'white'}
            color
        />
        <TouchableOpacity style={styles.botaoEntrar} onPress={() => logar()}>
            <Text style={{fontSize:18, fontWeight:'700', color:'#ffffff'}}>Entrar</Text>
        </TouchableOpacity>
       
    </ImageBackground>

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    containerNomeEmpresa: {
        backgroundColor: '#ffffff',
        borderRadius: 6,
        padding: 5,
        marginBottom: 50
    },
    textoNomeEmpresa: {
        fontSize: 20,
        fontWeight: '700'
    },
    inputs: {
        width: '90%',
        marginBottom: 15,
        backgroundColor: 'black',
        color: 'white'
    },
    botaoEntrar: {
        backgroundColor: '#C70039',
        marginTop: 10,
        width: '30%',
        borderWidth: 2,
        borderColor: '#000000',
        color: 'white',
        height:45,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    }
})
