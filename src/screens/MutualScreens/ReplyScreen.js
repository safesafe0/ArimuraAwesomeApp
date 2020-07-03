import React,{ useState,useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import {UidContext} from '../../components/Context';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

function ReplyScreen({route}) {
  const {uid}=useContext(UidContext);
  const navigation = useNavigation();
  const {item}=route.params;
  const [body,setBody]=useState(null);
  const [img,setImg]=useState(null);
  const [source,setSource]=useState(null);
  const [loading, setLoading] = useState(false);
  const dateString = (date) => {
    if (date == null) { return ''; }
    const dateObject = date.toDate();
    return dateObject.toISOString().split('T')[0];
  };
  function showPicker() {
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
        setImg(response.path);
        setSource(response.uri);
      }
    });
  }
  function uploadImage() {
    setLoading(true);
    if(img){
      const id=Math.random()*100000000000000000;
      const iid=Math.random()*100000000000000000;
      const uuid=''+id+''+iid;
      const fileName=uuid+'.'+img.split('.').pop();
      console.log(fileName);
      storage()
      .ref('post')
      .child('img')
      .child(fileName)
      .putFile(img)
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
          uploadReply(downloadURL);
        });
      });
    } else {
      uploadReply(null);
    }
  }
  function uploadReply(imgURL) {
    firestore()
      .collection('public')
      .doc('v1')
      .collection('users')
      .doc(item.uid)
      .collection('posts')
      .doc(item.id)
      .collection('replys')
      .add({
        uid:uid,
        body:body,
        image:imgURL,
        createdAt: new Date(),
      })
      .then(function (doc) {
        uploadNotion(imgURL,doc)
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  }
  function uploadNotion(imgURL,doc){
    firestore()
      .collection('public')
      .doc('v1')
      .collection('users')
      .doc(item.uid)
      .collection('notifications')
      .add({
        postid:item.id,
        replyid:doc.id,
        uid:uid,
        body:body,
        imgURL:imgURL,
        createdAt: new Date(),
      })
      .then(()=>{
        setLoading(false)
        alert('書き込みができました')
        navigation.navigate('TimeLine')
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
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.wrapper}>
              <View style={styles.left}>
                <Image
                rounded
                style={styles.avatar}
                source={item.uimg}/>
              </View>
              <View style={styles.right}>
                  <View style={styles.info}>
                    <Text style={styles.name}>{item.uname}</Text>
                    <Text style={styles.time}>{dateString(item.createdAt)}</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <View style={styles.bodyLeft}>
                      <Text style={styles.body}>{item.body}</Text>
                    </View>
                    <View style={styles.bodyRight}>
                    {item.image1==null&&item.image2==null?(
                        <></>
                      ):(
                        <View style={styles.imagewrapper}>
                          {item.image2?(
                            <Image style={styles.image} source={{uri:item.image1}}/>
                          ):(<></>)}
                          {item.image1?(
                            <Image style={styles.image} source={{uri:item.image2}}/>
                          ):(<></>)}
                        </View>
                      )}
                    </View>
                  </View>
                  <Text style={styles.answered}>未回答</Text>
                </View>
            </View>
            <TextInput
              style={styles.postInput}
              multiline
              placeholder='ここに回答をしてくれい'
              value={body}
              onChangeText={setBody}
            />
            {source==null?(
              <></>
            ):(
              <Image style={styles.postImage} source={{uri:source}}/>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={styles.tab}>
        <TouchableOpacity 
        style={styles.tabLeft}
        onPress={()=>{showPicker()}}>
          <MaterialCommunityIcons
          style={styles.icon}
          name={'camera'}
          size={37}/>
        </TouchableOpacity>
        <View style={styles.tabCenter}>
          <Text style={styles.tabText}>回答を送信する</Text>
        </View>
        <TouchableOpacity
        style={styles.tabRight}
        onPress={()=>{uploadImage()}}>
          <MaterialCommunityIcons
          style={styles.icon}
          name={'send'}
          size={37}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    flex:1,
    width:'100%',
    paddingBottom:70,
  },
  wrapper:{
    paddingLeft:15,
    paddingRight:24,
    paddingTop:10,
    paddingBottom:10,
    borderBottomWidth:2,
    borderBottomColor:'#ddd',
    flexDirection: 'row',
    backgroundColor:'#fff',
  },
  avatar:{
    width:50,
    height:50,
    borderWidth:2,
    borderRadius:50,
    backgroundColor:'#fff',
    borderColor:'#fff',
  },
  left:{width:'16%'},
  right:{width:'84%',},
  info:{
    flexDirection: 'row',
    alignItems:'baseline',
    marginTop:3,
    marginBottom:3,
  },
  name:{
    fontWeight:'bold',
    fontSize: 17,
  },
  time:{
    fontSize: 14,
    marginLeft:10,
  },
  bodyLeft:{width:'70%'},
  bodyRight:{width:'30%'},
  body:{
    fontSize: 13,
    marginBottom:10,
  },
  imagewrapper:{
    alignItems:"center",
    flexDirection: 'row',
    marginBottom:10,
  },
  image:{
    width:'50%',
    height:70,
    alignSelf:'center',
  },
  answered:{
    alignSelf:'flex-end',
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
  postImage:{
    width:'70%',
    height:300,
    alignSelf:'center',
  },
  tab:{
    width:'100%',
    height:60,
    position:'absolute',
    bottom:0,
    alignSelf:'center',
    flexDirection: 'row',
    backgroundColor:'#03f',
  },
  tabLeft:{
    width:'25%',
    justifyContent:'center',
    alignItems:'center',
  },
  tabCenter:{
    width:'55%',
    justifyContent:'center',
    alignItems:'center',
    borderLeftWidth:3,
    borderLeftColor:'#fffc',
  },
  tabRight:{
    width:'20%',
    justifyContent:'center',
    alignItems:'center',
  },
  icon:{
    color:'#fff',
  },
  tabText:{
    color:'#fff',
    fontSize:23,
    marginLeft:10,
  },
});

export default ReplyScreen;