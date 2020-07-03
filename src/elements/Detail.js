import React from 'react';
import { 
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

function Detail (props){
  function dateString(date){
    if (date == null) { return ''; }
    const dateObject = date.toDate();
    return dateObject.toISOString().split('T')[0];
  };
  return (
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
          <Text style={styles.time}>{dateString(props.createdAt)}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          {props.subject==null?(
            <></>
          ):(
            <Text style={styles.subject}>科目：{props.subject}　</Text>
          )}
          {props.field==null?(
            <></>
          ):(
            <Text style={styles.subject}>分野：{props.field}</Text>
          )}
        </View>
        {/* <Text style={styles.category}>{props.hashtag}</Text> */}
        <View style={styles.div}>
          {props.type==null?(
            <></>
          ):(
            <Text style={styles.category}>出典：{props.type}</Text>
          )}
          {props.type==null?(
            <></>
          ):(
            <Text style={styles.category}>書名：{props.bookName}</Text>
          )}
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
        <Text style={styles.text2}>未回答</Text>
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  wrapper:{
    paddingLeft:15,
    paddingRight:24,
    paddingTop:10,
    paddingBottom:10,
    flexDirection: 'row',
    backgroundColor:'#fff',
    borderBottomWidth:10,
    borderBottomColor:'#ddd',
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
    width:'16%',
  },
  right:{
    width:'84%',
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
    marginBottom:5,
  },
  div:{
    marginBottom:8,
  },
  category:{
    fontSize: 15,
    marginBottom:5,
  },
  body:{
    fontSize: 16,
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
  },
  text2:{
    alignSelf:'flex-end',
  },
});

export default Detail;