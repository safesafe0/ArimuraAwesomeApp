import React, { useState,useContext,useReducer } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import CircleButton from '../../elements/CircleButton';
import {Subject, Field} from '../../elements/PickerItem';
import {UidContext} from '../../components/Context';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

function PostScreen({navigation}) {
  const {uid}=useContext(UidContext);
  const [subject, setSubject] = useState(null);
  const [field, setField] = useState(null);
  const [body, setBody] = useState(null);
  const [hashtag, setHashtag] = useState(null);
  const [type, setType] = useState(null);
  const [bookName, setBookName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [img1, setImg1] = useState([]);
  const [img2, setImg2] = useState([]);
  const [img1count, setImg1count] = useState(0);
  const [img2count, setImg2count] = useState(0);
  function updateSubject(state) {setSubject(state)}
  function updateField(state) {setField(state)}
  function showPicker1() {
    let options = {
      title: '画像を選択',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response.path)
        let tempList=img1;
        const id=String(Math.random()*100000000000000000);
        tempList.push({
          id:id,
          display:response.uri,
          data:response.path,
          width:response.width,
          height:response.height,
        })
        setImg1(tempList)
        console.log(img1count)
        setImg1count(img1count+1)
        console.log(img1count)
        console.log(img1)
      }
    });
  }
  function showPicker2() {
    let options = {
      title: '画像を選択',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response.path)
        let tempList=img2;
        const id=String(Math.random()*100000000000000000);
        tempList.push({
          id:id,
          display:response.uri,
          data:response.path,
          width:response.width,
          height:response.height,
        })
        setImg2(tempList)
        setImg2count(img2count+1)
      }
    });
  }
  function deleteItem1(id){
    console.log('a')
    const newArray = img1.filter((item) => item.id !== id);
    setImg1(newArray);
    setImg1count(img1count-1);
    console.log(img1count)
    console.log(img1)
  }
  function deleteItem2(id){
    const newArray = img2.filter((item) => item.id !== id);
    setImg2(newArray);
    setImg2count(img2count-1)
  }
  async function upload(){
    setLoading(true);
    if(img1||img2){
      let array =img1.concat(img2);
      let tempList=[];
      await Promise.all(array.map(async item => await uploadimg(item,tempList)));
      uploadPost(tempList)
    } else{
      uploadPost(null);
    }
  }
  async function uploadimg(item,tempList){
    const id=Math.random()*100000000000000000;
    const iid=Math.random()*100000000000000000;
    const uuid=''+id+''+iid;
    const fileName=uuid+'.'+item.data.split('.').pop();
    await storage()
    .ref('post')
    .child('img')
    .child(fileName)
    .putFile(item.data)
    .catch(()=>{
      setLoading(false);
      alert('画像の保存に失敗しました');
    })
    .then(async()=>{
      await storage()
      .ref('post')
      .child('img')
      .child(fileName)
      .getDownloadURL()
      .catch(()=>{
        setLoading(false);
        alert('画像のURLの取得に失敗しました');
      })
      .then(async(downloadURL)=>{
        await storage()
        .ref('post')
        .child('img')
        .child(fileName)
        .getMetadata()
        .catch(()=>{
          setLoading(false);
          alert('画像のメタデータの取得に失敗しました');
        })
        .then((metadata)=>{
          tempList.push({
            id:item.id,
            uri:downloadURL,
            size:metadata.size,
            width:item.width,
            height:item.height,
          })
        })
      });
    })
  }
  async function uploadPost(image) {
    await firestore()
      .collection('public')
      .doc('v1')
      .collection('users')
      .doc(uid)
      .collection('posts')
      .add({
        uid:uid,
        body:body,
        subject:subject,
        field:field,
        hashtag:hashtag,
        type:type,
        bookName:bookName,
        image:image,
        createdAt: new Date(),
      })
      .then(function (docRef) {
        setLoading(false);
        console.log(docRef.id);
        console.log('書き込みができました');
        navigation.navigate('TimeLine');
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  }
  if (loading) {
    return <ActivityIndicator />
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.notion}>残りの無料質問回数は3回です。</Text>
            <View style={styles.component}>
              <Text style={styles.item}>科目＊必須</Text>
              <Subject updateSubject={updateSubject} />
            </View>
            <View style={styles.component}>
              <Text style={styles.item}>分野＊必須</Text>
              <Field subject={subject} updateField={updateField} />
            </View>
            <View style={styles.component}>
              <Text style={styles.item}>ハッシュタグ</Text>
              <TextInput
                style={styles.hashtag}
                value={hashtag}
                onChangeText={setHashtag}
              />
            </View>
            <View style={styles.component}>
              <Text style={styles.item}>問題の種類</Text>
              <TextInput
                style={styles.hashtag}
                value={type}
                onChangeText={setType}/>
            </View>
            <View style={styles.component}>
              <Text style={styles.item}>参考書名</Text>
              <TextInput
                style={styles.hashtag}
                value={bookName}
                onChangeText={setBookName}
              />
            </View>
            <View style={styles.imgcomponent}>
              <Text style={styles.body}>わからない問題の画像</Text>
              {img1.length>=4?null:(
              <TouchableOpacity
              style={styles.addImg}
              onPress={() => showPicker1()}>
                <Text>画像を追加する</Text>
              </TouchableOpacity>
              )}
            </View>
            {img1==[]?null:(
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={img1}
            extraData={img1count}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <View style={styles.imageList}>
                <TouchableOpacity
                style={styles.cover}
                onPress={()=>deleteItem1(item.id)}>
                  <MaterialCommunityIcons
                  name={'close-circle'}
                  style={styles.delete}
                  />
                </TouchableOpacity>
                <Image style={styles.image} source={{uri:item.display}}/>
              </View>
            )}/>
            )}
            <View style={styles.imgcomponent}>
              <Text style={styles.body}>わからない部分の解答画像(答えがある場合)</Text>
              {img2.length>=4?null:(
              <TouchableOpacity
              style={styles.addImg}
              onPress={() => showPicker2()}>
                <Text>画像を追加する</Text>
              </TouchableOpacity>
              )}
            </View>
            {img2==[]?null:(
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={img2}
            extraData={img2count}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <View style={styles.imageList}>
                <TouchableOpacity
                style={styles.cover}
                onPress={()=>deleteItem2(item.id)}>
                  <MaterialCommunityIcons
                  name={'close-circle'}
                  style={styles.delete}
                  />
                </TouchableOpacity>
                <Image style={styles.image} source={{uri:item.display}}/>
              </View>
            )}/>
            )}
            <Text style={styles.body}>どこがわからないのか</Text>
            <TextInput
              style={styles.postInput}
              multiline
              value={body}
              onChangeText={setBody}
            />
            <CircleButton
              onPress={() => {upload()}}>
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
    paddingLeft: 36,
    paddingRight: 36,
    paddingTop: 18,
    flex: 1,
    width: '100%',
  },
  component: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 24,
  },
  notion: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  body: {
    fontSize: 15,
    justifyContent: 'center',
    marginBottom: 10,
  },
  item: {
    // fontWeight:'bold',
    fontSize: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '27%',
  },
  hashtag: {
    backgroundColor: '#ddd',
    height: 45,
    width: '32%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginLeft: 30,
  },
  imgcomponent:{
    // flexDirection: 'row',
    // alignItems:'baseline'
    marginBottom:10,
  },
  addImg:{
    // marginLeft:30,
    marginHorizontal:30,
    paddingTop:5,
    paddingBottom:7,
    // paddingLeft:12,
    // paddingRight:12,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#ddd',
  },
  imageList:{
    width:120,
  },
  cover:{
    backgroundColor:'#fff',
    borderRadius:50,
    alignSelf:'flex-start',
    top:20,
    zIndex:1,
  },
  delete:{
    fontSize:40,
    color:'#000',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  wrapper: {
    width: 85,
    height: 85,
    backgroundColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000000',
    // iPhoneの場合
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    // androidの場合
    elevation: 5,
  },
  postInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
    marginBottom: 100,
  },
});

export default PostScreen;
