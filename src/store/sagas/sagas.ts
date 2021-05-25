import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { TodoListActionTypes } from '../../types';
import { loadFailure, loadSuccess } from '../actions/items';

export function* load() {
  try {
    const { data } = yield call(api.get, 'https://60ad6b0d80a61f0017330f06.mockapi.io/api/items/item');
    yield put(loadSuccess(data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* deleteRequest({ payload }: TodoListActionTypes) {
  try {
    yield call(api.delete, `https://60ad6b0d80a61f0017330f06.mockapi.io/api/items/item/${payload.id}`);
  } catch (error) {
    console.log('DELETE ERROR');
  }
}
