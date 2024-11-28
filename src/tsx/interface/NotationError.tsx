import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Failure } from 'parsimmon';
import React from 'react';

interface NotationErrorProps {
    notation: string;
    error: Failure;
    marginRight: number;
}

const NotationError: React.FC<NotationErrorProps> = ({
    notation,
    error,
    marginRight,
}) => (
    <>
        <Typography
            className="pointer-events-none !absolute top-[20px] whitespace-pre-wrap ![display:initial] ![line-height:1.4375em]"
            style={{ marginRight }}
        >
            <span className="invisible">
                {notation.substring(0, error.index.offset)}
            </span>
            <span className="text-error underline decoration-error">
                {notation.substring(error.index.offset, error.index.offset + 1)}
            </span>
        </Typography>

        <div className="my-1 space-x-0.5">
            {error.expected.map((errorMsg) => (
                <Chip
                    key={errorMsg}
                    color="error"
                    size="small"
                    label={errorMsg}
                />
            ))}
        </div>
    </>
);

export default React.memo(NotationError);
