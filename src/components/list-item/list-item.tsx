import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './list-item.module.scss';

export interface ListItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md';
  active?: boolean;
  tone?: 'default' | 'warn' | 'alert';
  icon?: ReactNode;
  action?: ReactNode;
}

export const ListItem = forwardRef<HTMLButtonElement, ListItemProps>(function ListItem(
  { size = 'md', active = false, tone = 'default', icon, action, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-current={active || undefined}
      className={cn(
        styles.item,
        styles[size],
        active && styles.active,
        tone !== 'default' && styles[tone],
        className,
      )}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.content}>{children}</span>
      {action && <span className={styles.action}>{action}</span>}
    </button>
  );
});
