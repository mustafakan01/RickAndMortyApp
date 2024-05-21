import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import HomeScreen from './src/screens/HomeScreen.js';
import EpisodeDetailScreen from './src/screens/EpisodeDetailScreen.js';
import CharacterDetailScreen from './src/screens/CharacterDetailScreen.js';
import FavoriteCharactersScreen from './src/screens/FavoriteCharactersScreen.js';
import { store } from './src/redux/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Rick & Morty Episodes' }} />
          <Stack.Screen name="EpisodeDetail" component={EpisodeDetailScreen} options={{ title: 'Episode Detail' }} />
          <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} options={{ title: 'Character Detail' }} />
          <Stack.Screen name="Favorites" component={FavoriteCharactersScreen} options={{ title: 'Favorite Characters' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
