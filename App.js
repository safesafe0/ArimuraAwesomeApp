import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import HomeScreen from './src/screens/HomeScreen';
import TimeLineScreen from './src/screens/TimeLineScreen';
import PostScreen from './src/screens/PostScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const TimeLineStack = createStackNavigator();
const SigninStack = createStackNavigator();

function HomeStackScreen(){
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Home" 
        component={HomeScreen} 
      />
    </HomeStack.Navigator>
  )
}

function TimeLineStackScreen(){
  return(
    <TimeLineStack.Navigator>
      <TimeLineStack.Screen 
        name="TimeLine" 
        component={TimeLineScreen} 
      />
      <TimeLineStack.Screen 
        name="Post" 
        component={PostScreen} 
      />
      <TimeLineStack.Screen 
        name="Detail" 
        component={PostDetailScreen} 
      />
    </TimeLineStack.Navigator>
  )
}

function SigninStackScreen(){
  return(
    <SigninStack.Navigator>
      <SigninStack.Screen 
        name="Signin" 
        component={SigninScreen} 
      />
      <SigninStack.Screen 
        name="Login" 
        component={LoginScreen} 
      />
      <SigninStack.Screen 
        name="Signup" 
        component={SignupScreen} 
      />
    </SigninStack.Navigator>
  )
}


const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route})=>({
          tabBarIcon:({color,size})=>{
            const icons={
            Home:'home',
            TimeLine:'twitter',
            Signin:'account',
            };
            return (
              <MaterialCommunityIcons
              name={icons[route.name]}
              color={color}
              size={26}
              />
            );
          },
        })}
        shifting={true}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStackScreen}
        />
        <Tab.Screen
          name="TimeLine" 
          component={TimeLineStackScreen}
        />
        <Tab.Screen 
          name="Signin"
          component={SigninStackScreen} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;
