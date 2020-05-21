import React, { memo } from 'react';
import {
  StyleSheet, 
  View, 
  Text,
  TouchableHighlight,
} from 'react-native';

// function renderPost(post){
//   return(
//     <TouchableHighlight onPress={()=>{props.navigation.navigate('PostDetail')}}>
//       <View style={styles.postListItem}>
//         <Text style={styles.postTitle}>{memo.title}</Text>
//         <Text style={styles.postDate}>{memo.createdOn}</Text>
//       </View>
//     </TouchableHighlight>
//   )
// }

function PostList(props) {
  // const list=[];
  // props.postList.forEach(function(post){
  //   list.push(renderPost(post));
  // });
  
  return (
    <View style={styles.postList}>
      {/* {list} */}
      <View style={styles.postListItem}>
        <Text style={styles.postTitle}>タイトル</Text>
        <Text style={styles.postDate}>2020/05/05</Text>
      </View>
      <View style={styles.postListItem}>
        <Text style={styles.postTitle}>タイトル</Text>
        <Text style={styles.postDate}>2020/05/05</Text>
      </View>
      <View style={styles.postListItem}>
        <Text style={styles.postTitle}>タイトル</Text>
        <Text style={styles.postDate}>2020/05/05</Text>
      </View>
      <View style={styles.postListItem}>
        <Text style={styles.postTitle}>タイトル</Text>
        <Text style={styles.postDate}>2020/05/05</Text>
      </View>
      <View style={styles.postListItem}>
        <Text style={styles.postTitle}>タイトル</Text>
        <Text style={styles.postDate}>2020/05/05</Text>
      </View>
    </View>
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

export default PostList;
