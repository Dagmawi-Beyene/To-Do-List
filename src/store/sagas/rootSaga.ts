import { all, takeLatest } from 'redux-saga/effects';
import { ItemsTypes } from '../../types';
import {
  deleteRequest, load, createPost, createPut, createPutToggle
} from './sagas';

export default function* rootSaga() {
  yield all ([
    takeLatest(ItemsTypes.LOAD_REQUEST, load),
    takeLatest(ItemsTypes.REMOVE_ITEM, deleteRequest),
    takeLatest(ItemsTypes.ADD_ITEM, createPost),
    takeLatest(ItemsTypes.UPDATE_ITEM, createPut),
    takeLatest(ItemsTypes.TOGGLE_ITEM, createPutToggle),
  ]);
}
