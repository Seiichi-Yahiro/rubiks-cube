import { Failure } from 'parsimmon';
import React from 'react';
import Chip from 'src/tsx/components/Chip';

interface NotationErrorProps {
    error: Failure;
}

const NotationError: React.FC<NotationErrorProps> = ({ error }) => (
    <div className="my-1 space-x-0.5">
        {error.expected.map((errorMsg) => (
            <Chip key={errorMsg} variant="error">
                {errorMsg}
            </Chip>
        ))}
    </div>
);

export default React.memo(NotationError);
