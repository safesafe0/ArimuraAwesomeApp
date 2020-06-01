import React, {useState} from 'react';
import {
  Text,
  StyleSheet, 
  View, 
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import CircleButton from '../elements/CircleButton';
import {Subject,Field} from '../elements/PickerItem';
import firestore from '@react-native-firebase/firestore';

async function post(title) {
  await firestore()
    .collection('posts')
    .add({
      body: title,
      createdAt: '2020-05-13',
    })
    .then(function (docRef) {
      console.log(docRef.id);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function PostScreen() {
  const [subject,setSubject] = useState('');
  function updateSubject(state1){
    setSubject(state1);
  }
  const [field,setField] = useState('');
  function updateField(state2){
    setField(state2);
  }
  const [title, setTitle] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS==='ios'?'padding':null}
      style={{flex:1}}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.body}>残りの無料質問回数は3回です。</Text>
            <View style={styles.component}>
              <Text style={styles.item}>
                科目
              </Text>
              <View style={styles.picker}>
              <Subject 
              updateSubject={updateSubject}/>
              </View>
            </View>
            <View style={styles.component}>
              <Text style={styles.item}>
                分野
              </Text>
              <View style={styles.picker}>
              <Field 
              subject={subject}
              updateField={updateField}/>
              </View>
            </View>
            <TextInput
              style={styles.postInput}
              multiline
              value={title}
              onChangeText={setTitle}
            />
            <CircleButton
              onPress={() => {
                post(title);
              }}>
              send
            </CircleButton>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:36,
    flex: 1,
    width: '100%',
  },
  component:{
    flex:1,
    flexDirection: 'row',
    marginBottom:24,
  },
  body:{
    fontWeight:'bold',
    alignSelf:'flex-end',
  },
  item:{
    justifyContent:'center',
    alignSelf:'center',

  },
  postInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
  },
  picker:{
    width:'100%',
    marginLeft:30,
    marginRight:30,
  },
});

export default PostScreen;
