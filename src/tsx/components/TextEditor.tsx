import { uniqueId } from 'lodash';
import React, { type CSSProperties, useMemo } from 'react';
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
                className={cn(
                    'relative mb-1 mt-4 min-h-6 w-full select-none whitespace-pre-wrap text-base',

                    'before:absolute before:bottom-0 before:w-full before:border-b before:border-app-text focus-within:before:border-b-2 hover:before:border-b-2 hover:before:border-app-text',

                    'after:absolute after:bottom-0 after:w-full after:scale-x-0 after:border-b-2 after:border-app-text-highlighted after:transition-transform after:duration-200 after:ease-out focus-within:after:scale-x-100',

                    {
                        'text-app-text-disabled before:border-b before:border-dotted before:border-app-text-disabled hover:before:border-b':
                            disabled,
                    },

                    {
                        'before:border-app-text-error after:border-app-text-error hover:before:border-b hover:before:border-app-text-error':
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
                    className="peer absolute top-0 size-full resize-none overflow-hidden whitespace-pre-wrap bg-transparent text-base text-transparent caret-app-text outline-none"
                />
                <label
                    htmlFor={id}
                    className={cn(
                        'absolute -top-4 text-xs transition-all duration-200 ease-out',

                        'underline peer-empty:top-0 peer-empty:cursor-text peer-empty:text-base peer-empty:no-underline peer-focus:-top-4 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-app-text-highlighted peer-focus:underline',

                        {
                            'text-app-text-disabled': disabled,
                        },

                        {
                            'text-app-text-error peer-focus:text-app-text-error':
                                error,
                        },
                    )}
                >
                    {label}
                </label>
                <span aria-hidden={true}>{styledValue}</span>
                <br />
            </div>
        );
    },
);
TextEditor.displayName = 'TextEditor';

export default TextEditor;
