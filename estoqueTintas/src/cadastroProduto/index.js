import { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Button, TextInput } from "react-native-paper";

/*----- Imagens -----*/
import FundoDeTela from '../../assets/fundosDeTela/golpes-de-tinta-azul-e-marrom.jpg'

export default function CadastroProduto() {
    const [nomeProduto, setNomeProduto] = useState('')
    const [sku, setSku] = useState('')
    const [fornecedor, setFornecedor] = useState('')
    return <ImageBackground source={FundoDeTela} style={styles.container}>
        <View style={styles.fundoInputs}>
            <View style={styles.containerInputs}>
                <TextInput
                    value={nomeProduto}
                    onChangeText={setNomeProduto}
                    keyboardType='default'
                    placeholder="Nome do Produto"
                    style={styles.inputs}
                />
                <TextInput
                    value={sku}
                    onChangeText={setSku}
                    keyboardType='decimal-pad'
                    placeholder="SKU"
                    style={styles.inputs}
                />
                <TextInput
                    value={fornecedor}
                    onChangeText={setFornecedor}
                    keyboardType='default'
                    placeholder="Fornecedor"
                    style={styles.inputs}
                />
                <Button style={styles.botaoCadastrar} textColor="white" labelStyle={{ fontSize: 16, fontWeight: '700', alignSelf: 'baseline' }} >CADASTRAR</Button>
            </View>
        </View>
    </ImageBackground>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    fundoInputs:{
        backgroundColor:'rgba(0,0,0,0.8)', 
        height:300, 
        borderRadius:10, 
        width:'90%'
    },
    containerInputs:{
        justifyContent: "center", 
        margin: 20
    },
    inputs:{
        backgroundColor: 'white', 
        marginBottom: 15
    },
    botaoCadastrar:{
        backgroundColor: '#875628', 
        width: '50%', 
        alignSelf: 'center', 
        borderWidth:2, 
        borderColor:'white',
        alignItems: "center", 
        borderRadius: 5 
    }
});