import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';

import App from './App';

const Editor = {
  init: (DataStore, engine) => {
    const store = DataStore.getStore();

    const {
      core: { key }
    } = store.getState();

    const wrapper =
      document.getElementById(`wrapper_${key}`) ||
      document.getElementById('wrapper_unwitty_game');

    const overlaysWrapper = document.createElement('div');
    overlaysWrapper.setAttribute('class', `wrapper_overlays_unwitty_game`);
    overlaysWrapper.setAttribute('id', `wrapper_overlays_${key}`);

    wrapper.appendChild(overlaysWrapper);
    ReactDOM.render(
      <Provider store={store}>
        <App engine={engine} />
      </Provider>,
      document.getElementById(`wrapper_overlays_${key}`)
    );
  }
};

export default Editor;
