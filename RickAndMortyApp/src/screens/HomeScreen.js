import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getEpisodes } from '../api/api';
import EpisodeList from '../components/EpisodeList';
import Pagination from '../components/Pagination'; // Pagination bileşenini ekleyin

const HomeScreen = ({ navigation }) => {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const data = await getEpisodes(page);
        setEpisodes(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [page]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <FlatList
        data={episodes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <EpisodeList episode={item} navigation={navigation} />
        )}
      />
      <Pagination page={page} setPage={setPage} />
    </View>
  );
};

export default HomeScreen;
