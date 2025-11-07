import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

const ResizeObserverMock = vi.fn(function () {
    return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    };
});

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

vi.mock('react-i18next', () => ({
    useTranslation: () => {
        return {
            t: (key: string) => key,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
    initReactI18next: {
        type: '3rdParty',
        init: () => {},
    },
}));
