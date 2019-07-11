import React from 'react';
import './Range.scss';

interface RangeProps {
    text: string;
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Range: React.FunctionComponent<RangeProps> = ({ text, min, max, step, value, onChange }) => {
    const id = text + min + max + step;

    return (
        <div className="range">
            <label htmlFor={id}>{`${text} ${value}`}</label>
            <input id={id} type="range" step={step} min={min} max={max} value={value} onChange={onChange} />
        </div>
    );
};

export default Range;
