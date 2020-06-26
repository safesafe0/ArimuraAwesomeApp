import React,{useState,useCallback,useLayoutEffect} from 'react';
import { 
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Reply from '../elements/Reply';
import Detail from '../elements/Detail';

function DetailScreen({route}){
  const navigation = useNavigation();
  const {item}=route.params;
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  function dateString(date){
    if (date == null) { return ''; }
    const dateObject = date.toDate();
    return dateObject.toISOString().split('T')[0];
  };
  useFocusEffect(
    useCallback(() => {
      firestore()
      .collection('public')
      .doc('v1')
      .collection('users')
      .doc(item.uid)
      .collection('posts')
      .doc(item.id)
      .collection('replys')
      .orderBy('createdAt', 'desc')
      .onSnapshot(async(querySnapshot) => {
        let tempList = [];
        await Promise.all(querySnapshot.docs.map(async doc => await getUser(doc,tempList)));
        setPostList(tempList);
        setLoading(false);
      });
    }, []),
  );
  async function getUser(doc,tempList) {
    let uid=doc.get('uid');
    let documentSnapshot=await firestore()
    .collection('public')
    .doc('v1')
    .collection('users')
    .doc(uid)
    .get();
    let uname=documentSnapshot.get('nickname');
    let uimg=documentSnapshot.get('img');
    tempList.push({
      ...doc.data(),
      uid:uid,
      uname:uname,
      uimg:uimg,
      id: doc.id,
    })
  }
  if (loading) {
    console.log('b')
    return <ActivityIndicator />
  }
  return (
    <View>
      <ScrollView nestedScrollEnabled>
        <View style={{flex:1,paddingBottom:60}}>
          <Detail {...item}/>
          <FlatList
          data={postList}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <Reply {...item} />}
          nestedScrollEnabled
          />
        </View>
      </ScrollView>
      <TouchableOpacity
      style={styles.tab}
      onPress={()=>{navigation.navigate('Reply',{item:item})}}>
        <View style={styles.tabLeft}></View>
        <View style={styles.tabCenter}>
          <Text style={styles.tabText}>回答する</Text>
        </View>
        <View style={styles.tabRight}>
          <MaterialCommunityIcons
            name={'pencil-plus-outline'}
            color={'#fff'}
            size={37}/>
        </View>
      </TouchableOpacity>
    </View>
      // {postList.map((item)=>{
      //   console.log('a')
      //   console.log(item)
      //   return (
      //     <View key={item.id}>
      //       <Reply {...item}/>
      //     </View>
      //   )
      // })}
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginBottom:60,
  },
  tab:{
    width:'100%',
    height:60,
    position:'absolute',
    bottom:0,
    alignSelf:'center',
    flexDirection: 'row',
    backgroundColor:'#3d3',
  },
  tabLeft:{
    width:'20%',
    justifyContent:'center',
    alignItems:'center',
  },
  tabCenter:{
    width:'60%',
    justifyContent:'center',
    alignItems:'center',
  },
  tabRight:{
    width:'20%',
    justifyContent:'center',
    alignItems:'center',
  },
  tabText:{
    color:'#fff',
    fontSize:23,
  },
});
export default DetailScreen;