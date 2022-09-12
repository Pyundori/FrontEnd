import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setLikeProducts } from './userSlice';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    search: {
      page: 1,
      onSearch: true,
      history: [], // 검색탭에서 마지막으로 검색된 상품들
      venders: ['전체'], // 편의점: cu, gs25 ...
      sales: ['전체'], // 행사 타입: 1N1, 2N1 ...
      searchWord: '', // 검색어
    },
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

    setOnSearch(state, action) {
      const { payload } = action;
      state.search.onSearch = payload;
    },

    setProductLikes(state, action) {
      const { payload } = action;
      const dispatch = useDispatch();
      const product = state.search.products.find((product) => product.pName === payload);
      if (product) {
        if (product.isLike) {
          product.isLike = false;
          dispatch(setLikeProducts(product));
          product.likes -= 1;
        } else {
          product.isLike = true;
          dispatch(setLikeProducts(product));
          product.likes += 1;
        }
      }
    },

    setVenders(state, action) {
      const { payload } = action;
      state.search.venders = payload;
    },

    setSales(state, action) {
      const { payload } = action;
      state.search.sales = payload;
    },

    setSearchWord(state, action) {
      const { payload } = action;
      state.search.searchWord = payload;
    },

    setHistory(state, action) {
      const { payload } = action;
      state.search.history = payload;
    },
  },
});

export const {
  setSearchPage,
  increasePage,
  setOnSearch,
  setProductLikes,
  setVenders,
  setSales,
  setSearchWord,
  setHistory,
} = productSlice.actions;

export default productSlice.reducer;
