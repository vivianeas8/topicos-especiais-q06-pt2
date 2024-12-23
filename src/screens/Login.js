import * as React from 'react';
import { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Separator from '../components/Separator';

export default function Login({ navigation, route }) {
  const [registeredState, setRegisteredState] = React.useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [haveAccount, setHaveAccount] = React.useState(false);

  async function getUserData() {
    let userData = await SecureStore.getItemAsync('userData');
    if (userData) {
      setEmail(JSON.parse(userData).email);
      setRegisteredState({ ...JSON.parse(userData) });
      setHaveAccount(true);
    } else {
      setHaveAccount(false);
    }
  }

  React.useEffect(() => {
    getUserData();
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  function handleLogin() {
    if (email.length !== 0 && password.length !== 0) {
      if (
        email === registeredState.email &&
        password === registeredState.password
      ) {
        setPassword('');
        global.nameLogin = registeredState.name;
        navigation.replace('BottomStack');
      } else {
        Alert.alert(
          'Erro ao tentar efetuar o login:',
          'Informe ○ e-mail e a senha corretos'
        );
      }
    } else {
      Alert.alert(
        'Erro ao tentar efetuar o login:',
        'Informe o e-mail e a senha corretos!'
      );
    }
  }

  function handleRegister() {
    setEmail('');
    setPassword('');
    navigation.navigate('Register');
  }

  function handleDeleteRegister() {
    SecureStore.deleteItemAsync('userData');
  }

  const passwordInputRef = useRef();

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Secure Store App</Text>
      <TextInput
        style={styles.input}
        defaultValue={email}
        value={email}
        onChangeText={(value) => setEmail(value)}
        placeholder={'E-mail'}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
        enterKeyHint="next"
        onSubmitEditing={() => passwordInputRef.current.focus()}
      />
      <TextInput
        ref={passwordInputRef}
        style={styles.input}
        value={password}
        onChangeText={(value) => setPassword(value)}
        placeholder={'Senha'}
        enterKeyHint="go"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <Separator marginVertical={10} />
      {!haveAccount ? (
        <>
          <Text style={styles.textSimple}>
            É a primeira vez aqui e ainda não se cadastrou?
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastre-se</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.textSimple}>Já possuo uma conta, porém...</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Alert.alert(
                'Informação:',
                `A sua senha foi enviada para email cadastrado: ${registeredState.email} ${registeredState.password}`
              )
            }>
            <Text style={styles.buttonText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </>
      )}
      <Separator marginVertical={20} />

      <Text style={styles.textSimpleJustify}>
        Este aplicativo faz uso de armazenamento local com SecureStore e fará
        também com AsyncStorage
      </Text>

      <Separator marginVertical={5} />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleDeleteRegister}>
        <Text style={styles.saveButtonText}>Deletar chave</Text>
      </TouchableOpacity>
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
  titleText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#730000',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E37D00',
    padding: 8,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#E37D00',
    padding: 8,
    borderRadius: 5,
  },
  saveButtonText: {
    fontSize: 16,
    fontHeight: 'bold',
    color: '#730000',
    textAlign: 'center',
  },
  loginButton: {
    width: '40%',
    height: 36,
    backgroundColor: '#E37D00',
    padding: 5,
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#730000',
    textAlign: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#730000',
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#730000',
    borderRadius: 5,
    marginBottom: 10,
  },
  textSimple: { color: '#730000' },
  textSimpleJustify: {
    color: '#730000',
    width: '80%',
    textAlign: 'center',
  },
});
