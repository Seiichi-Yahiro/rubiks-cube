import { createRoot } from 'react-dom/client';
import App from 'src/tsx/App';

window.addEventListener('load', function load() {
    window.removeEventListener('load', load);

    const container = document.getElementById('root');
    const root = createRoot(container!);

    root.render(<App />);
});
