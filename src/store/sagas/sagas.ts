import { call, put } from 'redux-saga/effects';
import { auth, firestore, serverTimestamp } from '../../lib/firebase';
import api from '../../services/api';
import { TodoListActionTypes } from '../../types';
import { loadFailure, loadSuccess } from '../actions/items';



export function* load() {
  // get all todos from firestore
  try {
    const todosRef = firestore.collection('users').doc(auth.currentUser?.uid).collection('todos');
    //@ts-ignore
    const querySnapshot = yield call([todosRef, todosRef.get]);
    const todos = querySnapshot.docs.map((doc: any) => doc.data());
    yield put(loadSuccess(todos));
  }
  catch (err) {
    yield put(loadFailure());
  }
}

export function* deleteRequest({ payload }: TodoListActionTypes) {
  try {
    // find item using id in firestore and delete
    firestore
    .collection('users')
    .doc(auth?.currentUser?.uid)
    .collection('todos')
    .where('id', '==', payload.id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });

  } catch (error) {
    console.log('DELETE ERROR');
  }
}

export const createPost = ({payload}: TodoListActionTypes) => {
  let randomId = Math.random()*100;
  firestore
			.collection('users')
			.doc(auth?.currentUser?.uid)
			.collection('todos')
			.add({
        id: randomId,
        text: payload.text,
        complete: false,
        editing: false,
        createdAt: serverTimestamp(),
      })
 
}

export const createPut = ({payload}: TodoListActionTypes) => {
  firestore
      .collection('users')
      .doc(auth?.currentUser?.uid)
      .collection('todos')
      .where('id', '==', payload.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            text: payload.text,
          
          });
        });
      });
}

export const createPutToggle = ({payload}: TodoListActionTypes) => {
  firestore
      .collection('users')
      .doc(auth?.currentUser?.uid)
      .collection('todos')
      .where('id', '==', payload.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            complete: payload.complete, 
          });
        });
      });
}
