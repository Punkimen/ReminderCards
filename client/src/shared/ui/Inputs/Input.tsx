import type { FC, InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import cn from 'classnames';
import s from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  fullWidth?: boolean;
  styleSize?: 'small' | 'medium' | 'large';
}

export const Input: FC<IInputProps> = forwardRef<HTMLInputElement, IInputProps>(
  ({ className = '', error, label, fullWidth,  styleSize='large',  ...props }, ref) => {
    return (
      <div className={ cn(s.inputWrapper, fullWidth && s.fullWidth)}>
        {label && <label className={s.label}>{label}</label>}
        <input
          ref={ref}
          className={cn(s.input, error && s.error, s[styleSize], className)}
          {...props}
        />
        {error && <span className={s.errorText}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
