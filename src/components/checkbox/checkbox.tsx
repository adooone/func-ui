import { type InputHTMLAttributes, forwardRef, useId } from 'react';
import type { Rounded } from '../../types/rounded';
import { cn } from '../../utils/style-helpers';
import styles from './checkbox.module.scss';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: 'sm' | 'md';
  rounded?: Rounded;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, helperText, error, size = 'md', rounded, id, className, disabled, ...props },
  ref,
) {
  const uid = useId();
  const inputId = id ?? `fui-checkbox-${uid}`;
  const messageId = `fui-checkbox-message-${uid}`;
  const invalid = error != null;
  const message = invalid ? error : helperText;

  return (
    <div className={cn(styles.field, className)}>
      <label
        htmlFor={inputId}
        className={cn(
          styles.control,
          styles[size],
          rounded && styles[rounded],
          disabled && styles.disabled,
        )}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={styles.input}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={message != null ? messageId : undefined}
          {...props}
        />
        <span className={cn(styles.box, invalid && styles.invalid)} aria-hidden="true" />
        {label && <span className={styles.text}>{label}</span>}
      </label>
      {message != null && (
        <p id={messageId} className={cn(styles.message, invalid && styles.error)}>
          {message}
        </p>
      )}
    </div>
  );
});
