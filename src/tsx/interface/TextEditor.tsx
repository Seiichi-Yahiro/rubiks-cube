import { uniqueId } from 'lodash';
import React, { type ChangeEvent, useMemo, useRef, useState } from 'react';

interface TextEditorProps {
    label: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ label }) => {
    const [value, setValue] = useState('');
    const divRef = useRef<HTMLDivElement>(null);
    const id = useMemo(() => uniqueId(`${label}-textarea-`), [label]);

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
        setValue(event.target.value);

    return (
        <div className="relative overflow-hidden after:absolute after:bottom-0 after:left-0 after:right-0 after:border-b after:border-cube-gray focus-within:after:border-b-2 focus-within:after:border-cube-blue hover:after:border-b-2 hover:after:border-black hover:focus-within:after:border-cube-blue">
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                className="peer absolute top-0 z-10 mt-3 h-full min-h-6 w-full resize-none whitespace-pre-wrap bg-transparent text-base text-transparent caret-black outline-none"
            />
            <label
                htmlFor={id}
                className="absolute top-0 text-xs text-cube-gray transition-all duration-200 ease-out peer-empty:top-3 peer-empty:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-cube-blue"
            >
                {label}
            </label>
            <div
                ref={divRef}
                aria-hidden={true}
                className="relative mt-3 h-full min-h-6 w-full select-none whitespace-pre-wrap text-base text-black"
            >
                {value}
                <br />
            </div>
        </div>
    );
};

export default TextEditor;
