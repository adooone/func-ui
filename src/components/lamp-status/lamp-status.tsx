import type { OutputHTMLAttributes } from 'react';
import type { LampTone } from '../../types/lamp';
import { cn } from '../../utils/style-helpers';
import styles from './lamp-status.module.scss';

export type LampStatusValue = 'running' | 'stopped' | 'error' | 'initializing';

export interface LampStatusProps extends OutputHTMLAttributes<HTMLOutputElement> {
  status: LampStatusValue;
  label?: string;
}

const STATES: Record<LampStatusValue, { tone: LampTone; label: string; pulse: boolean }> = {
  running: { tone: 'green', label: 'Running', pulse: true },
  stopped: { tone: 'dark', label: 'Stopped', pulse: false },
  error: { tone: 'red', label: 'Error', pulse: false },
  initializing: { tone: 'yellow', label: 'Starting', pulse: true },
};

export function LampStatus({ status, label, className, ...props }: LampStatusProps) {
  const state = STATES[status];

  return (
    <output className={cn(styles.lampStatus, className)} {...props}>
      <span className={styles.lamp}>
        <span className={styles.bezel} />
        <span className={styles.socket} />
        <span className={cn(styles.surface, styles[state.tone], state.pulse && styles.pulse)} />
      </span>
      <span className={cn(styles.text, styles[state.tone])}>{label ?? state.label}</span>
    </output>
  );
}
