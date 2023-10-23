import { View, Text, FlatList, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'

/*----- Imagens -----*/
import fundoDeTela from '../../assets/fundosDeTela/golpes-de-tinta-azul-e-marrom.jpg'
import { IconButton, Searchbar, TextInput } from 'react-native-paper'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Produtos() {
    const navigation = useNavigation()
    const produtos = [
        {
            nome: 'tinta 1 oowjdiwjiwjidjiwjdiwjijisji2jsi2jisiji',
            sku: '123',
            fornecedor: 'empresa 1'
        },
        {
            nome: 'tinta 2',
            sku: '1234',
            fornecedor: 'empresa 2'
        }
        , {
            nome: 'tinta 3',
            sku: '12345',
            fornecedor: 'empresa 3'
        },
        {
            nome: 'tinta 4',
            sku: '123456',
            fornecedor: 'empresa 4'
        }
    ]

    const atribuiValores = (nome, numeroSku, NomeFornecedor) => {
        setNomeProduto(nome)
        setSku(numeroSku)
        setFornecedor(NomeFornecedor)
        setMostrar(true)
        TelaDeEdicao()
    }

    const TelaDeEdicao = () => {

        return <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center' }}>
            <View style={{ width: '95%' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.titulosTelaDeEdicao}>PRODUTO</Text>
                </View>
                <TextInput
                    value={nomeProduto}
                    onChangeText={setNomeProduto}
                    keyboardType='default'
                    style={styles.inputsTelaDeEdicao}
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
                />
            </View>

        </View>
    }

    return <ImageBackground source={fundoDeTela} style={{ flex: 1 }}>
        <Searchbar
            keyboardType='default'
            placeholder='Pesquise o produto aqui'
            style={{ margin: 5, borderWidth: 2, borderRadius: 5, backgroundColor: '#F9E79F' }}
            iconColor='#279db9'
            placeholderTextColor={'black'}
            inputStyle={{ color: 'black' }}
        />
        <FlatList
            data={produtos}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.containerOpcoes}>
                    <View style={styles.containerInformacoes}>
                        <Text style={styles.titulos}>Nome: </Text>
                        <Text style={styles.informacoes}>{item?.nome && item.nome.length > 40 ? item.nome.slice(0, 37).concat('...') : item?.nome}</Text>
                    </View>
                    <View style={styles.containerInformacoes}>
                        <Text style={styles.titulos}>SKU: </Text>
                        <Text style={styles.informacoes}>{item?.sku && item.sku.length > 40 ? item.sku.slice(0, 37).concat('...') : item?.sku}</Text>
                    </View>
                    <View style={styles.containerInformacoes}>
                        <Text style={styles.titulos}>Fornecedor: </Text>
                        <Text style={styles.informacoes}>{item?.fornecedor && item.fornecedor.length > 40 ? item?.fornecedor.slice(0, 37).concat('...') : item?.fornecedor}</Text>
                    </View>
                    <IconButton
                        icon={'eye'}
                        style={{ position: 'absolute', left: 350, top: 20 }}
                        onPress={() => navigation.navigate( 'Edição do Produto' ,[item.nome, item.sku, item.fornecedor])}
                    />
                </TouchableOpacity>
            )}
        />
    </ImageBackground>
}

const styles = StyleSheet.create({
    containerOpcoes: {
        backgroundColor: '#D6EAF8',
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderBottomRightRadius: 0
    },
    containerInformacoes: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titulos: {
        fontSize: 16,
        fontWeight: '700',
        color: 'black',
        backgroundColor: '#FCF3CF',
        margin: 3,
        borderRadius: 5,
        padding: 1
    },
    informacoes: {
        fontSize: 15,
        fontWeight: '400',
        borderBottomWidth: 2,

    },
    
})