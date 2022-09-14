import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setLikeProducts } from './userSlice';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    search: {
      onSearch: true,
      venders: ['전체'], // 편의점: cu, gs25 ...
      sales: ['전체'], // 행사 타입: 1N1, 2N1 ...
    },
  },
  reducers: {
    setOnSearch(state, action) {
      const { payload } = action;
      state.search.onSearch = payload;
    },
    setVenders(state, action) {
      const { payload } = action;
      state.search.venders = payload;
    },

    setSales(state, action) {
      const { payload } = action;
      state.search.sales = payload;
    },
  },
});

export const { setOnSearch, setProductLikes, setVenders, setSales } = productSlice.actions;

export default productSlice.reducer;
