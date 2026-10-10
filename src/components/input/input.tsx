import { type InputHTMLAttributes, forwardRef, useId } from 'react';
import type { Rounded } from '../../types/rounded';
import { cn } from '../../utils/style-helpers';
import styles from './input.module.scss';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: 'sm' | 'md';
  rounded?: Rounded;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helperText, error, size = 'md', rounded, id, className, ...props },
  ref,
) {
  const uid = useId();
  const inputId = id ?? `fui-input-${uid}`;
  const messageId = `fui-input-message-${uid}`;
  const invalid = error != null;
  const message = invalid ? error : helperText;

  return (
    <div className={cn(styles.field, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          styles.input,
          styles[size],
          rounded && styles[rounded],
          invalid && styles.invalid,
        )}
        aria-invalid={invalid || undefined}
        aria-describedby={message != null ? messageId : undefined}
        {...props}
      />
      {message != null && (
        <p id={messageId} className={cn(styles.message, invalid && styles.error)}>
          {message}
        </p>
      )}
    </div>
  );
});
