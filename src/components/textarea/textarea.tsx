import { type TextareaHTMLAttributes, forwardRef, useId } from 'react';
import type { Rounded } from '../../types/rounded';
import { cn } from '../../utils/style-helpers';
import styles from './textarea.module.scss';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: 'sm' | 'md';
  rounded?: Rounded;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, helperText, error, size = 'md', rounded, id, className, ...props },
  ref,
) {
  const uid = useId();
  const inputId = id ?? `fui-textarea-${uid}`;
  const messageId = `fui-textarea-message-${uid}`;
  const invalid = error != null;
  const message = invalid ? error : helperText;

  return (
    <div className={cn(styles.field, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        className={cn(
          styles.textarea,
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
