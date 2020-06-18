import React, {useState,useContext} from 'react';
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
import {GradeItem} from '../elements/PickerItem';
import {AuthContext} from '../components/Context';
import firestore from '@react-native-firebase/firestore';

function SettingScreen({navigation}) {
  const [nickname,setNickname]=useState('');
  const [grade,setGrade]=useState('');
  const {signedIn} = useContext(AuthContext);
  const [firstSchool,setFirstSchool]=useState('');
  function updateGrade(state){setGrade(state);
  }
  function register(uid) {
    firestore()
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
      .then(()=>{
        signedIn(uid);
        alert('ユーザー登録が完了しました!');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
            <GradeItem updateGrade={updateGrade}/>
            <TextInput style={styles.input}
            value={firstSchool}
            placeholder="志望校"
            onChangeText={setFirstSchool}
            />
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                signup()}}
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

export default SettingScreen;