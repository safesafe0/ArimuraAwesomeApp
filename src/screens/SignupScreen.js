import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import auth from '@react-native-firebase/auth'
// import {signup} from '../components/firebase';

function signup(email, password, {navigation}) {
  auth()
  .createUserWithEmailAndPassword(email, password)
  .then(function (user) {
    console.log('Success to Signup');
    navigation.navigate('Signin');
    alert('ユーザー登録が完了しました!');
  })
  .catch(function (error) {
    alert(error.message);
    console.log(error);
  });
}

function SignupScreen({navigation}) {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>メンバー登録</Text>
      <TextInput style={styles.input}
      value={email}
      placeholder="Email Address"
      onChangeText={setEmail}
      />
      <TextInput style={styles.input}
      value={password}
      placeholder="Password"
      onChangeText={setPassword}
      secureTextEntry
      />
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          signup(email,password,{navigation})
        }}
        underlayColor="#c70f66">
        <Text style={styles.buttonTitle}>登録する</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
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

export default SignupScreen;
