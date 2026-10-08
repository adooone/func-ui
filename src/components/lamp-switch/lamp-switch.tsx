import { type InputHTMLAttributes, forwardRef, useId } from 'react';
import type { LampSize, LampTone } from '../../types/lamp';
import { cn } from '../../utils/style-helpers';
import styles from './lamp-switch.module.scss';

export interface LampSwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  tone?: LampTone;
  size?: LampSize;
  label?: string;
}

export const LampSwitch = forwardRef<HTMLInputElement, LampSwitchProps>(function LampSwitch(
  { tone = 'green', size = 'md', label, id, className, disabled, ...props },
  ref,
) {
  const uid = useId();
  const inputId = id ?? `fui-lamp-switch-${uid}`;

  return (
    <label htmlFor={inputId} className={cn(styles.control, disabled && styles.disabled, className)}>
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        className={styles.input}
        disabled={disabled}
        {...props}
      />
      <span className={cn(styles.switch, styles[size], styles[tone])} aria-hidden="true">
        <span className={styles.bezel} />
        <span className={styles.socket} />
        <span className={styles.glow} />
        <span className={styles.knob} />
        <span className={styles.labels}>
          <span className={styles.off}>O</span>
          <span className={styles.on}>I</span>
        </span>
        <span className={styles.divider} />
      </span>
      {label && <span className={styles.text}>{label}</span>}
    </label>
  );
});
