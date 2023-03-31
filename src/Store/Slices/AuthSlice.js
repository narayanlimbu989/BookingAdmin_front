import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("Admin"))?.userinfo || null,
  islogin: JSON.parse(localStorage.getItem("Admin"))?.authenticate || false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { userinfo, authenticate } = action.payload;
      state.user = userinfo;
      if (authenticate == true) {
        state.islogin = true;
      } else {
        state.islogin = false;
      }
    },
    setlogout: (state) => {
      state.user = null;
      state.islogin = false;
    },
  },
});

export const { setAuth, setlogout } = AuthSlice.actions;

export default AuthSlice.reducer;
