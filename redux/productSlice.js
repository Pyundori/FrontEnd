import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setLikeProducts } from './userSlice';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    search: {
      page: 1,
      products: [], // 검색탭에 보여질 상품들: 현재 10개씩 담길 예정.
      venders: [], // 편의점: cu, gs25 ...
      dTypes: [], // 행사 타입: 1N1, 2N1 ...
      pName: '', // 검색어
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
    setConv(state, action) {
      const { payload } = action;
      const vender = state.search.venders.find((vender) => vender === payload);
      if (vender) {
        state.search.venders = state.search.venders.filter((vender) => vender !== payload);
      } else {
        state.search.venders.push(payload);
      }
    },
  },
});

export const { setSearchPage, increasePage, setProductLikes, setSearchOptions } =
  productSlice.actions;

export default productSlice.reducer;
