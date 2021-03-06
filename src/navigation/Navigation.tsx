import * as React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListScreen } from '../screens/ListScreen';
import * as routes from './routes';
import { EditScreen } from '../screens/EditScreen';
import { Todo } from '../redux/actions';
import { Button } from '../components/Button';

type RootStackParamList = {
  NAVIGATION_LIST_SCREEN: undefined;
  NAVIGATION_EDIT_SCREEN: {
    title?: string;
    item?: Todo;
  };
};

export type EditScreenRouteProp = RouteProp<
  RootStackParamList,
  'NAVIGATION_EDIT_SCREEN'
>;

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

const RootStack = () => (
  <Stack.Navigator
    screenOptions={() => ({
      headerBackTitleVisible: false,
    })}>
    <Stack.Screen
      name={routes.NAVIGATION_LIST_SCREEN}
      component={ListScreen}
      options={({ navigation }) => ({
        title: 'Todo List',
        headerRight: () => (
          <Button
            onPress={() => {
              navigation.navigate(routes.NAVIGATION_EDIT_SCREEN);
            }}
            title="Add"
          />
        ),
      })}
    />
    <Stack.Screen
      name={routes.NAVIGATION_EDIT_SCREEN}
      component={EditScreen}
      options={({ route }) => ({
        title: route.params?.title ?? 'New Todo Item',
      })}
    />
  </Stack.Navigator>
);
