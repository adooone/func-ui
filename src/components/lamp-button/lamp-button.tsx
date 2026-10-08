import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import type { LampSize, LampTone } from '../../types/lamp';
import { cn } from '../../utils/style-helpers';
import styles from './lamp-button.module.scss';

export interface LampButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: LampTone;
  size?: LampSize;
  rounded?: 'full' | 'half';
  icon?: ReactNode;
}

export const LampButton = forwardRef<HTMLButtonElement, LampButtonProps>(function LampButton(
  { tone = 'gray', size = 'md', rounded = 'full', icon, className, children, disabled, ...props },
  ref,
) {
  const litTone = disabled ? 'dark' : tone;

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={cn(styles.lampButton, styles[size], styles[rounded], className)}
      {...props}
    >
      <span className={styles.bezel} />
      <span className={styles.socket} />
      <span className={cn(styles.surface, styles[litTone])} />
      <span className={cn(styles.content, litTone === 'gray' ? styles.inkDark : styles.inkLight)}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </span>
    </button>
  );
});
