import {
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  useId,
  useRef,
  useState,
} from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './tabs.module.scss';

export type TabsOrientation = 'horizontal' | 'vertical';

export interface TabItem {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  content?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: TabsOrientation;
  size?: 'sm' | 'md';
  activation?: 'automatic' | 'manual';
  tablistLabel?: string;
}

export function Tabs({
  items,
  value,
  defaultValue,
  onChange,
  orientation = 'horizontal',
  size = 'md',
  activation = 'automatic',
  tablistLabel,
  className,
  ...props
}: TabsProps) {
  const uid = useId();
  const tabId = (item: TabItem) => `fui-tab-${uid}-${item.value}`;
  const panelId = (item: TabItem) => `fui-tabpanel-${uid}-${item.value}`;

  const firstEnabled = items.find((item) => !item.disabled)?.value;
  const [internal, setInternal] = useState(defaultValue ?? firstEnabled ?? '');
  const selected = value ?? internal;
  const activeItem = items.find((item) => item.value === selected);

  const tabRefs = useRef(new Map<string, HTMLButtonElement>());

  const select = (next: string) => {
    if (value == null) setInternal(next);
    if (next !== selected) onChange?.(next);
  };

  const step = (from: number, delta: number) => {
    for (let i = 1; i <= items.length; i++) {
      const index = (from + delta * i + items.length * i) % items.length;
      if (!items[index].disabled) return index;
    }
    return from;
  };

  const edge = (back: boolean) => {
    const list = back ? [...items].reverse() : items;
    const found = list.find((item) => !item.disabled);
    return found ? items.indexOf(found) : -1;
  };

  const focusTab = (index: number) => {
    const item = items[index];
    if (!item) return;
    tabRefs.current.get(item.value)?.focus();
    if (activation === 'automatic') select(item.value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const vertical = orientation === 'vertical';
    const prevKey = vertical ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';

    switch (event.key) {
      case prevKey:
        event.preventDefault();
        focusTab(step(index, -1));
        break;
      case nextKey:
        event.preventDefault();
        focusTab(step(index, 1));
        break;
      case 'Home':
        event.preventDefault();
        focusTab(edge(false));
        break;
      case 'End':
        event.preventDefault();
        focusTab(edge(true));
        break;
      case 'Enter':
      case ' ':
        if (activation === 'manual') {
          event.preventDefault();
          select(items[index].value);
        }
        break;
    }
  };

  return (
    <div className={cn(styles.tabs, styles[orientation], className)} {...props}>
      <div
        role="tablist"
        aria-label={tablistLabel}
        aria-orientation={orientation}
        className={cn(styles.tablist, styles[size])}
      >
        {items.map((item, index) => {
          const active = item.value === selected;
          return (
            <button
              key={item.value}
              ref={(node) => {
                if (node) tabRefs.current.set(item.value, node);
                else tabRefs.current.delete(item.value);
              }}
              type="button"
              role="tab"
              id={tabId(item)}
              aria-selected={active}
              aria-controls={item.content != null ? panelId(item) : undefined}
              tabIndex={active ? 0 : -1}
              disabled={item.disabled}
              className={cn(styles.tab, active && styles.active)}
              onClick={() => select(item.value)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {item.icon && (
                <span className={styles.icon} aria-hidden="true">
                  {item.icon}
                </span>
              )}
              {item.label}
            </button>
          );
        })}
      </div>
      {activeItem?.content != null && (
        <div
          role="tabpanel"
          id={panelId(activeItem)}
          aria-labelledby={tabId(activeItem)}
          tabIndex={0}
          className={styles.panel}
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}
