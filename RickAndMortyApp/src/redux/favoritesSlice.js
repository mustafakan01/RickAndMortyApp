import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      if (state.length < 10) {
        state.push(action.payload);
      } else {
        // Notification logic here
      }
    },
    removeFavorite: (state, action) => {
      return state.filter(character => character.id !== action.payload.id);
    },
    setFavorites: (state, action) => {
      return action.payload;
    }
  }
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;

// AsyncStorage integration
export const loadFavorites = () => async dispatch => {
  const favorites = await AsyncStorage.getItem('favorites');
  if (favorites) {
    dispatch(setFavorites(JSON.parse(favorites)));
  }
};

export const saveFavorites = favorites => async () => {
  await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
};

export default favoritesSlice.reducer;
