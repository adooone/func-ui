import {
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode,
  forwardRef,
  useId,
} from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './slider.module.scss';

export type SliderOrientation = 'horizontal' | 'vertical';

export interface SliderProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'type' | 'value' | 'defaultValue' | 'size'
  > {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  orientation?: SliderOrientation;
  length?: number | string;
  label?: string;
  helperText?: string;
  error?: string;
  size?: 'sm' | 'md';
  showValue?: boolean;
  formatValue?: (value: number) => ReactNode;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    orientation = 'horizontal',
    length,
    label,
    helperText,
    error,
    size = 'md',
    showValue = false,
    formatValue,
    id,
    className,
    style,
    disabled,
    ...props
  },
  ref,
) {
  const uid = useId();
  const inputId = id ?? `fui-slider-${uid}`;
  const messageId = `fui-slider-message-${uid}`;
  const invalid = error != null;
  const message = invalid ? error : helperText;
  const vertical = orientation === 'vertical';

  const clamped = Math.max(min, Math.min(value, max));
  const fraction = max > min ? (clamped - min) / (max - min) : 0;
  const track = length != null ? (typeof length === 'number' ? `${length}px` : length) : undefined;

  return (
    <div
      className={cn(styles.field, vertical && styles.vertical, className)}
      style={{ '--fui-slider-length': track, ...style } as CSSProperties}
    >
      {(label || showValue) && (
        <div className={styles.header}>
          {label && (
            <label htmlFor={inputId} className={styles.label}>
              {label}
            </label>
          )}
          {showValue && (
            <span className={styles.value}>{formatValue ? formatValue(clamped) : clamped}</span>
          )}
        </div>
      )}
      <input
        ref={ref}
        id={inputId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={clamped}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={message != null ? messageId : undefined}
        aria-orientation={vertical ? 'vertical' : undefined}
        className={cn(styles.input, styles[size], invalid && styles.invalid)}
        style={{ '--fui-slider-fill': `${fraction * 100}%` } as CSSProperties}
        onChange={(event) => onChange(event.target.valueAsNumber)}
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
