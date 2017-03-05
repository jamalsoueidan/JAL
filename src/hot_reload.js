import Application from './application'
import React from 'react';
import ReactDOM from 'react-dom';
import router from './config/router'
import store from './config/store';
import { AppContainer } from 'react-hot-loader';
import { RouterProvider } from 'react-router5';
import { Provider } from 'react-redux';

const start = () => {
  router.start(() => {
      ReactDOM.render(
          <AppContainer>
            <Provider store={store}>
              <RouterProvider router={router}>
                <Application />
              </RouterProvider>
            </Provider>
          </AppContainer>,
          document.getElementById('application')
      );
  });
}

if (module.hot) {
  module.hot.accept('./application', () => start());
}

start();
