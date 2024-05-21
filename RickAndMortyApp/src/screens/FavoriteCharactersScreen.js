import React from 'react';
import { View, Text, FlatList, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
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
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('CharacterDetail', { characterUrl: item.url })}>
        <Text style={styles.itemName}>{item.name}</Text>
      </TouchableOpacity>
      <Button title="Remove" onPress={() => handleRemoveFavorite(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No favorite characters yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
});

export default FavoriteCharactersScreen;
