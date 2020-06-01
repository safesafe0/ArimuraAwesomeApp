import React, {useState} from 'react';
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
import {
  CheckBox,
  Body,
  Picker,
  ListItem,
} from 'native-base';
import {GradeItem} from '../elements/PickerItem';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

async function register(uid,nickname,grade,firstSchool) {
  await firestore()
    .collection('public')
    .doc('v1')
    .collection('users')
    .doc(uid)
    .set({
      nickname: nickname,
      grade: grade,
      firstSchool:firstSchool,
      createdAt:new Date(),
    })
    .then(function (docRef) {
      console.log(docRef.id);
    })
    .catch(function (error) {
      console.log(error);
    });
}

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
  const [nickname,setNickname]=useState('');const [grade,setGrade]=useState('');
  function updateGrade(state){
    setGrade(state);
  }
  const [firstSchool,setFirstSchool]=useState('');
  const [check,setCheck]=useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS==='ios'?'padding':null}
      style={{flex:1}}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Image 
              style={styles.logo}
              source={require('../images/Q-LINE-icon.png')}
            />
            <Text style={styles.title}>メンバー登録</Text>
            <TextInput style={styles.input}
            value={nickname}
            placeholder="ニックネーム"
            onChangeText={setNickname}
            />
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
            <GradeItem updateGrade={updateGrade}/>
            <TextInput style={styles.input}
            value={firstSchool}
            placeholder="志望校"
            onChangeText={setFirstSchool}
            />
            <ListItem>
              <CheckBox 
              checked={check}
              onPress={()=>setCheck(!check)}/>
              <Body style={{marginLeft:10,
              marginBottom:10,}}>
                <Text>
                  <Text 
                    style={styles.link}
                    onPress={()=>navigation.navigate('Home')}
                  >利用規約</Text>
                  <Text 
                    style={styles.lightText}
                  >と</Text>
                  <Text 
                    style={styles.link}
                    onPress={()=>navigation.navigate('Signup')}
                  >プライバシーポリシー</Text>
                  <Text 
                    style={styles.lightText}
                  >に同意する</Text>
                </Text>
              </Body>
            </ListItem>
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                signup(email,password,{navigation})
                const uid=auth().currentUser.uid;
                register(uid,nickname,grade,firstSchool)
              }}
              underlayColor="#c70f66">
              <Text style={styles.buttonTitle}>登録する</Text>
            </TouchableHighlight>
            <Text style={{alignSelf:'center',
             marginTop:30}}>
              <Text style={styles.lightText}>既にアカウントをお持ちですか？</Text>
              <Text
                  style={styles.link}
                  onPress={()=>navigation.navigate('Login')}
                >Sign In</Text>
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
    flex:1,
    justifyContent:'center',
  },
  logo:{
    alignSelf: 'center',
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
  lightText:{
    color:'#0008'
  },
  link:{
    color:'#0066c0'
  },
});

export default SignupScreen;
