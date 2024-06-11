import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';

const CharacterScreen = ({ route }) => {
  const { character } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const isFavorite = favorites.some(fav => fav.id === character.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(character));
    } else {
      dispatch(addFavorite(character));
    }
  };

  return (
    <View>
      <Image source={{ uri: character.image }} style={{ width: 200, height: 200 }} />
      <Text>{character.name}</Text>
      <Text>{character.status}</Text>
      <Text>{character.species}</Text>
      <Text>{character.gender}</Text>
      <Button title={isFavorite ? "Favorilerden Kaldır" : "Favorilere Ekle"} onPress={handleFavoriteToggle} />
    </View>
  );
};

export default CharacterScreen;
