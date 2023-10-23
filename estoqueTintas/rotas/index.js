import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

/*----- Componentes -----*/
import Login from "../src/login";
import Home from "../src/home";
import CadastroProduto from "../src/cadastroProduto";
import Produtos from "../src/produtos";
import EditaProdutos from "../src/editaProdutos";

export function Rotas() {
    const Stack = createNativeStackNavigator();
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false, }} />
            <Stack.Screen name="Cadastro de Produto" component={CadastroProduto} />
            <Stack.Screen name="Produtos" component={Produtos} />
            <Stack.Screen name="Edição do Produto" component={EditaProdutos} />
        </Stack.Navigator>
    </NavigationContainer>
}