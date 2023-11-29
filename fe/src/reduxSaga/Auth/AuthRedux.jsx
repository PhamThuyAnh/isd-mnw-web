import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    refererList: '',
    loginStatus: false,
}

const AuthRedux = createSlice({
    name: 'AuthRedux',
    initialState,
    reducers: {
        getProvinceRequest: () => { },
        getProvinceSuccess: (state, action) => {},
        getProvinceFailed: () => { },
        getRefererRequest: (state) => { },
        getRefererSuccess: (state, action) => {
            state.refererList = action.payload
        },
        getRefererFailed: (state, action) => {
            state.refererList = initialState.refererList
        },
        setLoginStatus: (state, action) => {
            state.loginStatus = action.payload
        },
    }
})

export const AuthReduxActions = AuthRedux.actions

export default AuthRedux.reducer