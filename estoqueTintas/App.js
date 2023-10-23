
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';

import { DadosProvider } from './src/contexts/dadosContext';
/*----- Rotas -----*/
import { Rotas } from './rotas';


export default function App() {

  return (
    
      <DadosProvider>
        <StatusBar backgroundColor={'black'} />
        <View style={{height:50, alignItems:'center', justifyContent:'center', borderBottomWidth:2}}>
          <Text>LOGO EMPRESA E NOME</Text>
        </View>
        <Rotas />
      </DadosProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
