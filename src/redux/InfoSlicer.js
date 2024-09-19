import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchInfo = createAsyncThunk('info/fetchInfo', async () => {
  try {
    const response = await axios.get('http://localhost:8000/info/getInfo');
    // const response = await axios.get('https://jobite-backend-xc68.vercel.app/info/getInfo');
    return response.data;
  } catch (error) {
    throw error; // Ensure error is thrown to handle rejected state
  }
});

const infoSlice = createSlice({
  name: 'info',
  initialState: {
    isLoading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default infoSlice.reducer;
