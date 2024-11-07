import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'src/i18n';
import { setupStore } from 'src/redux/store';
import App from 'src/tsx/App';
import '/node_modules/flag-icons/css/flag-icons.min.css';

window.addEventListener('load', function load() {
    window.removeEventListener('load', load);

    const store = setupStore();

    const container = document.getElementById('root');
    const root = createRoot(container!);

    root.render(
        <Provider store={store}>
            <App />
        </Provider>,
    );
});
