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
  ActivityIndicator,
} from 'react-native';
import {Picker} from 'native-base';
import {UidContext,AuthContext} from '../../components/Context';
import { useFocusEffect,useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function SSettingScreen() {
  const {uid,nickname,img,header,bio,grade,firstSchool}=useContext(UidContext);
  const {update}=useContext(AuthContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [newnickname,setNickname]=useState(null);
  const [newimg,setImg]=useState(null);
  const [imgURL,setImgURL]=useState(null);
  const [newheader,setHeader]=useState(null);
  const [headerURL,setHeaderURL]=useState(null);
  const [newbio,setBio]=useState(null);
  const [newgrade,setGrade]=useState(null);
  const [newfirstSchool,setFirstSchool]=useState(null);
  function updateGrade(state){setGrade(state)}
  useFocusEffect(
    useCallback(()=>{
      setLoading(true)
      setNickname(nickname)
      setImg({uri:img})
      setHeader({uri:header})
      setBio(bio)
      setGrade(grade)
      setFirstSchool(firstSchool)
      setLoading(false)
      console.log('c')
    },[]),
  );
  function uploadImage1() {
    console.log(newbio)
    setLoading(true)
    if(imgURL){
      const id=Math.random()*100000000000000000;
      const iid=Math.random()*100000000000000000;
      const uuid=''+id+''+iid;
      const fileName=uuid+'.'+imgURL.split('.').pop();
      console.log(fileName);
      storage()
      .ref('post')
      .child('img')
      .child(fileName)
      .putFile(imgURL)
      .catch(()=>{
        setLoading(false);
        alert('画像の保存に失敗しました');
      })
      .then(()=>{
        storage()
        .ref('post')
        .child('img')
        .child(fileName)
        .getDownloadURL()
        .catch(()=>{
          setLoading(false);
          alert('画像のURLの取得に失敗しました');
        })
        .then((downloadURL)=>{
          uploadImage2(downloadURL);
        });
      });
    } else {
      uploadImage2(downloadURL=null);
    }
  }
  function uploadImage2(img1URL) {
    if(headerURL){
      const id=Math.random()*100000000000000000;
      const iid=Math.random()*100000000000000000;
      const uuid=''+id+''+iid;
      const fileName=uuid+'.'+headerURL.split('.').pop();
      console.log(fileName);
      storage()
      .ref('post')
      .child('img')
      .child(fileName)
      .putFile(headerURL)
      .catch(()=>{
        setLoading(false);
        alert('画像の保存に失敗しました');
      })
      .then(()=>{
        storage()
        .ref('post')
        .child('img')
        .child(fileName)
        .getDownloadURL()
        .catch(()=>{
          setLoading(false);
          alert('画像のURLの取得に失敗しました');
        })
        .then((downloadURL)=>{
          register(img1URL,downloadURL);
        });
      });
    } else {
      register(img1URL,downloadURL=null);
    }
  }
  function register(img1URL,header1URL) {
    console.log('a'+newbio)
    firestore()
      .collection('public')
      .doc('v1')
      .collection('users')
      .doc(uid)
      .update({
        nickname: newnickname,
        img: img1URL,
        header: header1URL,
        bio: newbio,
        grade: newgrade,
        firstSchool: newfirstSchool,
        createdAt:new Date(),
      })
      .then(async()=>{
        console.log('b')
        setLoading(false)
        await update();
        navigation.navigate('Mypage');
        alert('ユーザー情報の更新が完了しました!');
      })
      .catch(function (error) {
        setLoading(false)
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
      selectedValue={newgrade}
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
  if (loading) {
    return <ActivityIndicator />
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS==='ios'?'padding':null}
      style={{flex:1,paddingBottom:50}}
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
            source={newheader}/>
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
            source={newimg}/>
            <View style={styles.content}>
              <Text>ニックネーム</Text>
              <TextInput style={styles.input}
              value={newnickname}
              placeholder="ニックネーム"
              onChangeText={setNickname}
              />
              <Text>自己紹介</Text>
              <TextInput style={styles.multiinput}
              value={newbio}
              multiline
              onChangeText={setBio}
              />
              <Text>学年</Text>
              <GradeItem updateGrade={updateGrade}/>
              <Text>志望校</Text>
              <TextInput style={styles.input}
              value={newfirstSchool}
              placeholder="志望校"
              onChangeText={setFirstSchool}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={styles.tab}>
        <View style={styles.tabLeft}></View>
          <TouchableOpacity
          style={styles.tabCenter}
          onPress={()=>{uploadImage1()}}>
            <Text style={styles.tabText}>更新する</Text>
          </TouchableOpacity>
          <View style={styles.tabRight}>
            {/* <MaterialCommunityIcons
              name={'pencil-plus-outline'}
              color={'#fff'}
              size={37}/> */}
          </View>
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    backgroundColor:'#fff',
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
    backgroundColor: '#eeea',
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddda',
    padding: 8,
  },
  multiinput: {
    backgroundColor: '#fff',
    height: 80,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddda',
    padding: 8,
  },
  tab:{
    width:'100%',
    height:50,
    position:'absolute',
    bottom:0,
    alignSelf:'center',
    flexDirection: 'row',
    backgroundColor:'#4d2',
  },
  tabLeft:{
    width:'30%',
    justifyContent:'center',
    alignItems:'center',
  },
  tabCenter:{
    width:'40%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#37dd',
    borderRadius:10,
    margin:5,
  },
  tabRight:{
    width:'30%',
    justifyContent:'center',
    alignItems:'center',
  },
  tabText:{
    color:'#fff',
    fontSize:23,
  },
});

export default SSettingScreen;