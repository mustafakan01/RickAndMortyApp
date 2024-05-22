import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';

const EpisodeScreen = ({ route, navigation }) => {
  const { episode } = route.params;
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const characterPromises = episode.characters.map(url => axios.get(url));
      const characterResponses = await Promise.all(characterPromises);
      const charactersData = characterResponses.map(response => response.data);
      setCharacters(charactersData);
      setFilteredCharacters(charactersData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = characters.filter(character => character.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredCharacters(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.episodeDetail}>
        <Text style={styles.episodeTitle}>{episode.name}</Text>
        <Text style={styles.episodeInfo}>Bölüm: {episode.episode}</Text>
        <Text style={styles.episodeInfo}>Yayın Tarihi: {episode.air_date}</Text>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Karakter ara..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.characterCard} onPress={() => navigation.navigate('Character', { character: item })}>
            <Image source={{ uri: item.image }} style={styles.characterImage} />
            <View style={styles.characterDetails}>
              <Text style={styles.characterName}>{item.name}</Text>
              <Text style={styles.characterInfo}>{item.species} - {item.status}</Text>
            </View>
          </TouchableOpacity>
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
  episodeDetail: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  episodeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  episodeInfo: {
    fontSize: 16,
    color: '#666',
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
  characterInfo: {
    fontSize: 14,
    color: '#666',
  },
});

export default EpisodeScreen;
