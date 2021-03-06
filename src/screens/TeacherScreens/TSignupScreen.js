import React, {useState, useContext} from 'react';
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
import {CheckBox, Body, ListItem} from 'native-base';
import {TGradeItem} from '../../elements/PickerItem';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../../components/Context';
import firestore from '@react-native-firebase/firestore';

function TSignupScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [grade, setGrade] = useState('');
  const [university, setUniversity] = useState('');
  const [major,setMajor] = useState('');
  const [course,setCourse] = useState('');
  const {signin} = useContext(AuthContext);
  const [check, setCheck] = useState(false);
  function updateGrade(state) {
    setGrade(state);
  }
  function register(user) {
    firestore()
      .collection('public')
      .doc('v1')
      .collection('users')
      .doc(user.uid)
      .set({
        nickname: nickname,
        grade: grade,
        university: university,
        major:major,
        course:course,
        createdAt: new Date(),
        tors:'t',
        bio:'よろしくお願いします！'
      })
      .then(() => {
        signin();
        alert('ユーザー登録が完了しました!');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function signup() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (result) {
        console.log('Success to Signup');
        console.log(result.user.uid);
        register(result.user);
      })
      .catch(function (error) {
        alert(error.message);
        console.log(error);
      });
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require('../../images/Q-LINE-icon.png')}
            />
            <Text style={styles.title}>先生として登録</Text>
            <TextInput
              style={styles.input}
              value={nickname}
              placeholder="ニックネーム"
              onChangeText={setNickname}
            />
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
            <TGradeItem updateGrade={updateGrade} />
            <TextInput
              style={styles.input}
              value={university}
              placeholder="大学名"
              onChangeText={setUniversity}
            />
            <TextInput
              style={styles.input}
              value={major}
              placeholder="学部名"
              onChangeText={setMajor}
            />
            <TextInput
              style={styles.input}
              value={course}
              placeholder="学科名"
              onChangeText={setCourse}
            />
            <ListItem>
              <CheckBox checked={check} onPress={() => setCheck(!check)} />
              <Body style={{marginLeft: 10, marginBottom: 10}}>
                <Text>
                  <Text
                    style={styles.link}
                    onPress={() => navigation.navigate('Home')}>
                    利用規約
                  </Text>
                  <Text style={styles.lightText}>と</Text>
                  <Text
                    style={styles.link}
                    onPress={() => navigation.navigate('Signup')}>
                    プライバシーポリシー
                  </Text>
                  <Text style={styles.lightText}>に同意する</Text>
                </Text>
              </Body>
            </ListItem>
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                signup();
              }}
              underlayColor="#c70f66">
              <Text style={styles.buttonTitle}>登録する</Text>
            </TouchableHighlight>
            <Text style={{alignSelf: 'center', marginTop: 30}}>
              <Text style={styles.lightText}>
                既にアカウントをお持ちですか？
              </Text>
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('Login')}>
                Sign In
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
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
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
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
  },
  lightText: {
    color: '#0008',
  },
  link: {
    color: '#0066c0',
  },
});

export default TSignupScreen;
