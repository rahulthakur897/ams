import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const loggerMiddleware = (store) => (next) => (action) => {
  // Call the next dispatch method in the middleware chain.
  const returnValue = next(action);
  // This will likely be the action itself unless
  // a middleware further in chain changed it.
  return returnValue
}

const middlewares = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: () => middlewares,
});

sagaMiddleware.run(rootSaga);

export default store;
