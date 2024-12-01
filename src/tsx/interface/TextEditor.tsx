import { uniqueId } from 'lodash';
import React, { type ChangeEvent, useMemo, useRef, useState } from 'react';
import cn from 'src/utils/cn';

interface TextEditorProps {
    label: string;
    disabled?: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({ label, disabled = false }) => {
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

                'has-[:disabled]:before:border-b has-[:disabled]:before:border-dotted has-[:disabled]:before:border-disabled',

                'after:absolute after:bottom-0 after:w-full after:scale-x-0 after:border-b-2 after:border-cube-blue after:transition-transform after:duration-200 after:ease-out focus-within:after:scale-x-100',
            )}
        >
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
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

                    'peer-empty:top-3 peer-empty:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-cube-blue peer-disabled:text-disabled',
                )}
            >
                {label}
            </label>
            <div
                ref={divRef}
                aria-hidden={true}
                className="relative mt-3 h-full min-h-6 w-full select-none whitespace-pre-wrap text-base text-black peer-disabled:text-disabled"
            >
                {value}
                <br />
            </div>
        </div>
    );
};

export default TextEditor;
