import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Button, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios';
import Pagination from '../components/Pagination';

const HomeScreen = ({ navigation }) => {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);

  useEffect(() => {
    fetchEpisodes();
  }, [page]);

  const fetchEpisodes = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`);
      const newEpisodes = response.data.results;
      setEpisodes(prevEpisodes => [...prevEpisodes, ...newEpisodes]);
      setFilteredEpisodes(prevEpisodes => [...prevEpisodes, ...newEpisodes]);
      setTotalPages(response.data.info.pages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = episodes.filter(episode => episode.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredEpisodes(filtered);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setFilteredEpisodes([]);
  };

  return (
    <View style={styles.container}>
      <Button title="Favori Karakterler" onPress={() => navigation.navigate('Favorites')} />
      <TextInput
        style={styles.searchBar}
        placeholder="Bölüm ara..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredEpisodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.episodeCard} onPress={() => navigation.navigate('Episode', { episode: item })}>
            <Text style={styles.episodeTitle}>{item.name} - {item.episode}</Text>
            <Text style={styles.episodeAirDate}>Yayın Tarihi: {item.air_date}</Text>
          </TouchableOpacity>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
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
