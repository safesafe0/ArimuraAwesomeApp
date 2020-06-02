import React from 'react';
import {
  StyleSheet, 
  View, 
  TouchableHighlight,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function CircleButton(props) {
  return(
    <TouchableHighlight 
    style={styles.container}
    onPress={props.onPress}
    underlayColor='transparent'
    >
      <View style={[styles.circleButton,props.style]}>
        <MaterialCommunityIcons 
        style={styles.icon}
        name={props.children}/>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container:{
    width:48,
    height:48,
    position: 'absolute',
    bottom: 32,
    right: 32,
  },
  circleButton:{
    width: 48,
    height: 48,
    backgroundColor: '#e31676',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    // iPhoneの場合
    shadowOffset: {width:0,height:2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    // androidの場合
    elevation:5,
  },
  icon:{
    fontSize:25,
    color:'#fff',
  },
});

export default CircleButton;