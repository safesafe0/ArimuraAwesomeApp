import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {List} from 'react-native-paper';

function Post({id,body,complete}){
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
      title={body}
      onPress={()=>toggleComplete()}
      left={props=>(
        <List.Icon{...props}  icon={complete ? 'check':'cancel'}/>
      )}
    />
  );
}

export default React.memo(Post);