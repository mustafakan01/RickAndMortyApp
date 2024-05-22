// src/screens/EpisodeDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getEpisodeDetails, getCharacterDetails } from '../services/api';

const EpisodeDetailsScreen = ({ route, navigation }) => {
  const { episodeId } = route.params;
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchEpisodeDetails();
  }, []);

  const fetchEpisodeDetails = async () => {
    try {
      const response = await getEpisodeDetails(episodeId);
      setEpisode(response.data);
      fetchCharacters(response.data.characters);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCharacters = async (urls) => {
    try {
      const promises = urls.map(url => axios.get(url));
      const responses = await Promise.all(promises);
      setCharacters(responses.map(res => res.data));
    } catch (error) {
      console.error(error);
    }
  };

  const renderCharacter = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('CharacterDetails', { characterId: item.id })}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      {episode && (
        <>
          <Text>{episode.name}</Text>
          <Text>{episode.air_date}</Text>
          <FlatList
            data={characters}
            renderItem={renderCharacter}
            keyExtractor={item => item.id.toString()}
          />
        </>
      )}
    </View>
  );
};

export default EpisodeDetailsScreen;
