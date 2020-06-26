import React from 'react';
import { 
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Reply(props){
  const navigation = useNavigation();
  const dateString = (date) => {
    if (date == null) { return ''; }
    const dateObject = date.toDate();
    return dateObject.toISOString().split('T')[0];
  };
  return(
    <TouchableOpacity
    style={styles.postListItem}
    onPress={()=>navigation.navigate('Detail',{item:props})}
    >
      <View style={styles.postListItem}>
        <View style={styles.wrapper}>
          <View style={styles.left}>
            {props.img==null?(
              <Image
              rounded
              style={styles.avatar}
              source={require('../images/Q-LINE-icon.png')}/>
            ):(
              <Image
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
            <Text style={styles.body}>{props.body}</Text>
            {props.img==null?(
              <></>
            ):(
              <Image style={styles.image} source={{uri:props.img}}/>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postListItem: {
    backgroundColor: '#fff',
  },
  wrapper:{
    paddingLeft: 12,
    paddingRight: 18,
    paddingTop: 10,
    paddingBottom: 8,
    flexDirection: 'row',
    borderBottomWidth:1,
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
    // marginRight:10,
  },
});

export default React.memo(Reply);