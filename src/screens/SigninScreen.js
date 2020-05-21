import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

function SigninScreen({navigation}) {
  return (
    <View>
      <TouchableHighlight
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
        underlayColor="#1e90ff">
        <Text style={styles.buttonTitle}>ログイン</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}
        underlayColor="#1e90ff">
        <Text style={styles.buttonTitle}>新規登録</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00bfff',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SigninScreen;
