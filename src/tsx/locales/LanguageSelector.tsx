import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'src/tsx/components/Select';
import FlagDe from 'src/tsx/locales/flags/FlagDe';
import FlagGb from 'src/tsx/locales/flags/FlagGb';

const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();

    return (
        <Select value={i18n.language} onValueChange={i18n.changeLanguage}>
            <SelectTrigger className="w-24">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en">
                    <span className="flex flex-row items-center gap-1">
                        <FlagGb className="w-6" />
                        <span>EN</span>
                    </span>
                </SelectItem>
                <SelectItem value="de">
                    <span className="flex flex-row items-center gap-1">
                        <FlagDe className="w-6" />
                        <span>DE</span>
                    </span>
                </SelectItem>
            </SelectContent>
        </Select>
    );
};

export default React.memo(LanguageSelector);
