import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      if (state.length < 10) {
        state.push(action.payload);
        AsyncStorage.setItem('favorites', JSON.stringify(state));
      } else {
        alert('Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.');
      }
    },
    removeFavorite: (state, action) => {
      const index = state.findIndex(character => character.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
        AsyncStorage.setItem('favorites', JSON.stringify(state));
      }
    },
    setFavorites: (state, action) => {
      return action.payload;
    }
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
