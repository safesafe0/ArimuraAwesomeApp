import React,{useContext, useState} from 'react';
import { 
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import {UidContext} from '../components/Context';

function Notification(props){
  const {uid,nickname,img}=useContext(UidContext);
  const navigation = useNavigation();
  async function getPost(){
    const DocumentSnapshot=await firestore()
    .collection('public')
    .doc('v1')
    .collection('users')
    .doc(uid)
    .collection('posts')
    .doc(props.postid)
    .get()
    navigation.navigate('Detail',{item:{
      ...DocumentSnapshot.data(),
      uid:uid,
      uname:nickname,
      uimg:img,
      id:DocumentSnapshot.id
    }})
    // .onSnapshot((doc)=>{
    //   let tempList = [];
    //   tempList.push({
    //     ...doc.data(),
    //     uid:uid,
    //     uname:nickname,
    //     uimg:img,
    //     id: doc.id,
    //   })
    //   setPost(tempList)
    //   navigation.navigate('Detail',{item:props})
    // })
  }
  return(
    <TouchableOpacity
    style={styles.postListItem}
    onPress={()=>getPost()}
    >
      <View style={styles.wrapper}>
        <View style={styles.left}>
          <Image
            rounded
            style={styles.avatar}
            source={props.uimg}/>
        </View>
        <View style={styles.right}>
          <View style={styles.info}>
            <Text style={styles.name}>{props.uname}</Text>
            <Text>さんがあなたの質問に回答しました</Text>
          </View>
          <Text
          style={styles.body}
          numberOfLines={2}
          ellipsizeMode="tail"
          >{props.body}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postListItem: {
    marginLeft:20,
    marginRight:20,
    marginTop:10,
    marginBottom:5,
    paddingLeft: 12,
    paddingRight: 18,
    paddingTop: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  wrapper:{
    flexDirection: 'row',
  },
  avatar:{
    width:50,
    height:50,
    borderWidth:2,
    borderRadius:50,
    backgroundColor:'#fff',
    borderColor:'#fff',
  },
  left:{
    width:'18%',
  },
  right:{
    width:'82%',
  },
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
  body:{
    fontSize: 14,
    // fontWeight: 200,
    marginBottom:10,
  },
  imagewrapper:{
    alignItems:"center",
    flexDirection: 'row',
    marginBottom:10,
  },
  image:{
    width:'50%',
    height:100,
    alignSelf:'center',
  },
  bottom:{
    flexDirection: 'row',
  },
  text1:{
    // alignSelf:'flex-start',
  },
  text2:{
    alignSelf:'flex-end',
    // marginRight:10,
  },
});

export default React.memo(Notification);