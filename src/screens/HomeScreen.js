import React from 'react';
import {
  StyleSheet, 
  View, 
  Text,
} from 'react-native';

function HomeScreen() {
  function sleep(time){
    new Promise((resolve)=> setTimeout(resolve, time));
    // console.log('sleptLog', val);
    }
    
    async function sleptLog(val){
      sleep(10000);
      console.log('sleptLog', val);
    };
    
    const arr = [1, 2, 3,4,5,6,7,8,9,10];
    
    // async function testFunc(){
    //   for(let item of arr) await sleep(item);
    //   console.log('done!')
    // };
    
    async function testFunc(){
      await Promise.all(arr.map(async item => await sleptLog(item)))
      console.log('done!')
    };
  return (
    <View style={styles.container}>
      <Text style={styles.title} onPress={()=>testFunc()}>HOME</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    // alignItems:'center',
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 24,
  },
});

export default HomeScreen;