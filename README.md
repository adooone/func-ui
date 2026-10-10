# Func UI

A glossy, noisy, cosy React component library — **frosted glass**, **film grain**,
and a **lava-lamp glow**. Extracted from the [df.adoo.one](https://df.adoo.one) CV site.

> `@dendelion/func-ui` · React 18 · Tailwind-friendly · CSS-modules under the hood

**Showcase:** [func-ui.vercel.app](https://func-ui.vercel.app) — every component, live.
Run `pnpm dev` for the same tour locally.

## Install

```bash
pnpm add @dendelion/func-ui
```

Two imports are required: the components and the stylesheet. The JS bundle does
**not** pull the CSS in for you, so skipping the second line leaves everything
unstyled.

```tsx
import { Backdrop, Button, Glass } from '@dendelion/func-ui';
import '@dendelion/func-ui/dist/index.css';

export default function App() {
  return (
    <Backdrop>
      <Glass className="p-12">
        Frosted. Noisy. Cosy.
        <Button>Give up the funk</Button>
      </Glass>
    </Backdrop>
  );
}
```

Toggle dark mode by adding/removing the `dark` class on `<html>` — every token
(`--fui-*`) retints automatically.

## Fonts

The stylesheet declares `@font-face` for Montserrat Alternates (body), KyivType
Serif (titles) and Tiny5 (pixel accents), pointing at absolute `/fonts/*.woff2`
URLs. The package ships the files; your app has to serve them from that path:

```bash
cp -r node_modules/@dendelion/func-ui/dist/fonts public/fonts
```

Without them the components still work — the browser just falls back to the
next family in each stack.

## Tailwind preset

Optional, and only needed if you want the library's tokens as Tailwind
utilities (`font-title`, `text-accent`, `shadow-offset`, `animate-grain`, …).

```ts
// tailwind.config.ts
import { funcPreset } from '@dendelion/func-ui/tailwind';
export default { presets: [funcPreset], content: [/* ... */] };
```

## Components

Everything is hard-edged by default (the film aesthetic). `Input`, `Textarea`,
`Select`, `Checkbox`, `Modal`, `Chip`, `Stamp`, `Menu` and `SegmentedControl`
also take `rounded="full" | "half"` — the lamp family's pill and soft-square
radii — for retro consumers; unset keeps today's square look.

### Ambient

| Component | What it is |
| --- | --- |
| `Grain` | Drifting film-grain overlay |
| `Glow` | The lava-lamp gooey glow (colour follows `--fui-glow`) |
| `Backdrop` | Full-bleed ambient shell — composes `Glow` + `Grain` behind content |
| `Glass` | The frosted translucent surface primitive |

### Actions

| Component | What it is |
| --- | --- |
| `Button` | The primary action, in the offset-shadow style |
| `IconButton` | Square icon-only button |
| `LinkButton` | An anchor that looks like a `Button` |
| `FileButton` | A button wrapping a hidden file input (`onFiles`) |
| `CopyButton` | Copies text to the clipboard and confirms inline |
| `LampButton` | The lit retro action — `tone` is the lamp colour, `rounded` the pill or soft square |
| `LampIconButton` | Icon-only lamp, square with a round lit surface |

### Forms

| Component | What it is |
| --- | --- |
| `Input` | Single-line text field with label and error slots |
| `Textarea` | Multi-line counterpart |
| `Select` | Combobox over `SelectOption[]`, with a hidden native select for form posts |
| `Checkbox` | Checkbox with label |
| `Radio` / `RadioGroup` | A single radio, or a managed group from `RadioOption[]` |
| `Switch` | On/off toggle |
| `LampSwitch` | Lit rocker with the O / I legend, on the same native checkbox |
| `Slider` | Range input, horizontal or vertical |

### Overlays

| Component | What it is |
| --- | --- |
| `Tooltip` | Hover/focus tooltip around any single child |
| `ToastProvider` / `useToast` | Toast host plus the hook that pushes them |
| `Modal` | Centred dialog with a glass panel |
| `Drawer` | Panel that slides in from any side |
| `Menu` | Dropdown menu of items and separators |

### Progress and status

| Component | What it is |
| --- | --- |
| `Stamp` | Small status label — the five semantic variants |
| `StatusDot` | Just the dot, optionally pulsing |
| `Alert` | Block-level message, dismissible |
| `Spinner` | Indeterminate spinner |
| `Progress` | Linear progress bar |
| `CircularProgress` | Ring progress, with an optional `glow` halo |
| `LampStatus` | The lit machine status — running / stopped / error / initializing |
| `LampMeter` | LED bar meter — `lampCount` LEDs in a recessed track |
| `Skeleton` | Loading placeholder (text, rect, circle) |
| `EmptyState` | Loading / empty / error panel with icon, title and action |

### Nav and data

| Component | What it is |
| --- | --- |
| `Card` | Content surface, optionally clickable |
| `ListItem` | Dense selectable row with icon and action slots |
| `Divider` | Rule, horizontal or vertical, with an optional label |
| `Chip` | Toggleable filter pill |
| `SegmentedControl` | Exclusive choice between a few options |
| `Tabs` | Tab strip plus panels, horizontal or vertical |
| `Breadcrumb` | Trail of links ending in the current page |
| `DataTable` | Typed table — `DataTableColumn<T>[]` over your rows |

### Text

| Component | What it is |
| --- | --- |
| `Kbd` | Keycap |
| `InlineCode` | Inline code span |
| `CodeBlock` | Multi-line code with optional add/remove diff markers |

### Also exported

`Icon` (the built-in `IconName` set), the `LampTone` / `LampSize` types shared by
the lamp family, and `cn`, the `clsx` + `tailwind-merge` class joiner the
components use internally.

## Develop

```bash
pnpm install
pnpm dev              # run the showcase
pnpm build            # build the library (dist/)
pnpm build:showcase   # build the showcase site (dist/app/)
pnpm ci               # types + lint + build
```

Work is organised as ideas under `papercamp/ideas/`, one branch per idea.
See [CONTRIBUTING.md](CONTRIBUTING.md) for the branch, commit and pull-request
flow.

## License

MIT © Dendelion
