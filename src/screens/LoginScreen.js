import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth'
// import { GoogleSignin,GoogleSigninButton } from '@react-native-community/google-signin';

// GoogleSignin.configure({
//   webClientId: '511120746778-khq5dvuhp913ctrc8gvb66f43th5atqd.apps.googleusercontent.com',
// });

function login(email, password, {navigation}) {
  auth()
  .signInWithEmailAndPassword(email, password)
  .then(function (user) {
    navigation.navigate('Signin');
    alert('Login Success!');
  })
  .catch(function (error) {
    alert(error.message);
  });
}

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image 
        style={styles.logo}
        source={require('../images/Q-LINE-icon.png')}
      />
      <Text style={styles.title}>ログイン</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email Address"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          login(email, password,{navigation});
        }}
        underlayColor="#c70f66">
        <Text style={styles.buttonTitle}>ログインする</Text>
      </TouchableHighlight>
      {/* <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this._signIn}
        disabled={this.state.isSigninInProgress} 
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  logo:{
    alignSelf: 'center',
    // marginTop:10,
    marginBottom:20,
  },
  input: {
    backgroundColor: '#eee',
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#e31676',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LoginScreen;
