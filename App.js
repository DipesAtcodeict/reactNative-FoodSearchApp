import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchScreen from './src/screens/SearchScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';

import ResultsShowScreen from './src/screens/ResultsShowScreen';

const navigator = createStackNavigator(
  {
    Search: SearchScreen,
    ResultsShow: ResultsShowScreen,
  },
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      title: 'Foodyfull',
      headerTitleAlign: 'center',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#35ab68',
      },
      headerLeft: () => (
        <MaterialCommunityIcons name='food' style={styles.iconLeft} />
      ),
    },
  }
);

const styles = StyleSheet.create({
  iconLeft: {
    color: '#ffa500',
    fontSize: 40,
    marginLeft: 35,
  },
});

export default createAppContainer(navigator);
