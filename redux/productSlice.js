import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    search: {
      page: 1,
      products: [],
      searchOptions: [],
    },
    likes: 0,
  },
  reducers: {
    setSearchPage(state, action) {
      const { payload } = action;
      state.search.products = payload.products;
      if (payload.page === 1) {
        state.search.page = 1;
      }
    },
    increasePage(state, action) {
      state.search.page += 1;
    },
    setProductLikes(state, action) {
      const {
        payload: { productId },
      } = action;
      const product = state.search.products.find((product) => product.id === productId);
      if (product) {
        if (product.isLike) {
          product.isLike = false;
          state.likes -= 1;
        } else {
          product.isLike = true;
          state.likes += 1;
        }
      }
    },
    setSearchOptions(state, action) {
      const { payload } = action;
      const searchOption = state.search.searchOptions.find(
        (searchOption) => searchOption === payload,
      );
      if (searchOption) {
        state.search.searchOptions = state.search.searchOptions.filter(
          (searchOption) => searchOption !== payload,
        );
      } else {
        state.search.searchOptions.push(payload);
      }
    },
  },
});

export const { setSearchPage, increasePage, setProductLikes, setSearchOptions } =
  productSlice.actions;

export default productSlice.reducer;
