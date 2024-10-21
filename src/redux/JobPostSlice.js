// src/redux/jobSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch job posts
// export const fetchJobPost = createAsyncThunk('job/fetchJobPost', async (_, { getState, rejectWithValue }) => {
//   try {
//     const state = getState();
//     const authToken = state.auth.accessToken || localStorage.getItem('accessToken'); // Get token from Redux state or localStorage

//     if (!authToken) {
//       throw new Error('No access token found'); // Handle missing token
//     }

//     const response = await axios.get('http://localhost:8000/jobposts/get', {
//       headers: {
//         'Authorization': `Bearer ${authToken}`, // Include token in header
//       },
//     });

//     return response.data; // Return the response data
//   } catch (error) {
//     return rejectWithValue(error.response?.data || error.message); // Return the error
//   }
// });
export const fetchJobPost = createAsyncThunk(
  "job/fetchJobPost",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = state.auth.accessToken || localStorage.getItem("accessToken"); // Get token from Redux or localStorage
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
      console.log("Access Token:", authToken);
      const response = await axios.get("http://jobite-server.vercel.app/jobposts/get", {
        headers, // Include headers (with or without token)
      });
      console.log("Response Data:", response.data);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Handle and return error
    }
  }
);



// Job slice to manage state
const jobSlice = createSlice({
  name: "job",
  initialState: {
    isLoading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobPost.pending, (state) => {
        state.isLoading = true; // Set loading state
      })
      .addCase(fetchJobPost.fulfilled, (state, action) => {
        state.isLoading = false; // Reset loading state
        state.data = action.payload; // Set fetched data
        state.error = null; // Clear error
      })
      .addCase(fetchJobPost.rejected, (state, action) => {
        state.isLoading = false; // Reset loading state
        state.error = action.payload; // Use the rejected value for error message
      });
  },
});

export default jobSlice.reducer; // Export job slice reducer
