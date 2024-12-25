import React from 'react';
import NotationInput from 'src/tsx/player/notation/NotationInput';
import PlayerButtons from 'src/tsx/player/PlayerButtons';
import cn from 'src/utils/cn';

interface PlayerProps {
    className?: string;
}

const Player: React.FC<PlayerProps> = ({ className }) => {
    return (
        <div
            className={cn(
                'flex flex-col gap-1 rounded-md border border-app-border bg-app-bg p-2 md:w-full md:flex-none',
                className,
            )}
        >
            <NotationInput />
            <PlayerButtons />
        </div>
    );
};

export default React.memo(Player);
