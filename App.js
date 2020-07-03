import 'react-native-gesture-handler';
import React, {useReducer, useMemo, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import useBeforeFirstRender from './src/components/useBeforeFirstRender';
import {AuthContext, UidContext} from './src/components/Context';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import TimeLineScreen from './src/screens/MutualScreens/TimeLineScreen';
import NotificationScreen from './src/screens/MutualScreens/NotificationScreen';
import PostScreen from './src/screens/MutualScreens/PostScreen';
import DetailScreen from './src/screens/MutualScreens/DetailScreen';
import ReplyScreen from './src/screens/MutualScreens/ReplyScreen';
import TSignupScreen from './src/screens/TeacherScreens/TSignupScreen';
import SSignupScreen from './src/screens/StudentScreens/SSignupScreen';
import THomeScreen from './src/screens/TeacherScreens/THomeScreen';
import SHomeScreen from './src/screens/StudentScreens/SHomeScreen';
import TMypageScreen from './src/screens/TeacherScreens/TMypageScreen';
import SMypageScreen from './src/screens/StudentScreens/SMypageScreen';
import TSettingScreen from './src/screens/TeacherScreens/TSettingScreen';
import SSettingScreen from './src/screens/StudentScreens/SSettingScreen';

const App: () => React$Node = () => {
  const Tab = createMaterialBottomTabNavigator();
  const HomeStack = createStackNavigator();
  const TimeLineStack = createStackNavigator();
  const NotificationStack = createStackNavigator();
  const SigninStack = createStackNavigator();
  const RootStack = createStackNavigator();
  const [state, dispatch] = useReducer(
    (prevState,action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            uid: action.uid,
            nickname: action.nickname,
            img: action.img,
            header: action.header,
            bio: action.bio,
            grade: action.grade,
            tors: action.tors,
            firstSchool: action.firstSchool,
            university: action.university,
            major: action.major,
            course: action.course,
            isSignout:false,
          };
        case 'UPDATE_TOKEN':
          return {
            ...prevState
          }
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
          };
      }
    },
    {
      uid: null,
      nickname: '',
      img: null,
      header: null,
      bio: '',
      grade: '',
      tors: 's',
      firstSchool: '',
      university: '',
      major: '',
      course: '',
      isSignout: true,
    },
  );
  function getUser() {
    const user = auth().currentUser;
    console.log(user);
    if (user) {
      firestore().collection('public').doc('v1').collection('users').doc(user.uid).onSnapshot((doc)=>{
        let nickname=doc.get('nickname')
        let img=doc.get('img')
        if(img){}else{img=(require('./src/images/Q-LINE-icon.png'))}
        let header=doc.get('header')
        if(header){}else{header=(require('./src/images/header.png'))}
        let bio=doc.get('bio')
        let grade=doc.get('grade')
        let tors=doc.get('tors')
        console.log(tors)
        switch(tors) {
          case 't': {
            let university=doc.get('university')
            let major=doc.get('major')
            let course=doc.get('course')
            dispatch({
              type: 'RESTORE_TOKEN',
              uid: user.uid,
              nickname: nickname,
              img: img,
              header: header,
              bio: bio,
              grade: grade,
              tors: tors,
              firstSchool:'',
              university: university,
              major: major,
              course: course,
            })
          }
          case 's':{
            let firstSchool=doc.get('firstSchool')
            dispatch({
              type: 'RESTORE_TOKEN',
              uid: user.uid,
              nickname: nickname,
              img: img,
              header: header,
              bio: bio,
              grade: grade,
              tors: tors,
              firstSchool:firstSchool,
              university: '',
              major: '',
              course: '',
          })
          }
        }
      })
    } else {
      console.log('user is not logined!');
    }
  };
  useBeforeFirstRender(()=>getUser());
  const authContext = useMemo(() => ({
    signin: () => dispatch({type: 'SIGN_IN'}),
    signout: () => dispatch({type: 'SIGN_OUT'}),
    update: ()=> dispatch({type: 'UPDATE_TOKEN'}),
    }),[],
  );
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        {state.tors==='s'?(
          <HomeStack.Screen name="Home" component={SHomeScreen} />
        ):(
          <HomeStack.Screen name="Home" component={THomeScreen} />
        )}
      </HomeStack.Navigator>
    );
  }
  function TimeLineStackScreen() {
    return (
      <TimeLineStack.Navigator>
        <TimeLineStack.Screen name="TimeLine" component={TimeLineScreen} />
      </TimeLineStack.Navigator>
    );
  }
  function NotificationStackScreen() {
    return (
      <NotificationStack.Navigator>
        <NotificationStack.Screen name="Notification" component={NotificationScreen} />
      </NotificationStack.Navigator>
    );
  }
  function SigninStackScreen() {
    return (
      <SigninStack.Navigator>
        {state.uid === null ? (
          <>
            <SigninStack.Screen name="Signin" component={SigninScreen} />
            <SigninStack.Screen name="Login" component={LoginScreen} />
            <SigninStack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <>
          {state.tors==='s'?(
          <>
            <SigninStack.Screen name="Mypage" component={SMypageScreen}/>
          </>
          ):(
            <>
              <SigninStack.Screen name="Mypage" component={TMypageScreen}/>
            </>
          )}
          </>
        )}
      </SigninStack.Navigator>
    );
  }
  function MainTabs() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            const icons = {
              Home: 'home',
              TimeLine: 'twitter',
              Notification: 'bell',
              Signin: 'account',
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
        shifting={true}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="TimeLine" component={TimeLineStackScreen} />
        <Tab.Screen name="Notification" component={NotificationStackScreen} />
        <Tab.Screen name="Signin" component={SigninStackScreen} />
      </Tab.Navigator>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <UidContext.Provider value={state}>
        <NavigationContainer>
          <RootStack.Navigator mode="modal">
            <RootStack.Screen
              name="Main"
              component={MainTabs}
              options={{headerShown: false}}
            />
            <RootStack.Screen name="Post" component={PostScreen} />
            <RootStack.Screen name="Detail" component={DetailScreen} />
            <RootStack.Screen name="Reply" component={ReplyScreen} />
            <RootStack.Screen name="TSignup" component={TSignupScreen} />
            <RootStack.Screen name="SSignup" component={SSignupScreen} />
            <SigninStack.Screen name="SSetting" component={SSettingScreen}options={{headerTitle:'登録情報の更新'}}/>
            <SigninStack.Screen name="TSetting" component={TSettingScreen}options={{headerTitle:'登録情報の更新'}}/>
          </RootStack.Navigator>
        </NavigationContainer>
      </UidContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
