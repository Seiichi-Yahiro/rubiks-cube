import { BookA } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Algorithms from 'src/tsx/algorithms/Algorithms';
import IconButton from 'src/tsx/components/IconButton';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from 'src/tsx/components/Sheet';

interface AlgorithmsButtonProps {
    className?: string;
}

const AlgorithmsButton: React.FC<AlgorithmsButtonProps> = ({ className }) => {
    const { t } = useTranslation();

    return (
        <Sheet>
            <SheetTrigger asChild={true} className={className}>
                <IconButton tooltip={t('algorithm.title')}>
                    <BookA />
                </IconButton>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetTitle>{t('algorithm.title')}</SheetTitle>
                <SheetDescription></SheetDescription>
                <Algorithms className="mt-4" />
            </SheetContent>
        </Sheet>
    );
};

export default React.memo(AlgorithmsButton);
