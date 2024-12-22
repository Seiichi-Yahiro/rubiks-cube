import { CircleHelp } from 'lucide-react';
import { Result } from 'parsimmon';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isError, RotationCommand } from 'src/algorithms/rotationCommand';
import IconButton from 'src/tsx/components/IconButton';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from 'src/tsx/components/Popover';
import { ScrollArea } from 'src/tsx/components/ScrollArea';
import TextEditor, { type StyledValue } from 'src/tsx/components/TextEditor';
import NotationError from 'src/tsx/player/notation/NotationError';
import NotationHelp from 'src/tsx/player/notation/NotationHelp';

interface NotationInputProps {
    playerNotation: string;
    updateNotation: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
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

    const editorRef = useRef<HTMLTextAreaElement>(null);

    const editorValue: string | StyledValue[] = useMemo(() => {
        if (isError(rotationCommands)) {
            return [
                {
                    value: playerNotation.substring(
                        0,
                        rotationCommands.index.offset,
                    ),
                },
                {
                    value: playerNotation.substring(
                        rotationCommands.index.offset,
                        rotationCommands.index.offset + 1,
                    ),
                    color: 'var(--error)',
                },
                {
                    value: playerNotation.substring(
                        rotationCommands.index.offset + 1,
                    ),
                },
            ];
        } else {
            return playerNotation;
        }
    }, [playerNotation, rotationCommands]);

    const [popoverWidth, setPopoverWidth] = useState(0);

    const measureWidth = useCallback((element: HTMLDivElement | null) => {
        if (!element) {
            return;
        }

        const resizeObserver = new ResizeObserver(() => {
            setPopoverWidth(element.offsetWidth);
        });

        resizeObserver.observe(element);
    }, []);

    return (
        <div className="flex flex-col flex-nowrap">
            <div
                ref={measureWidth}
                className="flex flex-row flex-nowrap items-center"
            >
                <TextEditor
                    ref={editorRef}
                    label={t('player.input.algorithm')}
                    value={editorValue}
                    onChange={updateNotation}
                    disabled={!isStopped}
                    error={hasParseError}
                />
                <Popover>
                    <PopoverTrigger asChild={true}>
                        <IconButton tooltip={t('player.input.help')}>
                            <CircleHelp />
                        </IconButton>
                    </PopoverTrigger>
                    <PopoverContent
                        avoidCollisions={false}
                        side="bottom"
                        align="end"
                        style={{ width: popoverWidth }}
                    >
                        <ScrollArea className="h-96">
                            <NotationHelp />
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
            </div>
            {isError(rotationCommands) && (
                <NotationError error={rotationCommands} />
            )}
        </div>
    );
};

export default React.memo(NotationInput);
