import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'lit';
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  /** Leading icon slot. */
  icon?: ReactNode;
  /** Trailing icon slot. */
  iconRight?: ReactNode;
  /** Pressed-in look for toggles and nav tabs. Also sets aria-pressed. */
  isActive?: boolean;
}

/**
 * A chunky, uppercase button with the signature hard offset shadow that snaps
 * flush on press. Ghost is a shadow-outlined variant; secondary is frosted;
 * danger is for destructive actions; lit is the amber-outlined armed action.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    icon,
    iconRight,
    isActive = false,
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={isActive || undefined}
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        isActive && styles.active,
        className,
      )}
      {...props}
    >
      {icon && <span className={styles.iconSlot}>{icon}</span>}
      {children}
      {iconRight && <span className={styles.iconSlot}>{iconRight}</span>}
    </button>
  );
});
