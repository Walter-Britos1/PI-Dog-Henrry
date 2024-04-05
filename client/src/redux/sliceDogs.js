import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dogs: []
};

const dogsSlice = createSlice({
  name: 'dogsSilce',
  initialState,
  reducers: {
    setDogs: (state, action) => {
      state.dogs = action.payload
    }
  }
});

export const getDogs = (state) => state.dogs;

export const { setDogs } = dogsSlice.actions;

export default dogsSlice.reducer;