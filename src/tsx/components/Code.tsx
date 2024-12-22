import React from 'react';

const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="rounded bg-app-bg-code p-0.5 font-mono text-app-text">
        {children}
    </span>
);

export default Code;
