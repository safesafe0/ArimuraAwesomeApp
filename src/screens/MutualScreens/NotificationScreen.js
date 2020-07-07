import React, { useCallback , useReducer ,useContext } from 'react';
import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {UidContext} from '../../components/Context';
import Notification from '../../elements/Notification';

function NotificationScreen() {
  const {uid,tors}=useContext(UidContext);
  const [thisState, dispatch] = useReducer(
    (prevState,action) => {
      return {
        ...prevState,
        notionList: action.notionList,
        loading: false,
      }
    },
    {
      notionList:[],
      loading:true,
    },
  );
  useFocusEffect(
    useCallback(() => {
      const subscriber=firestore()
      .collection('public')
      .doc('v1')
      .collection('users')
      .doc(uid)
      .collection('notifications')
      .orderBy('createdAt', 'desc')
      .onSnapshot(async(querySnapshot) => {
        let tempList = [];
        console.log(querySnapshot.docs)
        await Promise.all(querySnapshot.docs.map(async doc => await getUser(doc,tempList)));
        dispatch({notionList: tempList});
      });
      return ()=>subscriber();
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
    let uimg;
    {documentSnapshot.get('img')==null?(
      uimg=require('../../images/Q-LINE-icon.png')
    ):(
      uimg={uri:documentSnapshot.get('img')}
    )}
    tempList.push({
      ...doc.data(),
      uid:uid,
      uname:uname,
      uimg:uimg,
      id: doc.id,
    })
  }
  if (thisState.loading) {
    return <ActivityIndicator />
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={thisState.notionList}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Notification {...item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
  },
});
export default NotificationScreen;