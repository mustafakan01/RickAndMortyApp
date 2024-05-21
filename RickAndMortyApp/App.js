import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import EpisodeDetailScreen from './src/screens/EpisodeDetailScreen';
import FavoriteCharactersScreen from './src/screens/FavoriteCharactersScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="EpisodeDetail" component={EpisodeDetailScreen} />
          <Stack.Screen name="Favorites" component={FavoriteCharactersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
