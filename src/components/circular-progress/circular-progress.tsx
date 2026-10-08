import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './circular-progress.module.scss';

export interface CircularProgressProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  value?: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  showValue?: boolean;
  glow?: boolean;
  formatValue?: (percent: number, value: number) => ReactNode;
}

export function CircularProgress({
  value,
  max = 100,
  size = 48,
  strokeWidth = 4,
  color,
  label = 'Loading',
  showValue = false,
  glow = false,
  formatValue,
  className,
  style,
  ...props
}: CircularProgressProps) {
  const indeterminate = value == null;
  const clamped = indeterminate || max <= 0 ? 0 : Math.max(0, Math.min(value, max));
  const fraction = indeterminate || max <= 0 ? 0 : clamped / max;
  const percent = Math.round(fraction * 100);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = indeterminate
    ? `${circumference * 0.25} ${circumference * 0.75}`
    : `${circumference * fraction} ${circumference}`;

  const fill = color ? { '--fui-circular-fill': color } : undefined;

  return (
    <span
      role="progressbar"
      aria-label={label}
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuemax={indeterminate ? undefined : max}
      aria-valuenow={indeterminate ? undefined : clamped}
      className={cn(
        styles.root,
        indeterminate && styles.indeterminate,
        glow && styles.glow,
        className,
      )}
      style={{ width: size, height: size, ...fill, ...style } as CSSProperties}
      {...props}
    >
      <svg className={styles.svg} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          className={styles.track}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={styles.value}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={dash}
        />
      </svg>
      {showValue && !indeterminate && (
        <span className={styles.text}>
          {formatValue ? formatValue(percent, clamped) : `${percent}%`}
        </span>
      )}
    </span>
  );
}
