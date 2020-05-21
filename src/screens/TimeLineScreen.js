import React,{useState,useEffect} from 'react';
import { 
  FlatList,
  StyleSheet,
  View, 
} from 'react-native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import Post from '../components/Post'
import PostList from '../components/PostList';
import CircleButton from '../elements/CircleButton';

function TimeLineScreen (props){
  const ref=firestore().collection('posts');
  const[postList,setpostList]=useState([]);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    return ref.onSnapshot(querySnapshot=>{
      const list=[];
      querySnapshot.forEach(doc=>{
        const {body, complete}=doc.data();
        list.push({
          id:doc.id,
          body,
          complete,
        });
      });
      
      setpostList(list);

      if(loading){
        setLoading(false);
      }
    });
  },[]);

  if(loading){
    return null;
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={{flex:1}}
        data={postList}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=><Post {...item}/>}
      />
      <PostList postList={postList}navigation={props.navigation}/>
      <CircleButton onPress={() => {auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is loged in.
    props.navigation.navigate('Post')
  } else {
    // No user is loged in.
    props.navigation.navigate('Signin')
  }
});}}>plus</CircleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
  },
});
export default TimeLineScreen;