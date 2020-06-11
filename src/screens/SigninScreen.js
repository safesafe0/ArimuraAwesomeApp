import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';

function signOut() {
  auth().signOut();
  console.log('User LogOut!');
}
function SigninScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../images/Q-LINE.png')} />
      <View style={styles.div}>
        <Text style={styles.text}>すぐに質問・すぐ解決</Text>
        <Text style={styles.text}>志望校の現役大学生にアドバイスを貰おう</Text>
      </View>
      <TouchableHighlight
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}
        underlayColor="#1e90ff">
        <Text style={styles.buttonTitle}>新規登録</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
        underlayColor="#1e90ff">
        <Text style={styles.buttonTitle}>ログイン</Text>
      </TouchableHighlight>
      <View style={styles.div}>
        <Text>
          <Text style={styles.lightText}>講師用アカウント </Text>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Login')}>
            Sign in
          </Text>
        </Text>
      </View>
      <Button title="signOut" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 50,
  },
  div: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
  },
  button: {
    backgroundColor: '#00bfff',
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 16,
  },
  lightText: {
    color: '#0008',
  },
  link: {
    color: '#0066c0',
  },
});

export default SigninScreen;
