import React from 'react';

const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="rounded bg-gray-200 p-0.5 font-mono text-text">
        {children}
    </span>
);

export default Code;
