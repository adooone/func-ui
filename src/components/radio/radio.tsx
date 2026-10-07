import { type InputHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './radio.module.scss';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: 'sm' | 'md';
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, helperText, error, size = 'md', id, className, disabled, ...props },
  ref,
) {
  const uid = useId();
  const inputId = id ?? `fui-radio-${uid}`;
  const messageId = `fui-radio-message-${uid}`;
  const invalid = error != null;
  const message = invalid ? error : helperText;

  return (
    <div className={cn(styles.field, className)}>
      <label
        htmlFor={inputId}
        className={cn(styles.control, styles[size], disabled && styles.disabled)}
      >
        <input
          ref={ref}
          id={inputId}
          type="radio"
          className={styles.input}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={message != null ? messageId : undefined}
          {...props}
        />
        <span className={cn(styles.dot, invalid && styles.invalid)} aria-hidden="true" />
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
