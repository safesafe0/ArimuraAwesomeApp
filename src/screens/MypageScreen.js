import React, { useContext } from 'react';
import {
  StyleSheet, 
  View, 
  Text,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../components/Context';

function MypageScreen() {
  const {signedOut} = useContext(AuthContext);

  function signOut() {
    auth().signOut();
    signedOut();
    console.log('User LogOut!');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mypage</Text>
      <Button title="signOut" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 24,
  },
});

export default MypageScreen;