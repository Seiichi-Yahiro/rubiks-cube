import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isError } from 'src/algorithms/rotationCommand';
import { useAppDispatch, useRedux } from 'src/hooks/redux';
import { playerActions } from 'src/redux/player/playerActions';
import { PlayerStatus } from 'src/redux/player/playerReducer';
import TextEditor, { type StyledValue } from 'src/tsx/components/TextEditor';
import NotationError from 'src/tsx/player/notation/NotationError';
import NotationHelpButton from 'src/tsx/player/notation/NotationHelpButton';
import NotationStepCounter from 'src/tsx/player/notation/NotationStepCounter';

const NotationInput: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const playerStatus = useRedux((state) => state.player.status);
    const playerNotation = useRedux((state) => state.player.notation);
    const rotationCommands = useRedux((state) => state.player.rotationCommands);

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
                    color: 'var(--color-app-text-error)',
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

    const updateNotation = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) =>
            dispatch(playerActions.updateNotation(event.target.value)),
        [dispatch],
    );

    const hasParseError = isError(rotationCommands);

    const [playerWidth, setPlayerWidth] = useState(100);

    const measureWidth = useCallback((element: HTMLDivElement | null) => {
        if (!element) {
            return;
        }

        const resizeObserver = new ResizeObserver(() => {
            setPlayerWidth(element.offsetWidth);
        });

        resizeObserver.observe(element);
    }, []);

    return (
        <div
            ref={measureWidth}
            className="relative flex flex-col flex-nowrap gap-1"
        >
            <NotationHelpButton
                className="absolute -right-1 -top-1 size-6"
                width={playerWidth}
            />
            <TextEditor
                label={t('player.input.algorithm')}
                value={editorValue}
                onChange={updateNotation}
                disabled={playerStatus !== PlayerStatus.STOPPED}
                error={hasParseError}
            />
            {hasParseError ? (
                <NotationError error={rotationCommands} />
            ) : (
                rotationCommands.value.length > 0 && <NotationStepCounter />
            )}
        </div>
    );
};

export default React.memo(NotationInput);
