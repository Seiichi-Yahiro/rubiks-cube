import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export default cn;
