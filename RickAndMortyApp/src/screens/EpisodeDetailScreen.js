import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getEpisode } from '../api/api';

const EpisodeDetailScreen = ({ route, navigation }) => {
  const { episode } = route.params;
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEpisodeDetails();
  }, []);

  const fetchEpisodeDetails = async () => {
    try {
      const response = await getEpisode(episode.id);
      setCharacters(response.data.characters);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching episode details:', error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('CharacterDetail', { characterUrl: item })}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View>
      <Text>{episode.name}</Text>
      <Text>{episode.air_date}</Text>
      <Text>{episode.episode}</Text>
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default EpisodeDetailScreen;
