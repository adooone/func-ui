import type { HTMLAttributes, ReactNode } from 'react';
import type { Rounded } from '../../types/rounded';
import { cn } from '../../utils/style-helpers';
import styles from './segmented-control.module.scss';

export interface SegmentedControlOption {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends Omit<HTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md';
  rounded?: Rounded;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  size = 'md',
  rounded,
  className,
  ...props
}: SegmentedControlProps) {
  return (
    <fieldset
      className={cn(styles.group, styles[size], rounded && styles[rounded], className)}
      {...props}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            disabled={option.disabled}
            className={cn(styles.segment, active && styles.active)}
            onClick={() => onChange(option.value)}
          >
            {option.icon && (
              <span className={styles.icon} aria-hidden="true">
                {option.icon}
              </span>
            )}
            {option.label}
          </button>
        );
      })}
    </fieldset>
  );
}
