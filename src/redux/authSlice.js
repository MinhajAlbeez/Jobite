// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     accessToken: localStorage.getItem('accessToken') || null, 
//     refreshToken: localStorage.getItem('refreshToken') || null, 
//     isAuthenticated: !!localStorage.getItem('accessToken'),
//     userRole: localStorage.getItem('userRole') || null, 

//   },
//   reducers: {
//     setTokens(state, action) {
//       console.log('Dispatching setTokens with payload:', action.payload); 
//       state.accessToken = action.payload.accessToken; 
//       state.refreshToken = action.payload.refreshToken;
//       state.isAuthenticated = true; 
//       state.userRole = action.payload.userRole;  
//       localStorage.setItem('accessToken', action.payload.accessToken); 
//       localStorage.setItem('refreshToken', action.payload.refreshToken); 
//       localStorage.setItem('userRole', action.payload.userRole);
//       console.log('accessToken', action.payload.accessToken); 
//       console.log('refreshToken', action.payload.refreshToken); 
//       console.log('userRole', action.payload.userRole);
//     },
//     logout(state) {
//       state.accessToken = null;
//       state.refreshToken = null;
//       state.isAuthenticated = false;
//       state.userRole = null; 
//       localStorage.removeItem('accessToken'); 
//       localStorage.removeItem('refreshToken'); 
//     },
//   },
// });

// export const { setTokens, logout } = authSlice.actions; 
// export default authSlice.reducer; 

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  userRole: null,
};

// Check if window and localStorage are available (client-side only)
if (typeof window !== 'undefined') {
  initialState.accessToken = localStorage.getItem('accessToken') || null;
  initialState.refreshToken = localStorage.getItem('refreshToken') || null;
  initialState.isAuthenticated = !!localStorage.getItem('accessToken');
  initialState.userRole = localStorage.getItem('userRole') || null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.userRole = action.payload.userRole;

      // Make sure localStorage is available before using it
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.setItem('userRole', action.payload.userRole);
      }
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.userRole = null;

      // Clear tokens from localStorage if available
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
      }
    },
  },
});

export const { setTokens, logout } = authSlice.actions;
export default authSlice.reducer;

