import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    likeProducts: [
      {
        vender: 'cu',
        dtype: '1N1',
        pName: '롯데)빅팜60g',
        pPrice: 2000,
        pImg: 'https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801123205219.jpg',
      },
      {
        vender: 'cu',
        dtype: '1N1',
        pName: '푸르밀)카페베네라떼200ml',
        pPrice: 1600,
        pImg: 'https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8806371304264.jpg',
      },
      {
        vender: 'cu',
        dtype: '1N1',
        pName: '푸르밀)카페베네모카200ml',
        pPrice: 1600,
        pImg: 'https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8806371304271.jpg',
      },
      {
        vender: 'cu',
        dtype: '1N1',
        pName: '롯데)게토레이레몬P1.5L',
        pPrice: 3200,
        pImg: 'https://cdn2.bgfretail.com/bgfbrand/files/product/2AC9ABD80E8843AE9BA16695324431F2.jpg',
      },
      {
        vender: 'cu',
        dtype: '1N1',
        pName: '푸르밀)카페베카라멜200ml',
        pPrice: 1600,
        pImg: 'https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8806371305452.jpg',
      },
      {
        vender: 'cu',
        dtype: '1N1',
        pName: '46cm)초극세모칫솔',
        pPrice: 3500,
        pImg: 'https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801051009033.jpg',
      },
      {
        vender: 'cu',
        dtype: '1N1',
        pName: '메디안)치석케어치약',
        pPrice: 4500,
        pImg: 'https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8806403146473.jpg',
      },
      {
        vender: 'cu',
        dtype: '1N1',
        pName: '메디안)센서티브칫솔',
        pPrice: 3000,
        pImg: 'https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801042443631.jpg',
      },
      {
        vender: 'cu',
        dtype: '1N1',
        pName: '2080)칫솔',
        pPrice: 2800,
        pImg: 'https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801046057216.jpg',
      },
      {
        vender: 'cu',
        dtype: '1N1',
        pName: '2080)치약',
        pPrice: 3500,
        pImg: 'https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801046846087.jpg',
      },
    ],
    isLogined: false,
  },
  reducers: {
    setLikeProducts(state, action) {
      const { payload } = action;
      const product = state.likeProducts.find((product) => product.pName === payload.pName);
      if (product) {
        if (product.isLike) {
          product.isLike = false;
          state.likeProducts.filter((product) => product.pName !== payload.pName);
        } else {
          product.isLike = true;
          state.likeProducts.push(payload);
        }
      }
    },
    setIsLogined(state, action) {
      state.isLogined = !state.isLogined;
    },
  },
});

export const { setLikeProducts, setIsLogined } = userSlice.actions;

export default userSlice.reducer;
