import {
	applyMiddleware,
	legacy_createStore as createStore,
	compose
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers/rootReducer'
import rootSaga from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, compose(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)

export default store
