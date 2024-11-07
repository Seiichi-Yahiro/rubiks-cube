import { HelpOutline } from '@mui/icons-material';
import {
    InputAdornment,
    Popover,
    PopoverOrigin,
    TextField,
} from '@mui/material';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import NotationHelp from 'src/tsx/interface/NotationHelp';

const anchorOrigin: PopoverOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
};

interface NotationInputProps {
    playerNotation: string;
    updateNotation: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isStopped: boolean;
    hasParseError: boolean;
}

const NotationInput: React.FC<NotationInputProps> = ({
    playerNotation,
    updateNotation,
    isStopped,
    hasParseError,
}) => {
    const [helpOpened, setHelpOpened] = useState(false);
    const closeHelp = useCallback(() => setHelpOpened(false), [setHelpOpened]);

    const inputRef = useRef<HTMLDivElement>(null);

    const slotProps = useMemo(() => {
        return {
            input: {
                endAdornment: (
                    <InputAdornment
                        position="end"
                        className="cursor-pointer"
                        onClick={() => setHelpOpened(true)}
                    >
                        <HelpOutline />
                    </InputAdornment>
                ),
            },
        };
    }, [setHelpOpened]);

    return (
        <>
            <TextField
                ref={inputRef}
                label="Algorithm"
                variant="standard"
                fullWidth={true}
                value={playerNotation}
                onChange={updateNotation}
                disabled={!isStopped}
                error={hasParseError}
                spellCheck={false}
                multiline={true}
                slotProps={slotProps}
            />
            <Popover
                open={helpOpened}
                anchorEl={inputRef.current}
                anchorOrigin={anchorOrigin}
                onClose={closeHelp}
                className="max-h-[30rem]"
            >
                <NotationHelp onClose={closeHelp} />
            </Popover>
        </>
    );
};

export default React.memo(NotationInput);
