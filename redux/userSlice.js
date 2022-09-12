import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    likeProducts: [
      {
        vender: 'gs25',
        dType: '2N1',
        pName: 'CJ)비비고사골시래기된장국460G',
        pPrice: 5400,
        pImg: 'http://gs25appimg.gsretail.com/imgsvr/item/GD_8801007971339_002.jpg',
        isLike: true,
      },
      {
        vender: 'gs25',
        dType: '2N1',
        pName: 'CJ)비비고소고기미역국500G',
        pPrice: 5400,
        pImg: 'http://gs25appimg.gsretail.com/imgsvr/item/GD_8801007561677_001.jpg',
        isLike: true,
      },
      {
        vender: 'gs25',
        dType: '2N1',
        pName: 'CJ)비비고육개장500G',
        pPrice: 5400,
        pImg: 'http://gs25appimg.gsretail.com/imgsvr/item/GD_8801007526515_001.jpg',
        isLike: true,
      },
      {
        vender: 'gs25',
        dType: '2N1',
        pName: 'CJ)비비고콩나물황태국500G',
        pPrice: 5400,
        pImg: 'http://gs25appimg.gsretail.com/imgsvr/item/GD_8801007628899_003.jpg',
        isLike: true,
      },
      {
        vender: 'gs25',
        dType: '2N1',
        pName: '납딱한오다리25G',
        pPrice: 3800,
        pImg: 'http://gs25appimg.gsretail.com/imgsvr/item/GD_8809677722053_001.jpg',
        isLike: true,
      },
      {
        vender: 'gs25',
        dType: '2N1',
        pName: '대구노가리30G',
        pPrice: 3800,
        pImg: 'http://gs25appimg.gsretail.com/imgsvr/item/GD_8809677721315_001.jpg',
        isLike: true,
      },
      {
        vender: 'gs25',
        dType: '2N1',
        pName: '도톰한오징어25G',
        pPrice: 3800,
        pImg: 'http://gs25appimg.gsretail.com/imgsvr/item/GD_8809677720875_001.jpg',
        isLike: true,
      },
      {
        vender: 'gs25',
        dType: '2N1',
        pName: '마즈)스키틀즈사우워40G',
        pPrice: 1200,
        pImg: 'http://gs25appimg.gsretail.com/imgsvr/item/GD_6914973111660_001.jpg',
        isLike: true,
      },
      {
        vender: 'gs25',
        dType: '2N1',
        pName: '마즈)스키틀즈오리지널45G',
        pPrice: 1200,
        pImg: 'http://gs25appimg.gsretail.com/imgsvr/item/GD_6914973603035_038.jpg',
        isLike: true,
      },
      {
        vender: 'gs25',
        dType: '2N1',
        pName: '마즈)스키틀즈와일드베리40G',
        pPrice: 1200,
        pImg: 'http://gs25appimg.gsretail.com/imgsvr/item/GD_8804973308154_002.jpg',
        isLike: true,
      },
    ],
    isLogined: false,
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

    setToken(state, action) {
      const { payload } = action;
      state.token = payload;
    },
  },
});

export const { setLikeProducts, setIsLogined, setToken } = userSlice.actions;

export default userSlice.reducer;
