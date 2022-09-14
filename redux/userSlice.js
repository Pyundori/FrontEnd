import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    likeProducts: [],
    isLogined: false,
    isTabLoading: false,
    token: '',
  },
  reducers: {
    setLikeProducts(state, action) {
      const { payload } = action;
      const product = state.likeProducts.find((product) => product.pName === payload.pName);
      if (product) {
        state.likeProducts = state.likeProducts.filter(
          (product) => product.pName !== payload.pName,
        );
      } else {
        state.likeProducts.push(payload);
      }
    },

    setIsLogined(state, action) {
      state.isLogined = !state.isLogined;
    },

    setIsTabLoading(state, action) {
      state.isTabLoading = !state.isTabLoading;
    },

    setToken(state, action) {
      const { payload } = action;
      state.token = payload;
    },
  },
});

export const { setLikeProducts, setIsLogined, setIsTabLoading, setToken } = userSlice.actions;

export default userSlice.reducer;
