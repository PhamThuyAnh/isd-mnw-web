import axios from 'axios';
import { ProductReduxActions } from './ProductRedux';
import { call, put, takeLatest, all, takeEvery } from 'redux-saga/effects'


export function* watchProductSaga() {
    yield all([
        takeLatest(ProductReduxActions.getProductRequest.type, handleGetProduct),
    ])
}

function* handleGetProduct(action) {
    // try {
    //     yield 
    // } catch (error) {
    // }
}

function* handleGetDistrict(action) {
    const { requestBody, getDataCallBack } = action.payload
    try {
        // globalLoading.show()
        // const api = () => ApiUtil.fetch(APIConfig.GET_DISTRICT + requestBody, { method: 'GET' }, APIType.COMMON)
        // const response = yield call(api)
        // globalLoading.hide()
        // if (ApiUtil.isSuccess(response)) {
        //     yield put(CommonReduxActions.getDistrictSuccess(response?.data))
        //     getDataCallBack && getDataCallBack(response?.data)
        // } else {
        //     yield put(CommonReduxActions.getDistrictFailed(response?.errMessage))
        // }
    } catch (error) {
        // yield put(CommonReduxActions.getDistrictFailed(error))
        // console.log('err', error)
        // globalLoading.hide()
    }
}