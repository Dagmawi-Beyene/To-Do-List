import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { TodoListActionTypes } from '../../types';
import { loadFailure, loadSuccess } from '../actions/items';

export function* load() {
  try {
    const { data } = yield call(api.get, 'https://mockend.com/org/repo/items');
    yield put(loadSuccess(data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* deleteRequest({ payload }: TodoListActionTypes) {
  try {
    yield call(api.delete, `https://mockend.com/org/repo/items${payload.id}`);
  } catch (error) {
    console.log('DELETE ERROR');
  }
}
