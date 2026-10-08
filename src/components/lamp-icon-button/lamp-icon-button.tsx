import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import type { LampSize, LampTone } from '../../types/lamp';
import { cn } from '../../utils/style-helpers';
import styles from './lamp-icon-button.module.scss';

export interface LampIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  tone?: LampTone;
  size?: LampSize;
}

export const LampIconButton = forwardRef<HTMLButtonElement, LampIconButtonProps>(
  function LampIconButton(
    { icon, label, tone = 'gray', size = 'md', className, disabled, ...props },
    ref,
  ) {
    const litTone = disabled ? 'dark' : tone;

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        title={label}
        disabled={disabled}
        className={cn(styles.lampIconButton, styles[size], className)}
        {...props}
      >
        <span className={styles.bezel} />
        <span className={styles.socket} />
        <span className={cn(styles.surface, styles[litTone])} />
        <span className={cn(styles.icon, litTone === 'gray' ? styles.inkDark : styles.inkLight)}>
          {icon}
        </span>
      </button>
    );
  },
);
