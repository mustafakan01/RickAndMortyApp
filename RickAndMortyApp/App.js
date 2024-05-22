import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store } from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import EpisodeScreen from './src/screens/EpisodeScreen';
import CharacterScreen from './src/screens/CharacterScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Rick and Morty Bölümleri' }} />
          <Stack.Screen name="Episode" component={EpisodeScreen} options={{ title: 'Bölüm Detayları' }} />
          <Stack.Screen name="Character" component={CharacterScreen} options={{ title: 'Karakter Detayları' }} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favori Karakterler' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
