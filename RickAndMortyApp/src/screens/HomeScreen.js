import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchEpisodes();
  }, [page]);

  const fetchEpisodes = async () => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`);
      setEpisodes(prevEpisodes => [...prevEpisodes, ...response.data.results]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <View style={styles.container}>
      <Button title="Favori Karakterler" onPress={() => navigation.navigate('Favorites')} />
      <FlatList
        data={episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.episodeCard} onPress={() => navigation.navigate('Episode', { episode: item })}>
            <Text style={styles.episodeTitle}>{item.name} - {item.episode}</Text>
            <Text style={styles.episodeAirDate}>Yayın Tarihi: {item.air_date}</Text>
          </TouchableOpacity>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
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
  episodeCard: {
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
  episodeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  episodeAirDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;
