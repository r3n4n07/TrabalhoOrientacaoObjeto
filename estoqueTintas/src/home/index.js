import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import LinearGradient from 'react-native-linear-gradient';

/*----- Imagens -----*/
import FundoDeTela from '../../assets/fundosDeTela/golpes-de-tinta-azul-e-marrom.jpg'

/*----- Contexts -----*/
import { DadosContext } from '../contexts/dadosContext'

export default function Home() {
    const navigation = useNavigation()


    return <ImageBackground source={FundoDeTela} resizeMode='cover' style={styles.container}>
        <View style={styles.containerMenu}>
            <View style={styles.containerNomeEmpresa}>
                <Text style={styles.textoNomeEmpresa}>NOME DA EMPRESA</Text>
            </View>
            <TouchableOpacity style={styles.containerOpcoes} onPress={() => navigation.navigate('Cadastro de Produto')}>
                <View style={styles.containerTituloEIcone}>
                    <IconButton
                        icon={'pail-plus'}
                        iconColor="black"
                        size={30}
                    />
                    <Text style={styles.tituloOpcoes}>CADASTRAR PRODUTO</Text>
                </View>
                <IconButton
                    icon={'chevron-right'}
                    iconColor="black"
                    size={30}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerOpcoes} onPress={() => navigation.navigate('Produtos')}>
                <View style={styles.containerTituloEIcone}>
                    <IconButton
                        icon={'pail'}
                        iconColor="black"
                        size={30}
                    />
                    <Text style={styles.tituloOpcoes}>PRODUTOS</Text>
                </View>
                <IconButton
                    icon={'chevron-right'}
                    iconColor="black"
                    size={30}
                />
            </TouchableOpacity>
        </View>


    </ImageBackground>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    containerMenu: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        height: 700,
        borderRadius: 10,
        width: '90%'
    },
    containerNomeEmpresa: {
        backgroundColor: '#f0f0ed',
        borderRadius: 6,
        padding: 5,
        marginTop: 20,
        marginBottom: 10,
        width: '70%',
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomColor: "#279db9",
        borderTopColor: "#875628",
        alignSelf: 'center',
        borderWidth: 5,
        alignItems: 'center'
    },
    textoNomeEmpresa: {
        fontSize: 20,
        fontWeight: '700'
    },
    containerOpcoes: {
        backgroundColor: 'rgba(255,255,255, 1)',
        margin: 20,
        marginBottom: 5,
        height: 60,
        borderRadius: 10,
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderColor: '#279db9',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    },
    containerTituloEIcone: {
        flexDirection: 'row',
        alignItems: "center"
    },
    tituloOpcoes: {
        color: 'black',
        fontWeight: '700',
        fontSize: 17
    }
})