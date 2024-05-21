import React from 'react';
import { View, Text, FlatList, Button, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../redux/favoritesSlice';

const FavoriteCharactersScreen = ({ navigation }) => {
  const favorites = useSelector(state => state.favorites.favoriteCharacters);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (character) => {
    Alert.alert(
      'Remove Favorite',
      `Are you sure you want to remove ${character.name} from favorites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => dispatch(removeFavorite(character)) },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
      <TouchableOpacity onPress={() => navigation.navigate('CharacterDetail', { characterUrl: item.url })}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
      <Button title="Remove" onPress={() => handleRemoveFavorite(item)} />
    </View>
  );

  return (
    <View>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default FavoriteCharactersScreen;
