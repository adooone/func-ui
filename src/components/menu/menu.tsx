import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './menu.module.scss';

export interface MenuItem {
  label: ReactNode;
  onSelect?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  selected?: boolean;
}

export interface MenuSeparator {
  separator: true;
}

export type MenuEntry = MenuItem | MenuSeparator;

export interface MenuProps {
  trigger: ReactNode;
  items: MenuEntry[];
  triggerLabel?: string;
  align?: 'start' | 'end';
  className?: string;
}

function isSeparator(entry: MenuEntry): entry is MenuSeparator {
  return 'separator' in entry;
}

function isSelectable(entry: MenuEntry): entry is MenuItem {
  return !isSeparator(entry) && !entry.disabled;
}

export function Menu({ trigger, items, triggerLabel, align = 'start', className }: MenuProps) {
  const uid = useId();
  const triggerId = `fui-menu-trigger-${uid}`;
  const menuId = `fui-menu-${uid}`;
  const itemId = (index: number) => `${menuId}-item-${index}`;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const firstEnabled = () => items.findIndex(isSelectable);
  const lastEnabled = () => {
    for (let i = items.length - 1; i >= 0; i--) if (isSelectable(items[i])) return i;
    return -1;
  };
  const nextEnabled = (from: number) => {
    for (let i = from + 1; i < items.length; i++) if (isSelectable(items[i])) return i;
    return from;
  };
  const prevEnabled = (from: number) => {
    for (let i = from - 1; i >= 0; i--) if (isSelectable(items[i])) return i;
    return from;
  };

  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener('pointerdown', onPointer);
    return () => window.removeEventListener('pointerdown', onPointer);
  }, [open]);

  const openMenu = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const close = (focusTrigger = true) => {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  };

  const select = (index: number) => {
    const item = items[index];
    if (!item || !isSelectable(item)) return;
    item.onSelect?.();
    close();
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!open) openMenu(firstEnabled());
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!open) openMenu(lastEnabled());
        break;
    }
  };

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((i) => nextEnabled(i));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((i) => prevEnabled(i));
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(firstEnabled());
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(lastEnabled());
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (activeIndex >= 0) select(activeIndex);
        break;
      case 'Escape':
        event.preventDefault();
        close();
        break;
      case 'Tab':
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className={cn(styles.menu, className)}>
      <button
        ref={triggerRef}
        type="button"
        id={triggerId}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={triggerLabel}
        className={styles.trigger}
        onClick={() => (open ? close() : openMenu(firstEnabled()))}
        onKeyDown={onTriggerKeyDown}
      >
        {trigger}
      </button>
      {open && (
        <div
          ref={listRef}
          id={menuId}
          role="menu"
          aria-labelledby={triggerId}
          aria-activedescendant={activeIndex >= 0 ? itemId(activeIndex) : undefined}
          tabIndex={-1}
          className={cn(styles.list, styles[align])}
          onKeyDown={onMenuKeyDown}
        >
          {items.map((item, index) =>
            isSeparator(item) ? (
              <hr key={itemId(index)} className={styles.separator} />
            ) : (
              <button
                key={itemId(index)}
                type="button"
                id={itemId(index)}
                role={item.selected == null ? 'menuitem' : 'menuitemradio'}
                aria-checked={item.selected}
                tabIndex={-1}
                disabled={item.disabled}
                className={cn(
                  styles.item,
                  item.danger && styles.danger,
                  item.selected && styles.selected,
                  index === activeIndex && styles.active,
                )}
                onPointerMove={() => !item.disabled && setActiveIndex(index)}
                onClick={() => select(index)}
              >
                {item.icon && (
                  <span className={styles.icon} aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
