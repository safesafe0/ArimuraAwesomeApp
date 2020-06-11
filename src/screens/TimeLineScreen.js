import React, {useState, useCallback} from 'react';
import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {UidContext} from '../components/Context';
import Post from '../components/Post';
import CircleButton from '../elements/CircleButton';

function TimeLineScreen(props) {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [uid, setUid] = useState('');

  // useFocusEffect(
  //   useCallback(() => {
  //     const auther = auth().onAuthStateChanged(function (user) {
  //       if (user) {
  //         const uid = user.uid;
  //         setUid(uid);
  //         console.log(uid);
  //       } else {
  //         setUid('');
  //         console.log(uid);
  //       }
  //     });
  //     return auther;
  //   }, []),
  // );

  function toggleButton(uid) {
    {
      uid === ''
        ? (props.navigation.navigate('Signin'), alert('Please Login!'))
        : props.navigation.navigate('Post', uid);
    }
  }
  useFocusEffect(
    useCallback(() => {
      const subscriber = firestore()
        .collectionGroup('posts')
        .onSnapshot((querySnapshot) => {
          const postList = [];
          querySnapshot.forEach((documentSnapshot) => {
            postList.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setPostList(postList);
          setLoading(false);
        });
      return () => subscriber();
    }, []),
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <UidContext.Consumer>
      {state =>(
        <View style={styles.container}>
        <FlatList
          style={{flex: 1}}
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
