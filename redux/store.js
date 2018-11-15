import { createStore, applyMiddleware } from 'redux';
import { createMemoryHistory } from 'history';
import { composeWithDevTools } from 'remote-redux-devtools';
import { persistStore } from 'redux-persist';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers';

export const history = createMemoryHistory();

const composeEnhancers = composeWithDevTools({
  realtime: true,
  name: 'Your Instance Name',
  host: '127.0.0.1',
  port: 1024,
});


export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );

  const persistor = persistStore(store);

  if (module.hot) {
    module.hot.accept('./reducers.js', () => {
      // eslint-disable-next-line
      const nextRootReducer = require('./reducers.js');
      store.replaceReducer(connectRouter(history)(nextRootReducer));
    });
  }

  store.runSaga = sagaMiddleware.run;
  return { store, persistor };
}
