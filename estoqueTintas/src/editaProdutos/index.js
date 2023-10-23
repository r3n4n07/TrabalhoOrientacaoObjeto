import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";

/*----- Imagens -----*/
import fundoDeTela from '../../assets/fundosDeTela/golpes-de-tinta-azul-e-marrom.jpg'

export default function EditaProdutos() {
    const navigation = useNavigation()
    const [nomeProduto, setNomeProduto] = useState('')
    const [sku, setSku] = useState('')
    const [fornecedor, setFornecedor] = useState('')
    const route = useRoute()

    useEffect(() => {
        setNomeProduto(route.params[0])
        setSku(route.params[1])
        setFornecedor(route.params[2])
    }, [])


    const editarProduto = () => {
        try {
            navigation.goBack()
        } catch (error) {
            Alert.alert("Error", "Não foi possível salvar os dados", [{ text: 'Ok' }])
        }
    }

    return <ImageBackground source={fundoDeTela} style={{ flex: 1 }}>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center' }}>
            <View style={{ width: '95%' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.titulosTelaDeEdicao}>PRODUTO</Text>
                </View>
                <TextInput
                    value={nomeProduto}
                    onChangeText={setNomeProduto}
                    keyboardType='default'
                    style={styles.inputsTelaDeEdicao}
                    textColor="black"

                />
            </View>

            <View style={{ width: '95%' }}>
                <View style={{ flexDirection: 'row' }} >
                    <Text style={styles.titulosTelaDeEdicao}>SKU</Text>
                </View>

                <TextInput
                    value={sku}
                    onChangeText={setSku}
                    keyboardType='decimal-pad'
                    style={styles.inputsTelaDeEdicao}
                    textColor="black"
                />
            </View>

            <View style={{ width: '95%' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.titulosTelaDeEdicao}>FORNECEDOR</Text>
                </View>
                <TextInput
                    value={fornecedor}
                    onChangeText={setFornecedor}
                    keyboardType='default'
                    style={styles.inputsTelaDeEdicao}
                    textColor="black"

                />
            </View>
            <TouchableOpacity style={styles.botaoSalvar} onPress={()=> editarProduto()}>
                <Text style={styles.textoBotao}>SALVAR</Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>

}

const styles = StyleSheet.create({
    titulosTelaDeEdicao: {
        padding: 2,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 6,
        fontWeight: '700',
        fontSize: 17,
        backgroundColor: '#FCF3CF'
    },
    inputsTelaDeEdicao: {
        backgroundColor: '#EAEDED',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#8A3C32',
        fontSize: 16,
        fontWeight: '700'
    },
    botaoSalvar: {
        backgroundColor: '#C70039',
        marginTop: 10,
        width: '30%',
        borderWidth: 2,
        borderColor: '#000000',
        height: 45,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    textoBotao: {
        color: 'white',
        fontWeight: '700'
    }
})