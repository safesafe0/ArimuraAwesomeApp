import React, { useState,useLayoutEffect,useContext,useCallback } from 'react';
import {
  StyleSheet, 
  View, 
  Text,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {AuthContext,UidContext} from '../components/Context';
import { useFocusEffect } from '@react-navigation/native';
import Post from '../elements/Post';

function MypageScreen({navigation}) {
  const {uid}=useContext(UidContext);
  const [nickname,setNickname]=useState(null);
  const [img,setImg]=useState(null);
  const [header,setHeader]=useState(null);
  const [grade,setGrade]=useState(null);
  const [firstSchool,setFirstSchool]=useState(null);
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const {signedOut} = useContext(AuthContext);
  function signOut() {
    auth().signOut();
    signedOut();
    console.log('User LogOut!');
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
        onPress={() =>{navigation.navigate('Setting')}}>
          <MaterialCommunityIcons
          name={'settings-outline'}
          color={'#555'}
          size={35}
          />
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
        console.log(nickname)
        console.log(grade)
        console.log(firstSchool)
        console.log(img)
        console.log(header)
        getpost(nickname,img)
      });
    },[]),
  );
  function getpost(name,img){
    firestore()
        .collection('public')
        .doc('v1')
        .collection('users')
        .doc(uid)
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          const postList = [];
          querySnapshot.forEach((doc)=>{
            postList.push({
              ...doc.data(),
              uname:name,
              uimg:img,
              id:doc.id,
            })
          })
          setPostList(postList);
          setLoading(false);
      });
  }
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <UidContext.Consumer>
      {(state) => (
        <ScrollView nestedScrollEnabled>
          <View style={styles.container}>
            <Image
            style={styles.header}
            source={header}/>
            <Image
            style={styles.avatar}
            source={img}/>
            <Text style={styles.nickname}>{nickname}</Text>
            <Text style={styles.body}>{grade}</Text>
            <Text style={styles.body}>{firstSchool}志望</Text>
            <Button title="signOut" onPress={signOut} />
            <Text style={styles.p}>いままでの質問一覧</Text>
            <FlatList
            nestedScrollEnabled
            data={postList}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <Post {...item} />}
            />
          </View>
        </ScrollView>
      )}
    </UidContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    paddingBottom:30,
  },
  header:{
    width:'100%',
    height:200,
  },
  avatar:{
    backgroundColor:'#fff',
    borderColor:'#fff',
    borderWidth:2,
    borderRadius:50,
    width:100,
    height:100,
    top:-50,
  },
  nickname:{
    top:-30,
    fontSize: 20,
    marginBottom: 24,
  },
  body:{
    top:-30,
    fontSize: 15,
    marginBottom: 4,
  },
  p:{
    marginLeft:30,
    marginTop:10,
    alignSelf:'flex-start',
  },
});

export default MypageScreen;