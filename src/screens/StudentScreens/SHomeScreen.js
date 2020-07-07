import React,{ useCallback , useReducer } from 'react';
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
import TList from '../../elements/TList';

function SHomeScreen() {
  const [thisState, dispatch] = useReducer(
    (prevState,action) => {
      return {
        ninkiList: action.ninkiList,
        loading: false,
      }
    },
    {
      ninkiList:[],
      loading:true,
    },
  );
  useFocusEffect(
    useCallback(()=>{
      let nickname,img,college,major;
      const subscriber=firestore()
      .collection('public')
      .doc('v1')
      .collection('users')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot)=>{
        let tempList=[];
        querySnapshot.forEach((doc)=>{
          nickname=doc.get('nickname')
          // grade=doc.get('grade')
          // college=doc.get('college')
          // major=doc.get('major')
          {doc.get('img') == null ?(
            img=require('../../images/Q-LINE-icon.png')
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
        dispatch({ninkiList: tempList})
      })
      return () => subscriber();
    },[]),
  )
  if (thisState.loading) {
    return <ActivityIndicator />
  }
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <ScrollView nestedScrollEnabled>
        <View style={styles.container}>
          <View style={styles.space}/>
          <Text>生徒だよ</Text>
          <View style={styles.section}>
            <Text style={styles.caption}>新着講師</Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={thisState.ninkiList}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => <TList {...item} />}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.caption}>人気講師</Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={thisState.ninkiList}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => <TList {...item} />}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.caption}>人気講師</Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={thisState.ninkiList}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => <TList {...item} />}
            />
          </View>
          <Text style={styles.title}>HOME</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  space:{
    width:'100%',
    height:50,
    backgroundColor:'#9f6',
  },
  section:{
    marginTop:10,
    marginBottom:10,
  },
  caption:{
    fontSize:17,
    fontWeight:'bold',
    marginLeft:10,
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 24,
  },
});

export default SHomeScreen;