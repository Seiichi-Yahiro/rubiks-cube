import '@testing-library/jest-dom';

window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

jest.mock('react-i18next', () => ({
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
