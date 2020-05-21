import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import CircleButton from '../elements/CircleButton';
import firestore from '@react-native-firebase/firestore';

// `users/${currentUser.uid}/posts`

async function post(title) {
  await firestore()
    .collection('posts')
    .add({
      body: title,
      createdOn: '2020-05-13',
    })
    .then(function (docRef) {
      console.log(docRef.id);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function PostScreen() {
  const [title, setTitle] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.postInput}
        multiline
        value={title}
        onChangeText={setTitle}
      />
      <CircleButton
        onPress={() => {
          post(title);
        }}>
        send
      </CircleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  postInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
  },
});

export default PostScreen;
