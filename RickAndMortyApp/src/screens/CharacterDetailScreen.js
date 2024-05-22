// src/screens/CharacterDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacterDetails } from '../services/api';
import { addFavorite, removeFavorite, saveFavorites } from '../redux/favoritesSlice';

const CharacterDetailsScreen = ({ route }) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);

  useEffect(() => {
    fetchCharacterDetails();
  }, []);

  const fetchCharacterDetails = async () => {
    try {
      const response = await getCharacterDetails(characterId);
      setCharacter(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const isFavorite = favorites.some(fav => fav.id === character?.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(character));
    } else {
      dispatch(addFavorite(character));
    }
    dispatch(saveFavorites(favorites));
  };

  return (
    <View>
      {character && (
        <>
          <Text>{character.name}</Text>
          <Text>{character.status}</Text>
          <Text>{character.species}</Text>
          <Button title={isFavorite ? "Remove from Favorites" : "Add to Favorites"} onPress={handleFavoriteToggle} />
        </>
      )}
    </View>
  );
};

export default CharacterDetailsScreen;
