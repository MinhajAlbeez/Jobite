import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: localStorage.getItem('accessToken') || null, 
    refreshToken: localStorage.getItem('refreshToken') || null, 
    isAuthenticated: !!localStorage.getItem('accessToken'),
    userRole: localStorage.getItem('userRole') || null, 

  },
  reducers: {
    setTokens(state, action) {
      console.log('Dispatching setTokens with payload:', action.payload); 
      state.accessToken = action.payload.accessToken; 
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true; 
      state.userRole = action.payload.userRole;  
      state.isAuthenticated = true; 
      localStorage.setItem('accessToken', action.payload.accessToken); 
      localStorage.setItem('refreshToken', action.payload.refreshToken); 
      localStorage.setItem('userRole', action.payload.userRole);
      console.log('accessToken', action.payload.accessToken); 
      console.log('refreshToken', action.payload.refreshToken); 
      console.log('userRole', action.payload.userRole);
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.userRole = null; 
      localStorage.removeItem('accessToken'); 
      localStorage.removeItem('refreshToken'); 
    },
  },
});

export const { setTokens, logout } = authSlice.actions; 
export default authSlice.reducer; 
