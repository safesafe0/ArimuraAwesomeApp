import React, {useState} from 'react';
import {
  Text,
  Image,
  StyleSheet, 
  View, 
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import CircleButton from '../elements/CircleButton';
import {Subject,Field} from '../elements/PickerItem';
import firestore from '@react-native-firebase/firestore';

async function post(props) {
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
  const [field,setField] = useState('');
  const [title, setTitle] = useState('');
  const [hashtag,setHashtag] = useState('');
  const [type,setType] = useState('');
  const [bookName,setBookName] = useState('');
  const [image1,setImage1]=useState('');
  const [image2,setImage2]=useState('');

  function updateSubject(state1){setSubject(state1);}
  function updateField(state2){setField(state2);}

  function showPicker1(){
    let options={
      title:'画像を選択',
      storageOptions:{
        skipBackup:true,
        path:'images',
      },
    }

    ImagePicker.showImagePicker(options, (response)  => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response.uri)
        setImage1(response.uri);
      }
    });
  }

  function showPicker2(){
    let options={
      title:'画像を選択',
      storageOptions:{
        skipBackup:true,
        path:'images',
      },
    }

    ImagePicker.showImagePicker(options, (response)  => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response.uri)
        setImage2(response.uri);
      }
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS==='ios'?'padding':null}
      style={{flex:1}}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.notion}>残りの無料質問回数は3回です。</Text>
            <View style={styles.component}>
              <Text style={styles.item}>
                科目
              </Text>
              <Subject 
              updateSubject={updateSubject}/>
            </View>
            <View style={styles.component}>
              <Text style={styles.item}>
                分野
              </Text>
              <Field 
              subject={subject}
              updateField={updateField}/>
            </View>
            <View style={styles.component}>
              <Text style={styles.item}>
                ハッシュタグ
              </Text>
              <TextInput
              style={styles.hashtag}
              value={hashtag}
              onChangeText={setHashtag}/>
            </View>
            <View style={styles.component}>
              <Text style={styles.item}>
                問題の種類
              </Text>
              <TextInput
              style={styles.hashtag}
              value={type}
              onChangeText={setType}/>
            </View>
            <View style={styles.component}>
              <Text style={styles.item}>
                参考書名
              </Text>
              <TextInput
              style={styles.hashtag}
              value={bookName}
              onChangeText={setBookName}/>
            </View>
            <Text style={styles.body}>
              わからない問題の画像
            </Text>
            <TouchableHighlight 
            style={styles.button}
            onPress={showPicker1}
            underlayColor='transparent'
            >
              <View style={styles.wrapper}>
                <MaterialCommunityIcons 
                style={styles.icon}
                name='image-filter'/>
              </View>
            </TouchableHighlight>
            <Image 
            style={styles.image}
            source={{uri:image1}}/>
            <Text style={styles.body}>
              わからない部分の解答画像(答えがある場合)
            </Text>
            <TouchableHighlight 
            style={styles.button}
            onPress={showPicker2}
            underlayColor='transparent'
            >
              <View style={styles.wrapper}>
                <MaterialCommunityIcons 
                style={styles.icon}
                name='image-filter'/>
              </View>
            </TouchableHighlight>
            <Image 
            style={styles.image}
            source={{uri:image2}}/>
            <Text style={styles.body}>
              どこがわからないのか
            </Text>
            <TextInput
              style={styles.postInput}
              multiline
              value={title}
              onChangeText={setTitle}
            />
            <CircleButton
              onPress={() => {
                post(subject,field,title,hashtag,type,bookName,image1,image2);
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
    paddingLeft:36,
    paddingRight:36,
    paddingTop:18,
    flex: 1,
    width: '100%',
  },
  component:{
    flex:1,
    flexDirection: 'row',
    marginBottom:24,
  },
  notion:{
    fontSize:15,
    fontWeight:'bold',
    alignSelf:'flex-end',
    marginBottom:15,
  },
  body:{
    fontSize:15,
    justifyContent:'center',
    marginBottom:10,
  },
  item:{
    // fontWeight:'bold',
    fontSize:15,
    justifyContent:'center',
    alignSelf:'center',
    width:'27%',
  },
  hashtag:{
    backgroundColor: '#ddd',
    height: 45,
    width:'32%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginLeft:30,
  },
  button:{
    width: 48,
    height: 48,
    marginBottom:20,
    alignSelf: 'center',
  },
  wrapper:{
    width: 48,
    height: 48,
    backgroundColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000000',
    // iPhoneの場合
    shadowOffset: {width:0,height:2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    // androidの場合
    elevation:5,
  },
  icon:{
    fontSize:25,
    color:'#fff',
    alignSelf:'center',
  },
  image:{
    width:100,
    height:100,
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
    marginBottom:100,
  },
});

export default PostScreen;
