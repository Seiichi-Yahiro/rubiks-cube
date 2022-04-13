import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './tsx/App';
import { Provider } from 'react-redux';
import { setupStore } from './tsx/states/Store';
import './tsx/cube/algorithms/Parser';

window.addEventListener('load', function load() {
    window.removeEventListener('load', load);

    const store = setupStore();

    const container = document.getElementById('root');
    const root = createRoot(container!);

    root.render(
        <Provider store={store}>
            <App />
        </Provider>
    );
});
