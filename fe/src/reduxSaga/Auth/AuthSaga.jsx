import { AuthReduxActions } from './AuthRedux';
import { call, put, takeLatest, all, takeEvery } from 'redux-saga/effects'


export function* watchAuthSaga() {
    yield all([
        takeLatest(AuthReduxActions.getProvinceRequest.type, handleGetProvince),
    ])
}

function* handleGetProvince() {
    try {
    } catch (error) {
    }
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