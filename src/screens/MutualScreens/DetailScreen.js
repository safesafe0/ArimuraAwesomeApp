import React,{ useCallback ,useReducer,useState,useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {UidContext} from '../../components/Context';
import Reply from '../../elements/Reply';
import Detail from '../../elements/Detail';

function DetailScreen({route}){
  const {uid}=useContext(UidContext);
  const [body, setBody] = useState(null);
  const [image1, setImage1] = useState(null);
  const [source1, setSource1] = useState(null);
  const navigation = useNavigation();
  const {item}=route.params;
  const [state, dispatch] = useReducer(
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
      .collection('public')
      .doc('v1')
      .collection('users')
      .doc(item.uid)
      .collection('posts')
      .doc(item.id)
      .collection('replys')
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
    let uimg=documentSnapshot.get('img');
    tempList.push({
      ...doc.data(),
      uid:uid,
      uname:uname,
      uimg:uimg,
      id: doc.id,
    })
  }
  if (state.loading) {
    console.log('b')
    return <ActivityIndicator />
  }
  return (
    <View style={{flex:1,paddingBottom:60,backgroundColor:'#fff'}}>
      <FlatList
      data={state.postList}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => <Reply {...item} />}
      ListHeaderComponent={<Detail {...item}/>}
      />
      <View style={styles.tab}>
        <View></View>
        <View style={styles.tabLeft}>
          <MaterialCommunityIcons
            name={'camera'}
            color={'#27fd'}
            size={37}/>
        </View>
        <TextInput
        style={styles.tabCenter}
        multiline
        placeholder='返信する'
        value={body}
        onChangeText={setBody}
        />
        <TouchableOpacity style={styles.tabRight}>
          <MaterialCommunityIcons
            name={'send'}
            color={'#27fd'}
            size={37}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginBottom:60,
  },
  tab:{
    width:'100%',
    maxHeight:90,
    position:'absolute',
    bottom:0,
    flexDirection: 'row',
    borderTopWidth:2,
    borderTopColor:'#ddd',
    backgroundColor:'#fff',
  },
  tabLeft:{
    width:'15%',
    justifyContent:'center',
    alignItems:'center',
    borderRightWidth:1,
    borderRightColor:'#0007',
  },
  tabCenter:{
    width:'70%',
    justifyContent:'center',
    alignItems:'flex-start',
    borderLeftWidth:1,
    borderLeftColor:'#0007',
    borderRightWidth:1,
    borderRightColor:'#0007',
    paddingLeft:10,
  },
  tabRight:{
    width:'15%',
    justifyContent:'center',
    alignItems:'center',
  },
  tabText:{
    // color:'#fff',
    // fontSize:23,
  },
});
export default DetailScreen;