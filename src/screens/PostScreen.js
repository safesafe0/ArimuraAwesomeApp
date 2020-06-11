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
import {Subject, Field} from '../elements/PickerItem';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

function PostScreen({navigation}) {
  const [subject, setSubject] = useState('');
  const [field, setField] = useState('');
  const [title, setTitle] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [type, setType] = useState('');
  const [bookName, setBookName] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image1URL, setImage1URL] = useState('');
  const [image2URL, setImage2URL] = useState('');
  const [image1Type, setImage1Type] = useState('');
  const [image2Type, setImage2Type] = useState('');
  const [image1Name, setImage1Name] = useState('');
  const [image2Name, setImage2Name] = useState('');
  const [addedPost, setAddedPost] = useState([]);

  function updateSubject(state1) {
    setSubject(state1);
  }
  function updateField(state2) {
    setField(state2);
  }
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
        console.log(response.uri);
        console.log(response.path);
        setImage1(response.uri);
        setImage1URL(response.path);
        setImage1Type(response.type);
        setImage1Name(response.fileName);
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
        console.log(response.uri);
        console.log(response.path);
        setImage2(response.uri);
        setImage2URL(response.path);
        setImage2Type(response.type);
        setImage2Name(response.fileName);
      }
    });
  }
  async function uploadImage1(image1URL,image1Type,image1Name) {
    const metadata = {
      contentType: `image/${image1Type}`,
    };
    const reference = storage().ref('images').child(`${image1Name}`);
    await reference.putFile(image1URL, metadata).catch(() => {
      alert('画像の保存に失敗しました');
    });
    await reference
      .getDownloadURL()
      .then((url) => setImage1(url))
      .catch(() => {
        alert('失敗しました');
      });
  }
  async function uploadImage2(image2URL,image2Type,image2Name) {
    const metadata = {
      contentType: `image/${image2Type}`,
    };
    const reference = storage().ref('images').child(`${image2Name}`);
    await reference.putFile(image2URL, 'base64url', metadata).catch(() => {
      alert('画像の保存に失敗しました');
    });
    await reference
      .getDownloadURL()
      .then((url) => setImage2(url))
      .catch(() => {
        alert('失敗しました');
      });
  }
  async function uploadPost({
    uid,
    body,
    subject,
    field,
    hashtag,
    type,
    bookName,
    image1,
    image2,
  }) {
    await firestore()
      .collection('public')
      .doc('v1')
      .collection('users')
      .doc(uid)
      .collection('posts')
      .add({
        uid,
        body,
        subject,
        field,
        hashtag,
        type,
        bookName,
        image1,
        image2,
        createdAt: new Date(),
      })
      .then(function (docRef) {
        console.log(docRef.id);
        console.log('書き込みができました');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async function post(
    subject,
    field,
    title,
    hashtag,
    type,
    bookName,
    image1URL,
    image2URL,
    {navigation}) {
    const uid = auth().currentUser.uid;
    const body = await title;
    const Subject = await subject;
    const Field = await field;
    const Hashtag = await hashtag;
    const Type = await type;
    const BookName = await bookName;
    const image1 = await image1URL;
    const image2 = await image2URL;
    await uploadPost(
      uid,
      body,
      Subject,
      Field,
      Hashtag,
      Type,
      BookName,
      image1,
      image2,
    );
    setAddedPost([
      {body, subject, field, hashtag, type, bookName, image1, image2},
    ]);
    navigation.navigate('TimeLine');
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
              <Text style={styles.item}>科目</Text>
              <Subject updateSubject={updateSubject} />
            </View>
            <View style={styles.component}>
              <Text style={styles.item}>分野</Text>
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
                onChangeText={setType}
              />
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
              {image1 ? (
                <Image style={styles.image} source={{uri: image1}} />
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
              {image2 ? (
                <Image style={styles.image} source={{uri: image2}} />
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
              value={title}
              onChangeText={setTitle}
            />
            <CircleButton
              onPress={() => {
                uploadImage1(image1URL, image1Type, image1Name);
                uploadImage2(image2URL, image2Type, image2Name);
                post(
                  subject,
                  field,
                  title,
                  hashtag,
                  type,
                  bookName,
                  image1,
                  image1Type,
                  image1Name,
                  image1URL,
                  image2,
                  image2Type,
                  image2Name,
                  image2URL,
                  {navigation},
                );
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
