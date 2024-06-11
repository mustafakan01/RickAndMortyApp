import React, { useState } from 'react';
import { View, FlatList, Text, Button, Image, Alert, StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../redux/favoritesSlice';

const FavoritesScreen = () => {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);

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

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = favorites.filter(character => character.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredFavorites(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Favori karakter ara..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredFavorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.characterCard}>
            <Image source={{ uri: item.image }} style={styles.characterImage} />
            <View style={styles.characterDetails}>
              <Text style={styles.characterName}>{item.name}</Text>
              <Button title="Sil" onPress={() => handleRemove(item)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  characterCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  characterImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  characterDetails: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FavoritesScreen;
