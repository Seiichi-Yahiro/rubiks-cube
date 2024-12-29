import React from 'react';

const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-block rounded bg-app-bg-code p-0.5 font-mono">
        {children}
    </span>
);

export default Code;
