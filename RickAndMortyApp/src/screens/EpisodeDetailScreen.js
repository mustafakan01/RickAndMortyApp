import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  if (!episode) {
    return <Text style={styles.errorText}>Episode not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{episode.name ? episode.name : 'No name available'}</Text>
      <Text style={styles.text}>{`Air Date: ${episode.air_date ? episode.air_date : 'No air date available'}`}</Text>
      <Text style={styles.text}>{`Episode: ${episode.episode ? episode.episode : 'No episode available'}`}</Text>
      <Text style={styles.text}>Characters:</Text>
      {episode.characters && episode.characters.length > 0 ? (
        episode.characters.map((characterUrl, index) => (
          <Text key={index} style={styles.characterText}>{characterUrl}</Text>
        ))
      ) : (
        <Text style={styles.text}>No characters available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  characterText: {
    fontSize: 14,
    marginBottom: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default EpisodeDetailScreen;
