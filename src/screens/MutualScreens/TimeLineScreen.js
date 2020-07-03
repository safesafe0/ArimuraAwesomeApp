import React, { useCallback , useReducer } from 'react';
import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {UidContext} from '../../components/Context';
import Post from '../../elements/Post';
import CircleButton from '../../elements/CircleButton';

function TimeLineScreen({navigation}) {
  const [thisState, dispatch] = useReducer(
    (prevState,action) => {
      return {
        ...prevState,
        postList: action.postList,
        loading: false,
      }
    },
    {
      postList:[],
      loading:true,
    },
  );
  useFocusEffect(
    useCallback(() => {
      const subscriber=firestore()
      .collectionGroup('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(async(querySnapshot) => {
        let tempList = [];
        await Promise.all(querySnapshot.docs.map(async doc => await getUser(doc,tempList)));
        dispatch({postList: tempList});
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
  function toggleButton(uid) {
    {
      uid === ''
        ? (navigation.navigate('Signin'), alert('Please Login!'))
        : navigation.navigate('Post', uid);
    }
  }
  if (thisState.loading) {
    return <ActivityIndicator />
  }
  return (
    <UidContext.Consumer>
      {(state) => (
        <View style={styles.container}>
          <FlatList
            data={thisState.postList}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <Post {...item} />}
          />
          <CircleButton
            onPress={() => {
              toggleButton(state.uid);
            }}>
            plus
          </CircleButton>
        </View>
      )}
    </UidContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
  },
});
export default TimeLineScreen;