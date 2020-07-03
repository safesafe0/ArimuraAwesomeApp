import React from 'react';
import { 
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function TList(props){
  return(
    <View style={styles.wrapper}>
      <Image
      style={styles.avater}
      source={props.uimg}/>
      <Text style={styles.name}>{props.uname}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper:{
    marginLeft:16,
    marginRight:16,
    marginTop:10,
    marginBottom:5,
  },
  avater:{
    width:48,
    height:48,
    borderWidth:2,
    borderRadius:50,
    backgroundColor:'#fff',
    borderColor:'#fff',
  },
  name:{
    fontSize:12,
    alignSelf:'center',
  },
});

export default TList;