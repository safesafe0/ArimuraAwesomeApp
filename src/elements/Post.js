// import {List} from 'react-native-paper';
import React from 'react';
import{ 
StyleSheet,
View,
Text,
Image,
TouchableOpacity,
}from 'react-native';
import { Avatar } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
// id,bookName,field,hashtag,image1,image2,subject,type,body,createdAt,complete

function Post(props){
  async function toggleComplete(){
    await firestore()
    .collection('posts')
    .doc(id)
    .update({
      complete: !complete,
    });
  }
  const dateString = (date) => {
    if (date == null) { return ''; }
    const dateObject = date.toDate();
    return dateObject.toISOString().split('T')[0];
  };
  return(
    <TouchableOpacity
    style={styles.postListItem}
    onPress={()=>navigation.navigate('Detail',props.id)}
    >
      <View style={styles.wrapper}>
        <Avatar
        rounded
        style={styles.avater}
        source={props.uimg}/>
        <View style={styles.right}>
          <Text style={styles.name}>{props.uname}</Text>
          <Text style={styles.name}>{props.hashtag}</Text>
          <Text style={styles.time}>{dateString(props.createdAt)}</Text>
          <Text style={styles.body}>{props.body}</Text>
          <View style={styles.imagewrapper}>
            <Image style={styles.image} source={{uri:props.image1}}/>
            <Image style={styles.image} source={{uri:props.image2}}/>
          </View>
          <View>
            <Text>回答</Text>
            <Text>未回答</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postListItem: {
    marginLeft:30,
    marginRight:30,
    marginTop:10,
    marginBottom:5,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  wrapper:{
    flexDirection: 'row',
  },
  avater:{
    width:45,
    height:45,
  },
  right:{
    width:'70%'
  },
  name:{
    // fontWeight:'bold',
    fontSize: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '70%',
  },
  time:{
    // fontWeight:'bold',
    fontSize: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '70%',
  },
  body:{
    // fontWeight:'bold',
    fontSize: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '70%',
  },
  imagewrapper:{
    alignItems:"center",
  },
  image:{
    width:80,
    height:50,
  },
  postTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  postDate: {
    fontSize: 12,
    color: '#a2a2a2',
  },
});

export default React.memo(Post);