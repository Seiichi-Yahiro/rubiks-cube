import { Failure } from 'parsimmon';
import React from 'react';
import Chip from 'src/tsx/components/Chip';
import cn from 'src/utils/cn';

interface NotationErrorProps {
    error: Failure;
    className?: string;
}

const NotationError: React.FC<NotationErrorProps> = ({ error, className }) => (
    <div
        className={cn(
            'flex flex-row flex-wrap items-center gap-0.5',
            className,
        )}
    >
        {error.expected.map((errorMsg) => (
            <Chip key={errorMsg} variant="error">
                {errorMsg}
            </Chip>
        ))}
    </div>
);

export default React.memo(NotationError);
