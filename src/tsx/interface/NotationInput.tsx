import HelpOutline from '@mui/icons-material/HelpOutline';
import InputAdornment from '@mui/material/InputAdornment';
import type { PopoverOrigin } from '@mui/material/Popover';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { debounce } from 'lodash';
import { Result } from 'parsimmon';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { isError, RotationCommand } from 'src/algorithms/rotationCommand';
import NotationError from 'src/tsx/interface/NotationError';
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
    rotationCommands: Result<RotationCommand[]>;
}

const NotationInput: React.FC<NotationInputProps> = ({
    playerNotation,
    updateNotation,
    isStopped,
    hasParseError,
    rotationCommands,
}) => {
    const { t } = useTranslation();
    const [helpOpened, setHelpOpened] = useState(false);
    const closeHelp = useCallback(() => setHelpOpened(false), [setHelpOpened]);

    const adornmentRef = useRef<HTMLDivElement>(null);

    const slotProps = useMemo(() => {
        return {
            input: {
                endAdornment: (
                    <Tooltip title={t('player.input.help')}>
                        <InputAdornment
                            ref={adornmentRef}
                            position="end"
                            className="cursor-pointer"
                            onClick={() => setHelpOpened(true)}
                        >
                            <HelpOutline fontSize="small" />
                        </InputAdornment>
                    </Tooltip>
                ),
            },
        };
    }, [setHelpOpened, t]);

    const [adornmentWidth, setAdornmentWidth] = useState(20);

    useEffect(() => {
        if (!adornmentRef.current) {
            return;
        }

        const resizeObserver = new ResizeObserver(
            debounce(() => {
                const width = adornmentRef.current!.offsetWidth;
                setAdornmentWidth(width);
            }),
        );

        resizeObserver.observe(adornmentRef.current);

        return () => resizeObserver.disconnect();
    }, [setAdornmentWidth]);

    const inputRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <TextField
                ref={inputRef}
                label={t('player.input.algorithm')}
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
            {isError(rotationCommands) && (
                <NotationError
                    notation={playerNotation}
                    error={rotationCommands}
                    marginRight={adornmentWidth + 8}
                />
            )}
        </>
    );
};

export default React.memo(NotationInput);
