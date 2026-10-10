import { type KeyboardEvent, forwardRef, useEffect, useId, useRef, useState } from 'react';
import type { Rounded } from '../../types/rounded';
import { cn } from '../../utils/style-helpers';
import styles from './select.module.scss';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  helperText?: string;
  error?: string;
  size?: 'sm' | 'md';
  rounded?: Rounded;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  id?: string;
  className?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    options,
    value,
    defaultValue,
    onChange,
    label,
    helperText,
    error,
    size = 'md',
    rounded,
    placeholder = 'Select…',
    disabled = false,
    name,
    required,
    id,
    className,
  },
  ref,
) {
  const uid = useId();
  const selectId = id ?? `fui-select-${uid}`;
  const listId = `fui-select-list-${uid}`;
  const messageId = `fui-select-message-${uid}`;
  const optionId = (index: number) => `${selectId}-option-${index}`;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const currentValue = isControlled ? value : internalValue;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const invalid = error != null;
  const message = invalid ? error : helperText;
  const selectedIndex = options.findIndex((o) => o.value === currentValue);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  const firstEnabled = () => options.findIndex((o) => !o.disabled);
  const lastEnabled = () => {
    for (let i = options.length - 1; i >= 0; i--) if (!options[i].disabled) return i;
    return -1;
  };
  const nextEnabled = (from: number) => {
    for (let i = from + 1; i < options.length; i++) if (!options[i].disabled) return i;
    return from;
  };
  const prevEnabled = (from: number) => {
    for (let i = from - 1; i >= 0; i--) if (!options[i].disabled) return i;
    return from;
  };

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('pointerdown', onPointer);
    return () => window.removeEventListener('pointerdown', onPointer);
  }, [open]);

  const openList = () => {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : firstEnabled());
    setOpen(true);
  };

  const commit = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (open) setActiveIndex((i) => nextEnabled(i));
        else openList();
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (open) setActiveIndex((i) => prevEnabled(i));
        else openList();
        break;
      case 'Home':
        if (open) {
          e.preventDefault();
          setActiveIndex(firstEnabled());
        }
        break;
      case 'End':
        if (open) {
          e.preventDefault();
          setActiveIndex(lastEnabled());
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (open && activeIndex >= 0) commit(options[activeIndex].value);
        else openList();
        break;
      case 'Escape':
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case 'Tab':
        if (open) setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className={cn(styles.field, className)}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={cn(styles.control, rounded && styles[rounded])}>
        <button
          ref={triggerRef}
          type="button"
          id={selectId}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && activeIndex >= 0 ? optionId(activeIndex) : undefined}
          aria-invalid={invalid || undefined}
          aria-describedby={message != null ? messageId : undefined}
          disabled={disabled}
          className={cn(
            styles.trigger,
            styles[size],
            invalid && styles.invalid,
            !selectedOption && styles.placeholder,
          )}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={onKeyDown}
        >
          <span className={styles.value}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className={styles.arrow} aria-hidden="true" />
        </button>
        {open && (
          <div id={listId} role="listbox" tabIndex={-1} className={styles.list}>
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                id={optionId(index)}
                role="option"
                tabIndex={-1}
                aria-selected={option.value === currentValue}
                disabled={option.disabled}
                className={cn(
                  styles.option,
                  index === activeIndex && styles.active,
                  option.disabled && styles.optionDisabled,
                )}
                onPointerMove={() => !option.disabled && setActiveIndex(index)}
                onClick={() => commit(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <select
        ref={ref}
        name={name}
        value={currentValue}
        required={required}
        disabled={disabled}
        aria-hidden="true"
        tabIndex={-1}
        className={styles.native}
        onChange={(e) => commit(e.target.value)}
      >
        {!selectedOption && <option value={currentValue} />}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {message != null && (
        <p id={messageId} className={cn(styles.message, invalid && styles.error)}>
          {message}
        </p>
      )}
    </div>
  );
});
