import React from 'react';

import { useTheme } from 'styled-components';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IPostDetails from '@models/PostDetails';

import PostDetails from '@pages/Post/Details';
import PostList from '@pages/Post/List';

export type StackParamsList = {
  PostDetails: IPostDetails;
  PostList: undefined;
};

const Stack = createNativeStackNavigator<StackParamsList>();

const Routes = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="PostList"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTintColor: theme.white900,
        headerStyle: {
          backgroundColor: theme.color.primary.main,
        },
        headerTitleStyle: {
          fontFamily: 'Barlow-SemiBold',
        },
      }}
    >
      <Stack.Screen
        component={PostList}
        name="PostList"
        options={{ headerTitle: 'Publicações' }}
      />
      <Stack.Screen
        component={PostDetails}
        name="PostDetails"
        options={{ headerTitle: 'Detalhes da publicação' }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
