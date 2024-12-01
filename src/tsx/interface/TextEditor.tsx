import { uniqueId } from 'lodash';
import React, { type ChangeEvent, useMemo, useRef, useState } from 'react';
import cn from 'src/utils/cn';

interface TextEditorProps {
    label: string;
    disabled?: boolean;
    error?: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({
    label,
    disabled = false,
    error = false,
}) => {
    const [value, setValue] = useState('');
    const divRef = useRef<HTMLDivElement>(null);
    const id = useMemo(() => uniqueId(`${label}-textarea-`), [label]);

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
        setValue(event.target.value);

    return (
        <div
            className={cn(
                'relative overflow-hidden',

                'before:absolute before:bottom-0 before:w-full before:border-b before:border-cube-gray focus-within:before:border-b-2 hover:before:border-b-2 hover:before:border-black',

                'after:absolute after:bottom-0 after:w-full after:scale-x-0 after:border-b-2 after:border-cube-blue after:transition-transform after:duration-200 after:ease-out focus-within:after:scale-x-100',

                {
                    'before:border-b before:border-dotted before:border-disabled':
                        disabled,
                },

                {
                    'before:border-cube-red after:border-cube-red hover:before:border-b hover:before:border-cube-red':
                        error,
                },
            )}
        >
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                aria-invalid={error}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                className="peer absolute top-0 z-10 mt-3 h-full min-h-6 w-full resize-none whitespace-pre-wrap bg-transparent text-base text-transparent caret-black outline-none"
            />
            <label
                htmlFor={id}
                className={cn(
                    'absolute top-0 text-xs text-cube-gray transition-all duration-200 ease-out',

                    'peer-empty:top-3 peer-empty:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-cube-blue',

                    {
                        'text-disabled': disabled,
                    },

                    {
                        'text-cube-red peer-focus:text-cube-red': error,
                    },
                )}
            >
                {label}
            </label>
            <div
                ref={divRef}
                aria-hidden={true}
                className={cn(
                    'relative mt-3 h-full min-h-6 w-full select-none whitespace-pre-wrap text-base text-black',
                    {
                        'text-disabled': disabled,
                    },
                )}
            >
                {value}
                <br />
            </div>
        </div>
    );
};

export default TextEditor;
