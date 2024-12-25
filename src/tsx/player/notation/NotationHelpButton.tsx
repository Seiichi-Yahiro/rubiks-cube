import { CircleHelp } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from 'src/tsx/components/IconButton';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from 'src/tsx/components/Popover';
import { ScrollArea } from 'src/tsx/components/ScrollArea';
import NotationHelp from 'src/tsx/player/notation/NotationHelp';

interface NotationHelpButtonProps {
    width?: number;
    className?: string;
}

const NotationHelpButton: React.FC<NotationHelpButtonProps> = ({
    width,
    className,
}) => {
    const { t } = useTranslation();

    return (
        <Popover>
            <PopoverTrigger asChild={true}>
                <IconButton
                    tooltip={t('player.input.help')}
                    className={className}
                >
                    <CircleHelp />
                </IconButton>
            </PopoverTrigger>
            <PopoverContent
                avoidCollisions={false}
                side="bottom"
                align="end"
                //className="max-w-sm md:max-w-md"
                style={{ width }}
            >
                <ScrollArea className="h-96">
                    <NotationHelp />
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
};

export default React.memo(NotationHelpButton);
