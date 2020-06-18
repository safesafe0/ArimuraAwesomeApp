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
        <View style={styles.left}>
          {props.img==null?(
            <Avatar
            rounded
            style={styles.avatar}
            source={require('../images/Q-LINE-icon.png')}/>
          ):(
            <Avatar
            rounded
            style={styles.avatar}
            source={props.uimg}/>
          )}
        </View>
        <View style={styles.right}>
          <View style={styles.info}>
            <Text style={styles.name}>{props.uname}</Text>
            <Text style={styles.time}>{dateString(props.createdAt)}</Text>
          </View>
          <Text style={styles.subject}>科目：{props.subject}　分野：{props.field}</Text>
          {/* <Text style={styles.category}>{props.hashtag}</Text> */}
          <View style={styles.div}>
            <Text style={styles.category}>出典：{props.type}</Text>
            <Text style={styles.category}>書名：{props.bookName}</Text>
          </View>
          <Text style={styles.body}>{props.body}</Text>
          {props.image1==null&&props.image2==null?(
            <></>
          ):(
            <View style={styles.imagewrapper}>
              {props.image2?(
                <Image style={styles.image} source={{uri:props.image1}}/>
              ):(<></>)}
              {props.image1?(
                <Image style={styles.image} source={{uri:props.image2}}/>
              ):(<></>)}
            </View>
          )}
          {/* <Text style={styles.text1}>回答</Text> */}
          <Text style={styles.text2}>未回答</Text>
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
    paddingLeft: 12,
    paddingRight: 16,
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
  time:{
    fontSize: 14,
    marginLeft:10,
  },
  subject:{
    fontSize: 15,
    marginBottom:2,
  },
  div:{
    marginBottom:8,
  },
  category:{
    fontSize: 15,
    marginBottom:2,
  },
  body:{
    fontSize: 14,
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
    marginRight:10,
  },
});

export default React.memo(Post);