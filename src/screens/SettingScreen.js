import React, {useState,useContext,useCallback,useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import {Picker} from 'native-base';
import {UidContext} from '../components/Context';
import { useFocusEffect } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function SettingScreen({navigation}) {
  const {uid}=useContext(UidContext);
  const [nickname,setNickname]=useState('');
  const [img,setImg]=useState(null);
  const [imgURL,setImgURL]=useState(null);
  const [header,setHeader]=useState(null);
  const [headerURL,setHeaderURL]=useState(null);
  const [grade,setGrade]=useState('');
  const [firstSchool,setFirstSchool]=useState('');
  function updateGrade(state){setGrade(state);
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
        onPress={() =>{register(uid,{navigation})}}>
          <Text>更新する</Text>
        </TouchableOpacity>)
    });
  }, [navigation]);
  useFocusEffect(
    useCallback(()=>{
      let nickname,img,header,grade,firstSchool;
      firestore()
      .collection('public')
      .doc('v1')
      .collection('users')
      .doc(uid)
      .onSnapshot((doc)=>{
        nickname=doc.get('nickname')
        grade=doc.get('grade')
        firstSchool=doc.get('firstSchool')
        {doc.get('img') == null?(
          img=require('../images/Q-LINE-icon.png')
        ):(
          img={uri:doc.get('img')}
        )}
        {doc.get('header') == null?(
          header=require('../images/header.png')
        ):(
          header={uri:doc.get('header')}
        )}
        setNickname(nickname)
        setGrade(grade)
        setFirstSchool(firstSchool)
        setImg(img)
        setHeader(header)
      });
    },[]),
  );
  function register(uid,{navigation}) {
    firestore()
      .collection('public')
      .doc('v1')
      .collection('users')
      .doc(uid)
      .set({
        nickname: nickname,
        img:imgURL,
        header:headerURL,
        grade: grade,
        firstSchool:firstSchool,
        createdAt:new Date(),
      })
      .then(()=>{
        navigation.navigate('Mypage');
        alert('ユーザー情報の更新が完了しました!');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function showHeaderPicker(){
    ImagePicker.openPicker({
      width:600,
      height:200,
      cropping:true,
    }).then(image=>{
      console.log(image);
      setHeader({uri:image.path});
      setHeaderURL(image.path);
    })
  }
  function showAvaterPicker(){
    ImagePicker.openPicker({
      width:100,
      height:100,
      cropping:true,
    }).then(image=>{
      console.log(image);
      setImg({uri:image.path});
      setImgURL(image.path);
    })
  }
  function GradeItem() {
    return(
      <Picker
      style={styles.input}
      selectedValue={grade}
      onValueChange={(itemValue)=>{setGrade(itemValue)}}>
        <Picker.Item label="学年" value="未設定" />
        <Picker.Item label="中学1年" value="中学1年" />
        <Picker.Item label="中学2年" value="中学2年" />
        <Picker.Item label="中学3年" value="中学3年" />
        <Picker.Item label="高校1年" value="高校1年" />
        <Picker.Item label="高校2年" value="高校2年" />
        <Picker.Item label="高校3年" value="高校3年" />
      </Picker>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS==='ios'?'padding':null}
      style={{flex:1}}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <TouchableHighlight
            style={styles.headerpicker}
            onPress={() => showHeaderPicker()}
            underlayColor="transparent">
              <MaterialCommunityIcons
              name={'camera-outline'}
              color={'#ccc'}
              size={30}
              />
            </TouchableHighlight>
            <Image
            style={styles.header}
            source={header}/>
            <TouchableHighlight
            style={styles.avaterpicker}
            onPress={() => showAvaterPicker()}
            underlayColor="transparent">
              <MaterialCommunityIcons
              name={'camera-outline'}
              color={'#ccc'}
              size={24}
              />
            </TouchableHighlight>
            <Image
            style={styles.avatar}
            source={img}/>
            <View style={styles.content}>
              <Text>ニックネーム</Text>
              <TextInput style={styles.input}
              value={nickname}
              placeholder="ニックネーム"
              onChangeText={setNickname}
              />
              <Text>学年</Text>
              <GradeItem updateGrade={updateGrade}/>
              <Text>志望校</Text>
              <TextInput style={styles.input}
              value={firstSchool}
              placeholder="志望校"
              onChangeText={setFirstSchool}
            />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
  },
  headerpicker:{
    width:'100%',
    height:200,
    backgroundColor:'#ccc7',
    zIndex:1,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
  },
  header:{
    width:'100%',
    height:200,
  },
  avaterpicker:{
    borderRadius:50,
    width:96,
    height:96,
    backgroundColor:'#ccc7',
    zIndex:2,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    top:152,
  },
  avatar:{
    backgroundColor:'#fff',
    borderColor:'#fff',
    borderWidth:2,
    borderRadius:50,
    width:100,
    height:100,
    top:-50,
    zIndex:1,
  },
  content:{
    width:'70%',
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