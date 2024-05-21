import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteCharacters: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favoriteCharacters.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favoriteCharacters = state.favoriteCharacters.filter(
        character => character.id !== action.payload.id
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
