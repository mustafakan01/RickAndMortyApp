import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EpisodeList = ({ episode, navigation }) => {
  if (!episode) {
    return null; // Eğer episode tanımlı değilse, bileşen null dönsün
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('EpisodeDetail', { episodeId: episode.id })}
    >
      <Text style={styles.title}>{episode.name ? episode.name : 'No name available'}</Text>
      <Text>{`Air Date: ${episode.air_date ? episode.air_date : 'No air date available'}`}</Text>
      <Text>{`Episode: ${episode.episode ? episode.episode : 'No episode available'}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EpisodeList;
