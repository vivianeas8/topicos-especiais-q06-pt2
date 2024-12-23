import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomImage from '../components/CustomImage';
import Separator from '../components/Separator';

export default function Home() {
  async function handleProductsDelete() {
    try {
      await AsyncStorage.clear();
      Alert.alert(
        'Cadastro de Produtos:',
        'Todos os produtos foram excluídos com sucesso!'
      );
    } catch (error) {
      Alert.alert('Erro na exclusão de produtos:', error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView vertical>
        <Text>Tela Home</Text>
        <Text>Olá {global.nameLogin}, seja bem-vindo!</Text>

        <CustomImage
          fromWeb={false}
          image={require('../../assets/coldplay-albums.jpg')}
          width={213}
          height={213}
        />

        <CustomImage
          fromWeb={true}
          image={'https://media.pitchfork.com/photos/60f6cf8ec64eabe66d59ccf1/master/pass/Coldplay.jpeg'}
          width={213}
          height={213}
        />

        <Separator marginVertical={20} />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleProductsDelete}>
          <Text style={styles.saveButtonText}>Deletar Todos os Produtos</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC300',
  },
  saveButton: {
    height: 36,
    backgroundColor: '#E37D00',
    padding: 5,
    borderRadius: 5,
  },
  saveButtonText: {
    fontSize: 18,
    fontHeight: 'bold',
    color: '#730000',
    textAlign: 'center',
  },
});
