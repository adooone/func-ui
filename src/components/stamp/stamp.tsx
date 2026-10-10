import type { CSSProperties, HTMLAttributes, MouseEventHandler } from 'react';
import type { Rounded } from '../../types/rounded';
import { cn } from '../../utils/style-helpers';
import styles from './stamp.module.scss';

export type StampVariant = 'neutral' | 'info' | 'success' | 'warning' | 'error';

export interface StampProps extends HTMLAttributes<HTMLElement> {
  variant?: StampVariant;
  size?: 'sm' | 'md';
  rounded?: Rounded;
  /** Leading square status dot in the text colour. */
  dot?: boolean;
  /** Override the variant background with any CSS colour. */
  fillColor?: string;
  /** Override the variant text colour with any CSS colour. */
  textColor?: string;
  /** When set, the stamp renders as a real button with hover/press states. */
  onClick?: MouseEventHandler<HTMLElement>;
}

/**
 * A compact status badge on the semantic status tokens. Pass `onClick` to get
 * a genuinely clickable stamp — it renders as a `<button>` with hover lift,
 * no wrapper needed.
 */
export function Stamp({
  variant = 'neutral',
  size = 'sm',
  rounded,
  dot = false,
  fillColor,
  textColor,
  onClick,
  className,
  style,
  children,
  ...props
}: StampProps) {
  const Tag = onClick ? 'button' : 'span';
  const colorOverrides: CSSProperties | undefined =
    fillColor || textColor ? { backgroundColor: fillColor, color: textColor } : undefined;

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        styles.stamp,
        styles[variant],
        styles[size],
        rounded && styles[rounded],
        className,
      )}
      style={{ ...colorOverrides, ...style }}
      {...props}
    >
      {dot && <span className={styles.dot} aria-hidden />}
      {children}
    </Tag>
  );
}
