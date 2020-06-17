import 'react-native-gesture-handler';
import React, {useReducer, useMemo, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthContext, UidContext} from './src/components/Context';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import MypageScreen from './src/screens/MypageScreen';
import HomeScreen from './src/screens/HomeScreen';
import TimeLineScreen from './src/screens/TimeLineScreen';
import PostScreen from './src/screens/PostScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';

const App: () => React$Node = () => {
  const Tab = createMaterialBottomTabNavigator();
  const HomeStack = createStackNavigator();
  const TimeLineStack = createStackNavigator();
  const SigninStack = createStackNavigator();
  const RootStack = createStackNavigator();
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            uid: action.uid,
            displayName: action.name,
            URL: action.photoURL,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignin: true,
            uid: action.uid,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignin: false,
            uid: '',
          };
      }
    },
    {
      isLoading: true,
      isSignin: false,
      uid: '',
      displayName: '',
      URL: '',
    },
  );
  useEffect(() => {
    const user = auth().currentUser;
    let userToken;
    let name;
    let photoURL;
    if (user) {
      userToken = user.uid;
      name = user.displayName;
      photoURL = user.photoURL;
      console.log(userToken);
    } else {
      console.log('user is not logined!');
      userToken = '';
    }
    dispatch({
      type: 'RESTORE_TOKEN',
      uid: userToken,
      displayName: name,
      URL: photoURL,
    });
  }, []);

  const authContext = useMemo(
    () => ({
      signedIn: (userToken) => dispatch({type: 'SIGN_IN', uid: userToken}),
      signedOut: () => dispatch({type: 'SIGN_OUT'}),
    }),
    [],
  );
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
      </HomeStack.Navigator>
    );
  }
  function TimeLineStackScreen() {
    return (
      <TimeLineStack.Navigator>
        <TimeLineStack.Screen name="TimeLine" component={TimeLineScreen} />
        <TimeLineStack.Screen name="Detail" component={PostDetailScreen} />
      </TimeLineStack.Navigator>
    );
  }
  function SigninStackScreen() {
    return (
      <SigninStack.Navigator>
        {state.uid === '' ? (
          <>
            <SigninStack.Screen name="Signin" component={SigninScreen} />
            <SigninStack.Screen name="Login" component={LoginScreen} />
            <SigninStack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <>
            <SigninStack.Screen name="Mypage" component={MypageScreen} />
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
          </RootStack.Navigator>
        </NavigationContainer>
      </UidContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
