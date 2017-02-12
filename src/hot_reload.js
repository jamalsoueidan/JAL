import { AppContainer } from 'react-hot-loader';
import Application from './application'
import React from 'react';
import ReactDOM from 'react-dom';

const rootElement = document.getElementById('application');
ReactDOM.render(
  <AppContainer>
    <Application />
  </AppContainer>,
  rootElement
);

if (module.hot) {
  module.hot.accept('./application', () => {
    const NextApp = require('./application').default;
    ReactDOM.render(
      <AppContainer>
         <NextApp />
      </AppContainer>,
      rootElement
    );
  });
}
