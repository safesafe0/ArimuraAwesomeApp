import React, { useState,useLayoutEffect,useContext,useCallback } from 'react';
import {
  StyleSheet, 
  View, 
  Text,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {AuthContext,UidContext} from '../../components/Context';
import { useFocusEffect } from '@react-navigation/native';
import Post from '../../elements/Post';

function TMypageScreen({navigation}) {
  const {signout} = useContext(AuthContext);
  const {uid,nickname,img}=useContext(UidContext);
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
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
        onPress={() =>{navigation.navigate('TSetting')}}>
          <MaterialCommunityIcons
          name={'settings-outline'}
          color={'#555'}
          size={35}
          />
        </TouchableOpacity>)
    });
  }, [navigation]);
  useFocusEffect(
    useCallback(()=>{
      const subscriber=firestore()
      .collection('public')
      .doc('v1')
      .collection('users')
      .doc(uid)
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        let tempList = [];
        querySnapshot.forEach((doc)=>{
          tempList.push({
            ...doc.data(),
            uname:name,
            uimg:img,
            id:doc.id,
          })
        })
        dispatch({postList:tempList})
      });
      return ()=>subscriber();
    },[]),
  );
  function signOut() {
    auth().signOut();
    signout();
    console.log('User LogOut!');
  }
  if (thisState.loading) {
    return <ActivityIndicator />;
  }
  return (
    <UidContext.Consumer>
      {(state) => (
        <View>
          <FlatList
          data={thisState.postList}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <Post {...item} />}
          ListHeaderComponent={
            <View style={styles.container}>
              <Image
              style={styles.header}
              source={state.header}/>
              <Image
              style={styles.avatar}
              source={state.img}/>
              <Text style={styles.nickname}>{state.nickname}</Text>
              <Text style={styles.body}>{state.grade}</Text>
              <Text style={styles.body}>{state.university}在学</Text>
              <Text style={styles.body}>{state.major}{state.course}</Text>
              <Text style={styles.bio}>{state.bio}</Text>
              <Button title="signOut" onPress={signOut} />
              <Text style={styles.p}>いままでの解答一覧</Text>
            </View>
          }
          />
        </View>
    )}
    </UidContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    paddingBottom:30,
  },
  header:{
    width:'100%',
    height:200,
  },
  avatar:{
    backgroundColor:'#fff',
    borderColor:'#fff',
    borderWidth:2,
    borderRadius:50,
    width:100,
    height:100,
    top:-50,
  },
  nickname:{
    top:-30,
    fontSize: 20,
    marginBottom: 12,
  },
  body:{
    top:-30,
    fontSize: 15,
    marginBottom: 4,
  },
  bio:{
    top:-30,
    fontSize: 15,
    // marginBottom: 4,
  },
  p:{
    marginLeft:30,
    marginTop:10,
    alignSelf:'flex-start',
  },
});

export default TMypageScreen;