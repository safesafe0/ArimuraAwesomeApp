import React from 'react';
import{ 
StyleSheet,
View,
}from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {List} from 'react-native-paper';

function Post({id,body,createdOn,complete}){
  async function toggleComplete(){
    await firestore()
    .collection('posts')
    .doc(id)
    .update({
      complete: !complete,
    });
  }

  return(
      <List.Item
        style={styles.postListItem}
        title={body}
        titleStyle={styles.postTitle}
        onPress={()=>toggleComplete()}
        // left={props=>(
        //   <List.Icon{...props}  icon={complete ? 'check':'cancel'}/>
        // )}
      />
  );
}

const styles = StyleSheet.create({
  postList: {
    width: '100%',
    flex: 1,
  },
  postListItem: {
    marginLeft:30,
    marginRight:30,
    marginTop:10,
    marginBottom:5,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  postTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  postDate: {
    fontSize: 12,
    color: '#a2a2a2',
  },
});

export default React.memo(Post);