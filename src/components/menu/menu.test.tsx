import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LampButton } from '../lamp-button';
import { Menu } from './menu';
import type { MenuEntry } from './menu';

const items: MenuEntry[] = [
  { label: 'Rename' },
  { separator: true },
  { label: 'Delete', danger: true },
];

describe('Menu trigger', () => {
  it('wraps a plain trigger in its own button', () => {
    render(<Menu trigger="Actions" items={items} />);
    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(trigger);
    expect(screen.getByRole('menu')).toBeTruthy();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('clones a button trigger under asChild instead of wrapping it', () => {
    const { container } = render(
      <Menu
        asChild
        trigger={
          <button type="button" className="own-look">
            Actions
          </button>
        }
        items={items}
      />,
    );
    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(container.querySelectorAll('button')).toHaveLength(1);
    expect(trigger.className).toBe('own-look');
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByRole('menu').getAttribute('aria-labelledby')).toBe(trigger.id);
  });

  it('composes the element own click handler before toggling', () => {
    const onClick = vi.fn();
    render(
      <Menu
        asChild
        trigger={
          <button type="button" onClick={onClick}>
            Actions
          </button>
        }
        items={items}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('menu')).toBeTruthy();
  });

  it('lets the element veto opening with preventDefault', () => {
    render(
      <Menu
        asChild
        trigger={
          <button type="button" onClick={(event) => event.preventDefault()}>
            Actions
          </button>
        }
        items={items}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('opens a cloned trigger from the keyboard', () => {
    render(<Menu asChild trigger={<button type="button">Actions</button>} items={items} />);
    fireEvent.keyDown(screen.getByRole('button', { name: 'Actions' }), { key: 'ArrowDown' });
    expect(screen.getByRole('menu')).toBeTruthy();
  });

  it('returns focus to the cloned trigger on Escape', () => {
    render(<Menu asChild trigger={<button type="button">Actions</button>} items={items} />);
    const trigger = screen.getByRole('button', { name: 'Actions' });
    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it('clones LampButton the way the radio admin passes it', () => {
    const { container } = render(
      <Menu asChild trigger={<LampButton tone="green">Actions</LampButton>} items={items} />,
    );
    expect(container.querySelectorAll('button')).toHaveLength(1);
    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
    expect(document.activeElement).toBe(trigger);
  });

  it('falls back to wrapping when an asChild trigger is not an element', () => {
    render(<Menu asChild trigger="Actions" items={items} />);
    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
  });
});
