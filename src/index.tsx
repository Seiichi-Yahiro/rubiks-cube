import React from 'react';
import ReactDOM from 'react-dom';
import App from './tsx/App';
import { Provider } from 'react-redux';
import { setupStore } from './tsx/states/Store';
import './tsx/cube/algorithms/Parser';

window.addEventListener('load', function load() {
    window.removeEventListener('load', load);

    const store = setupStore();

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
});
