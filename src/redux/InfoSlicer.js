// src/redux/infoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch info
// export const fetchInfo = createAsyncThunk('info/fetchInfo', async (_, { getState, rejectWithValue }) => {
//   try {
//     const state = getState();
//     const authToken = state.auth.accessToken || localStorage.getItem('accessToken'); // Get token from Redux state or localStorage

//     if (!authToken) {
//       throw new Error('No access token found'); // Handle missing token
//     }

//     const response = await axios.get('http://localhost:8000/info/getInfo', {
//       headers: {
//         'Authorization': `Bearer ${authToken}`,
//       },
//     });

//     return response.data; // Return the response data
//   } catch (error) {
//     return rejectWithValue(error.response?.data || error.message); // Return the error
//   }
// });
export const fetchInfo = createAsyncThunk(
  "info/fetchInfo",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken =
        state.auth.accessToken || localStorage.getItem("accessToken"); // Get token

      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {}; // Conditionally set headers

      const response = await axios.get("https://jobite-server.vercel.app/info/getInfo", {
        headers,
      });

      return response.data; // Return response data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Handle error
    }
  }
);

// Info slice to manage state
const infoSlice = createSlice({
  name: "info",
  initialState: {
    isLoading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfo.pending, (state) => {
        state.isLoading = true; // Set loading state
      })
      .addCase(fetchInfo.fulfilled, (state, action) => {
        state.isLoading = false; // Reset loading state
        state.data = action.payload; // Set fetched data
        state.error = null; // Clear error
      })
      .addCase(fetchInfo.rejected, (state, action) => {
        state.isLoading = false; // Reset loading state
        state.error = action.payload; // Use the rejected value for error message
      });
  },
});

export default infoSlice.reducer; // Export info slice reducer
