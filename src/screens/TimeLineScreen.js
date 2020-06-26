import React, {useState, useCallback} from 'react';
import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {UidContext} from '../components/Context';
import Post from '../elements/Post';
import CircleButton from '../elements/CircleButton';

function TimeLineScreen({navigation}) {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    useCallback(() => {
      firestore()
        .collectionGroup('posts')
        .orderBy('createdAt', 'desc')
        .onSnapshot(async (querySnapshot) => {
          const postList = [];
          for(let doc of querySnapshot.docs){
            getPost(postList,doc)}
          setPostList(postList);
          setLoading(false);
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
  function getPost(postList,doc) {
    firestore()
      .collection('public')
      .doc('v1')
      .collection('users')
      .doc(doc.get('uid'))
      .onSnapshot((documentSnapshot) => {
        postList.push({
          ...doc.data(),
          uid:doc.get('uid'),
          uname:documentSnapshot.get('nickname'),
          uimg:documentSnapshot.get('img'),
          id: doc.id,
        })
      });
  }
  if (loading) {
    return <ActivityIndicator />
  }
  return (
    <UidContext.Consumer>
      {(state) => (
        <View style={styles.container}>
          <FlatList
            data={postList}
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
    width: '100%',
  },
});
export default TimeLineScreen;