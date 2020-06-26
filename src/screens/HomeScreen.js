import React,{useCallback,useState} from 'react';
import {
  StyleSheet, 
  View, 
  Text,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import TList from '../elements/TList';

function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [ninkiList,setNinkiList]=useState([]);
  useFocusEffect(
    useCallback(()=>{
      let nickname,img,college,major;
      firestore()
      .collection('public')
      .doc('v1')
      .collection('user')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot)=>{
        const tempList=[];
        querySnapshot.forEach((doc)=>{
          nickname=doc.get('nickname')
          grade=doc.get('grade')
          college=doc.get('college')
          major=doc.get('major')
          {doc.get('img') == null?(
            img=require('../images/Q-LINE-icon.png')
          ):(
            img={uri:doc.get('img')}
          )}
          tempList.push({
            ...doc.data(),
            uid:doc.get('uid'),
            uname:nickname,
            uimg:img,
            id: doc.id,
          })
        })
        setNinkiList(tempList);
        setLoading(false);
      })
    },[]),
  )
  if (loading) {
    return <ActivityIndicator />
  }
  return (
    <ScrollView nestedScrollEnabled>
      <View style={styles.container}>
        <View style={styles.space}/>
        <Text style={styles.section}>人気講師</Text>
        <FlatList
          horizontal
          data={ninkiList}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <TList {...item} />}
        />
        <Text style={styles.title}>HOME</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    width:'100%',
  },
  space:{
    width:'100%',
    height:50,
    backgroundColor:'#00f',
  },
  section:{
    fontSize:17,
    fontWeight:'bold',
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 24,
  },
});

export default HomeScreen;