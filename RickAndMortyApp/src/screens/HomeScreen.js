import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getEpisodes } from '../api/api';
import EpisodeList from '../components/EpisodeList';
import Pagination from '../components/Pagination';

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
        if (data && data.results) { // Verinin beklediğiniz şekilde geldiğinden emin olun
          setEpisodes(data.results);
        } else {
          setError("Unexpected data format received from API");
        }
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
          item && item.id ? <EpisodeList episode={item} navigation={navigation} /> : null // episode prop'unun varlığını kontrol edin
        )}
      />

      <Pagination page={page} setPage={setPage} />
    </View>
  );
};

export default HomeScreen;
