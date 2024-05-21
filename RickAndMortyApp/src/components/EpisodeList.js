import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EpisodeList = ({ episode, navigation }) => {
  // episode nesnesinin tanımlı olduğunu kontrol et
  if (!episode || !episode.name) {
    return null; // Eğer episode tanımlı değilse veya name özelliği tanımlı değilse, bileşen null dönsün
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('EpisodeDetail', { episodeId: episode.id })}
    >
      <Text style={styles.title}>{episode.name}</Text>
      <Text>{`Air Date: ${episode.air_date}`}</Text>
      <Text>{`Episode: ${episode.episode}`}</Text>
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
