import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listProduct: '',
}

const ProductRedux = createSlice({
  name: 'ProductRedux',
  initialState,
  reducers: {
    getProductRequest: (action) => { },
    getProductSuccess: (state, action) => {
      console.log(action.payload,'payload')
      state.listProduct = action.payload
    },
    getProductFailed: () => { },
  }
})

export const ProductReduxActions = ProductRedux.actions

export default ProductRedux.reducer