import React from 'react';
import { Provider } from 'react-redux';
import { View, Text } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from './redux/store';
import { rootSaga } from './redux/sagas';
import { Navigation } from './Navigation';

export const store = configureStore();

store.store.runSaga(rootSaga);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}
