import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getEpisodeDetails } from '../api/api';

const EpisodeDetailScreen = ({ route }) => {
  const { episodeId } = route.params;
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      try {
        const data = await getEpisodeDetails(episodeId);
        setEpisode(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodeDetails();
  }, [episodeId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!episode) {
    return <Text>Episode not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{episode.name ? episode.name : 'No name available'}</Text>
      <Text>{`Air Date: ${episode.air_date ? episode.air_date : 'No air date available'}`}</Text>
      <Text>{`Episode: ${episode.episode ? episode.episode : 'No episode available'}`}</Text>
      <Text>{`Characters:`}</Text>
      {episode.characters && episode.characters.length > 0 ? (
        episode.characters.map((characterUrl, index) => (
          <Text key={index}>{characterUrl}</Text>
        ))
      ) : (
        <Text>No characters available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default EpisodeDetailScreen;
