import { type HTMLAttributes, type ReactNode, useId } from 'react';
import { cn } from '../../utils/style-helpers';
import { Radio } from './radio';
import styles from './radio-group.module.scss';

export interface RadioOption {
  value: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
  legend?: ReactNode;
  orientation?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md';
  helperText?: string;
  error?: string;
  disabled?: boolean;
}

export function RadioGroup({
  options,
  value,
  onChange,
  name,
  legend,
  orientation = 'vertical',
  size = 'md',
  helperText,
  error,
  disabled,
  className,
  ...props
}: RadioGroupProps) {
  const uid = useId();
  const groupName = name ?? `fui-radio-group-${uid}`;
  const messageId = `fui-radio-group-message-${uid}`;
  const invalid = error != null;
  const message = invalid ? error : helperText;

  return (
    <fieldset
      className={cn(styles.group, className)}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      aria-describedby={message != null ? messageId : undefined}
      {...props}
    >
      {legend != null && <legend className={styles.legend}>{legend}</legend>}
      <div className={cn(styles.options, styles[orientation])}>
        {options.map((option) => (
          <Radio
            key={option.value}
            name={groupName}
            value={option.value}
            checked={option.value === value}
            disabled={option.disabled}
            label={option.label}
            helperText={option.helperText}
            size={size}
            onChange={() => onChange(option.value)}
          />
        ))}
      </div>
      {message != null && (
        <p id={messageId} className={cn(styles.message, invalid && styles.error)}>
          {message}
        </p>
      )}
    </fieldset>
  );
}
