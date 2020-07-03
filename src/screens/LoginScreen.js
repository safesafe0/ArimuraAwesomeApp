import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../components/Context';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signin} = useContext(AuthContext);

  function login(email, password, {navigation}) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (User) {
        navigation.navigate('Home');
        alert('Login Success!');
        signin();
        console.log(User.user.uid);
      })
      .catch(function (error) {
        alert(error.message);
      });
  }
  async function signIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '511120746778-khq5dvuhp913ctrc8gvb66f43th5atqd.apps.googleusercontent.com',
    });
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <GoogleSigninButton
              style={styles.googlebutton}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={() => {
                signIn;
              }}
            />
            <TouchableHighlight
              style={styles.button}
              onPress={()=>{login(email, password, {navigation})}}
              underlayColor="#c70f66">
              <Text style={styles.buttonTitle}>ログインする</Text>
            </TouchableHighlight>
            <Text style={{alignSelf: 'center'}}>
              <Text style={styles.lightText}>
                アカウントをお持ちではありませんか？
              </Text>
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('Signup')}>
                Create account
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  logo: {
    alignSelf: 'center',
    // marginTop:10,
    marginBottom: 20,
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
    marginBottom: 20,
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
  },
  googlebutton: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 50,
  },
  lightText: {
    color: '#0008',
  },
  link: {
    color: '#0066c0',
  },
});

export default LoginScreen;
