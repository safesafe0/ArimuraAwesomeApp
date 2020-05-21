import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

import CircleButton from '../elements/CircleButton';

function PostDetailScreen(){
  return (
    <View style={styles.container}>
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>タイトル</Text>
        <Text style={styles.postDate}>2020/05/05</Text>
      </View>
      <View style={styles.postContext}>
        <Text>
          これはサンプルですこれはサンプルですこれはサンプルです
        </Text>
      </View>
      <CircleButton style={styles.editButton}>"pencil"</CircleButton>
    </View>
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
  },
  postHeader:{
    height:100,
    backgroundColor:'#17313C',
    justifyContent:'center',
    padding:10,
  },
  postTitle:{
    fontSize:20,
    fontWeight:'bold',
    color:'#fff',
    marginBottom:4,
  },
  postDate:{
    fontSize:12,
    color:'#fff',
  },
  postContext:{
    paddingTop:30,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
    backgroundColor:'#fff',
    flex:1,
  },
  editButton:{
    top:75,
  },
});
export default PostDetailScreen;