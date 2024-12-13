import { uniqueId } from 'lodash';
import React, { type CSSProperties, useMemo, useRef } from 'react';
import cn from 'src/utils/cn';

export interface StyledValue {
    value: string;
    color?: CSSProperties['color'];
}

interface TextEditorProps {
    label: string;
    value: StyledValue[] | string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean;
    error?: boolean;
}

const TextEditor = React.forwardRef<HTMLTextAreaElement, TextEditorProps>(
    ({ label, value, onChange, disabled = false, error = false }, ref) => {
        const divRef = useRef<HTMLDivElement>(null);
        const id = useMemo(() => uniqueId(`${label}-textarea-`), [label]);

        const textValue: string = useMemo(() => {
            if (typeof value === 'string') {
                return value;
            } else {
                return value.map((it) => it.value).join('');
            }
        }, [value]);

        const styledValue = useMemo(() => {
            if (typeof value === 'string') {
                return value;
            } else {
                return value.map((it, index) => (
                    <span key={index} style={{ color: it.color }}>
                        {it.value}
                    </span>
                ));
            }
        }, [value]);

        return (
            <div
                ref={divRef}
                aria-hidden={true}
                className={cn(
                    'relative mb-1 mt-4 min-h-6 w-full select-none whitespace-pre-wrap text-base text-cube-gray',

                    'before:absolute before:bottom-0 before:w-full before:border-b before:border-cube-gray focus-within:before:border-b-2 hover:before:border-b-2 hover:before:border-cube-gray',

                    'after:absolute after:bottom-0 after:w-full after:scale-x-0 after:border-b-2 after:border-cube-blue after:transition-transform after:duration-200 after:ease-out focus-within:after:scale-x-100',

                    {
                        'text-disabled before:border-b before:border-dotted before:border-disabled hover:before:border-b':
                            disabled,
                    },

                    {
                        'before:border-cube-red after:border-cube-red hover:before:border-b hover:before:border-cube-red':
                            error,
                    },
                )}
            >
                <textarea
                    ref={ref}
                    id={id}
                    value={textValue}
                    onChange={onChange}
                    disabled={disabled}
                    aria-invalid={error}
                    spellCheck={false}
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    className="peer absolute top-0 size-full resize-none overflow-hidden whitespace-pre-wrap bg-transparent text-base text-transparent caret-cube-gray outline-none"
                />
                <label
                    htmlFor={id}
                    className={cn(
                        'absolute -top-4 text-xs text-cube-gray transition-all duration-200 ease-out',

                        'underline peer-empty:top-0 peer-empty:text-base peer-empty:no-underline peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cube-blue peer-focus:underline',

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
                {styledValue}
                <br />
            </div>
        );
    },
);
TextEditor.displayName = 'TextEditor';

export default TextEditor;
