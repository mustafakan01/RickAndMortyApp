import React from 'react';
import { View, FlatList, Text, Button, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../redux/favoritesSlice';

const FavoritesScreen = () => {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  const handleRemove = (character) => {
    Alert.alert(
      "Favorilerden Kaldır",
      `${character.name} isimli karakteri favorilerden kaldırmak istediğinize emin misiniz?`,
      [
        { text: "Hayır" },
        { text: "Evet", onPress: () => dispatch(removeFavorite(character)) },
      ]
    );
  };

  return (
    <View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
            <Text>{item.name}</Text>
            <Button title="Sil" onPress={() => handleRemove(item)} />
          </View>
        )}
      />
    </View>
  );
};

export default FavoritesScreen;
