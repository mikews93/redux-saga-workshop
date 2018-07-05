import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import WebFont from 'webfontloader';
import 'emerald-ui/lib/styles.css';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
// import { getToken, saveToken } from './utils/auth/jwt';
// import { isEnabled as featureToggleIsEnabled } from './featureToggles';
// import { login, logout } from './utils/auth/auth';
// import { readCookie } from './utils/auth/cookie';
import { store } from './store/configureStore';
import './index.css';

// const { REACT_APP_URL_BASE = '/' } = process.env;

WebFont.load({
  google: {
    families: [
      'Open+Sans:300,300i,400,400i,600,600i,700,700i',
      'Material+Icons'
    ]
  },
  fontinactive: function(familyName) {
    if (familyName === 'Material Icons') {
      require('material-design-icons/iconfont/material-icons.css');
    }
  }
});

// const authenticationProcess = () => {
//   return new Promise((resolve, reject) => {
//     if (featureToggleIsEnabled('ec_dev_token')) return resolve();

//     if (!readCookie()) {
//       return reject();
//     }

//     if (getToken()) {
//       return resolve();
//     }
//     login()
//       .then(response => {
//         if (response.status !== 200) {
//           //TODO: token error
//           logout();
//           return reject();
//         }

//         saveToken(response.data);
//         return resolve();
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// };

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
