import type { CSSProperties, HTMLAttributes } from 'react';
import type { LampSize, LampTone } from '../../types/lamp';
import { cn } from '../../utils/style-helpers';
import styles from './lamp-meter.module.scss';

export interface LampMeterProps extends HTMLAttributes<HTMLSpanElement> {
  value: number;
  max?: number;
  tone?: LampTone;
  size?: LampSize;
  lampCount?: number;
  label?: string;
  showValue?: boolean;
  fullWidth?: boolean;
}

export function LampMeter({
  value,
  max = 100,
  tone = 'green',
  size = 'md',
  lampCount = 10,
  label,
  showValue = false,
  fullWidth = false,
  className,
  style,
  ...props
}: LampMeterProps) {
  const clamped = max > 0 ? Math.max(0, Math.min(value, max)) : 0;
  const fraction = max > 0 ? clamped / max : 0;
  const percent = Math.round(fraction * 100);

  const litLamps = fraction * lampCount;
  const fullLamps = Math.floor(litLamps);
  const partialLamp = litLamps - fullLamps;

  const lamps = Array.from({ length: lampCount }, (_, index) => ({
    id: `lamp-${index}`,
    index,
  }));

  return (
    <span
      role="progressbar"
      aria-label={label ?? 'Progress'}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={clamped}
      className={cn(styles.lampMeter, fullWidth && styles.fullWidth, className)}
      style={{ '--fui-lamp-count': lampCount, ...style } as CSSProperties}
      {...props}
    >
      {(label != null || showValue) && (
        <span className={styles.header}>
          <span className={styles.label}>{label}</span>
          {showValue && <span className={styles.value}>{percent}%</span>}
        </span>
      )}
      <span className={cn(styles.bar, styles[size])}>
        <span className={styles.bezel} />
        <span className={styles.track}>
          <span className={styles.lamps}>
            {lamps.map((lamp) => {
              const partial = lamp.index === fullLamps && partialLamp > 0;

              return (
                <span
                  key={lamp.id}
                  className={cn(
                    styles.lamp,
                    styles[tone],
                    lamp.index < fullLamps && styles.lit,
                    partial && styles.partial,
                  )}
                  style={partial ? { opacity: 0.3 + partialLamp * 0.7 } : undefined}
                />
              );
            })}
          </span>
        </span>
      </span>
    </span>
  );
}
