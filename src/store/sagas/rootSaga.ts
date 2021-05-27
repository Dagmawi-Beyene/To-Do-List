import { all, take, takeLatest } from 'redux-saga/effects';
import { ItemsTypes } from '../../types';
import { deleteRequest, load, createPost, createPut} from './sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(ItemsTypes.LOAD_REQUEST, load),
    takeLatest(ItemsTypes.REMOVE_ITEM, deleteRequest),
    takeLatest(ItemsTypes.ADD_ITEM, createPost),
    takeLatest(ItemsTypes.UPDATE_ITEM, createPut)
  ]);
}
