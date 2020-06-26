import React from 'react';
import { 
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function TList(){
  return(
    <TouchableOpacity
    style={styles.postListItem}>
      <View style={styles.wrapper}>
      <Image
      style={styles.avater}
      source={props.img}/>
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
  avater:{
    width:50,
    height:50,
    borderWidth:2,
    borderRadius:50,
    backgroundColor:'#fff',
    borderColor:'#fff',
  },
});

export default TList;