import React,{useState} from 'react';
import { 
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageView from "react-native-image-viewing";

function Post(props){
  const [visible,setVisible]=useState(false)
  const [index,setIndex]=useState(0)
  const [images,setImages]=useState([])
  const navigation = useNavigation();
  const dateString = (date) => {
    if (date == null) { return ''; }
    const dateObject = date.toDate();
    return dateObject.toISOString().split('T')[0];
  };
  function ViewImage(index){
    setVisible(true)
    setIndex(index)
    let list=[]
    props.image.forEach((item)=>{
      list.push({
        uri:item.uri,
        // size:item.size,
        // width:item.width,
        // height:item.height,
      })
    })
    setImages(list)
  }
  return(
    <>
    <TouchableOpacity
    onStartShouldSetResponderCapture={true}
    style={styles.postListItem}
    onPress={()=>navigation.navigate('Detail',{item:props})}
    >
      <View style={styles.wrapper}>
        <View style={styles.left}>
          <Image
          rounded
          style={styles.avatar}
          source={props.uimg}/>
        </View>
        <View style={styles.right}>
          <View style={styles.info}>
            <View style={{width:'80%'}}>
              <View style={styles.info}>
                <Text style={styles.name}>{props.uname}</Text>
                <Text style={styles.time}>{dateString(props.createdAt)}</Text>
              </View>
              <Text style={styles.subject}>科目：{props.subject}　分野：{props.field}</Text>
            </View>
            <MaterialCommunityIcons
            style={styles.icon}
            name='seal'/>
          </View>
          {/* <Text style={styles.category}>{props.hashtag}</Text> */}
          <View style={styles.div}>
            <Text style={styles.category}>出典：{props.type}</Text>
            <Text style={styles.category}>書名：{props.bookName}</Text>
          </View>
          <Text style={styles.body}>{props.body}</Text>
          {props.image1==null&&props.image2==null?null:(
            <View style={styles.imagewrapper}>
              {props.image2?(
                <Image style={styles.image} source={{uri:props.image1}}/>
              ):null}
              {props.image1?(
                <Image style={styles.image} source={{uri:props.image2}}/>
              ):null}
            </View>
          )}
          <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={props.image}
          keyExtractor={(item) => item.id}
          renderItem={({item,index}) => (
            <TouchableOpacity
            onPress={()=>ViewImage(index)}>
              <Image style={styles.img} source={{uri:item.uri}}/>
            </TouchableOpacity>
          )}
          />
          {/* <Text style={styles.text1}>回答</Text> */}
          <Text style={styles.text2}>未回答</Text>
        </View>
      </View>
    </TouchableOpacity>
    <ImageView
    images={images}
    imageIndex={index}
    visible={visible}
    onRequestClose={() => setVisible(false)}
    />
    </>
  );
}

const styles = StyleSheet.create({
  icon:{
    fontSize:50,
    color:'#fd5',
    alignSelf:'flex-end',
    top:-10,
  },
  postListItem: {
    marginLeft:20,
    marginRight:20,
    marginTop:10,
    marginBottom:5,
    paddingLeft: 12,
    paddingRight: 18,
    paddingTop: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  wrapper:{
    flexDirection: 'row',
  },
  avatar:{
    width:50,
    height:50,
    borderWidth:2,
    borderRadius:50,
    backgroundColor:'#fff',
    borderColor:'#fff',
  },
  left:{
    width:'18%',
  },
  right:{
    width:'82%',
  },
  info:{
    width:'100%',
    flexDirection: 'row',
    // alignItems:'baseline',
    marginTop:3,
    marginBottom:3,
  },
  name:{
    fontWeight:'bold',
    fontSize: 17,
  },
  time:{
    fontSize: 14,
    marginLeft:10,
  },
  subject:{
    fontSize: 15,
    marginBottom:2,
  },
  div:{
    marginBottom:8,
  },
  category:{
    fontSize: 15,
    marginBottom:2,
  },
  body:{
    fontSize: 14,
    marginBottom:10,
  },
  imagewrapper:{
    alignItems:"center",
    flexDirection: 'row',
    marginBottom:10,
  },
  image:{
    width:'50%',
    height:100,
    alignSelf:'center',
  },
  bottom:{
    flexDirection: 'row',
  },
  text1:{
    // alignSelf:'flex-start',
  },
  text2:{
    alignSelf:'flex-end',
    // marginRight:10,
  },
  img: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
});

export default React.memo(Post);