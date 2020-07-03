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
      firestore()
        .collectionGroup('posts')
        .orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          let tempList = [];
          for(let doc of querySnapshot.docs){
            getPost(tempList,doc)
          }
          dispatch({postList: tempList});
        });
    }, []),
  );
  function toggleButton(uid) {
    {
      uid === ''
        ? (navigation.navigate('Signin'), alert('Please Login!'))
        : navigation.navigate('Post', uid);
    }
  }
  function getPost(tempList,doc) {
    firestore()
      .collection('public')
      .doc('v1')
      .collection('users')
      .doc(doc.get('uid'))
      .onSnapshot((documentSnapshot) => {
        tempList.push({
          ...doc.data(),
          uid:doc.get('uid'),
          uname:documentSnapshot.get('nickname'),
          uimg:documentSnapshot.get('img'),
          id: doc.id,
        })
      });
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