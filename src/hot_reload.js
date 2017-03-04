import Application from './application'
import React from 'react';
import ReactDOM from 'react-dom';
import router from './config/router'
import { AppContainer } from 'react-hot-loader';
import { RouterProvider } from 'react-router5';

const start = () => {
  router.start(() => {
      ReactDOM.render(
          <AppContainer>
            <RouterProvider router={ router }>
              <Application />
            </RouterProvider>
          </AppContainer>,
          document.getElementById('application')
      );
  });
}

if (module.hot) {
  module.hot.accept('./application', () => start());
}

start();
