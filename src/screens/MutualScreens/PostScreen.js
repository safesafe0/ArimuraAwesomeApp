import React, { useState,useContext } from 'react';
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
  const [image1, setImage1] = useState(null);
  const [source1, setSource1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [source2, setSource2] = useState(null);
  const [loading, setLoading] = useState(false);
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
        console.log(response.path);
        setImage1(response.path);
        setSource1(response.uri);
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
        console.log(response.path);
        setImage2(response.path);
        setSource2(response.uri);
      }
    });
  }
  async function uploadImage1() {
    setLoading(true);
    if(image1){
      const id=Math.random()*100000000000000000;
      const iid=Math.random()*100000000000000000;
      const uuid=''+id+''+iid;
      const fileName=uuid+'.'+image1.split('.').pop();
      console.log(fileName);
      await storage()
      .ref('post')
      .child('img')
      .child(fileName)
      .putFile(image1)
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
        .then((downloadURL)=>{
          uploadImage2(downloadURL);
        });
      });
    } else {
      uploadImage2(null);
    }
  }
  async function uploadImage2(image1URL) {
    if(image2){
      const id=Math.random()*100000000000000000;
      const iid=Math.random()*100000000000000000;
      const uuid=''+id+''+iid;
      const fileName=uuid+'.'+image2.split('.').pop();
      console.log(fileName);
      await storage()
      .ref('post')
      .child('img')
      .child(fileName)
      .putFile(image2)
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
        .then((downloadURL)=>{
          uploadPost(image1URL,downloadURL);
        });
      });
    } else {
      uploadPost(image1URL,null);
    }
  }
  async function uploadPost(image1,image2) {
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
        image1:image1,
        image2:image2,
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
      <ScrollView>
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
            <Text style={styles.body}>わからない問題の画像</Text>
            <TouchableHighlight
              style={styles.button}
              onPress={() => showPicker1()}
              underlayColor="transparent">
              {source1 ? (
                <Image style={styles.image} source={{uri: source1}} />
              ) : (
                <View style={styles.wrapper}>
                  <MaterialCommunityIcons
                    style={styles.icon}
                    name="image-filter"
                  />
                </View>
              )}
            </TouchableHighlight>
            <Text style={styles.body}>
              わからない部分の解答画像(答えがある場合)
            </Text>
            <TouchableHighlight
              style={styles.button}
              onPress={() => showPicker2()}
              underlayColor="transparent">
              {source2 ? (
                <Image style={styles.image} source={{uri: source2}} />
              ) : (
                <View style={styles.wrapper}>
                  <MaterialCommunityIcons
                    style={styles.icon}
                    name="image-filter"
                  />
                </View>
              )}
            </TouchableHighlight>
            <Text style={styles.body}>どこがわからないのか</Text>
            <TextInput
              style={styles.postInput}
              multiline
              value={body}
              onChangeText={setBody}
            />
            <CircleButton
              onPress={() => {uploadImage1()}}>
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
  button: {
    width: 85,
    height: 85,
    marginBottom: 20,
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
  icon: {
    fontSize: 45,
    color: '#fff',
    alignSelf: 'center',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
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
