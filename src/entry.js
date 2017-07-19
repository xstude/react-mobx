import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'mobx-react';
import App from './view/app.js';
import logStore from './data/store/log.js';

ReactDom.render(
    <Provider logStore={logStore}>
        <App />
    </Provider>,
    document.getElementById('root')
);
