# morethanthat Analytics — Design System Guide
## For Codex / AI-assisted development

This document defines the visual language, component patterns, and coding conventions
for the **morethanthat Analytics** SaaS platform. Reference this guide before writing
any new UI code.

---

## 1. Design Philosophy

| Principle | Description |
|-----------|-------------|
| **Editorial + Data** | Combine the authority of editorial journalism (bold headlines, clean hierarchy) with the precision of analytics dashboards (monospace numbers, tight data grids) |
| **Organic + Precise** | Google Labs–inspired rounded forms (rounded-3xl, rounded-full) paired with exact metric readouts in JetBrains Mono |
| **Quiet Operator** | The UI should not scream. Status is communicated through color chips, not large red banners. Default state should feel calm and professional |
| **Progressive Disclosure** | Show the essential signal first. Let the user drill down. Avoid overwhelming the first viewport |

---

## 2. Color Palette

### Primary Accent Colors (Google Labs System)

```
Bright Blue:   #5e8fff   → Primary CTAs, active nav, key metrics, chart series 1
Bright Pink:   #ffb3d9   → Secondary highlights, player/engagement metrics, chart series 4
Lime Green:    #d4ff00   → Positive AI signals, growth callouts, insight cards
Mint Green:    #00f5a0   → Success states, positive trends, "stable" indicator, chart series 2
Coral Orange:  #ff8c69   → Revenue/monetization metrics, warnings, chart series 3
Soft Purple:   #b8a3ff   → AI/prediction context, secondary games, chart series 5
Soft Yellow:   #fff066   → Supplementary callouts (use sparingly)
```

### Base / Neutral System

```
Main Text:         #1f1f1f   → Primary text, headings
Secondary Text:    #5f6368   → Body copy, descriptions
Muted Text:        #9aa0a6   → Labels, placeholders, axis text
Surface:           #ffffff   → Cards, panels, inputs
Recessed:          #f8f9fa   → Code blocks, secondary cards, input backgrounds
Subtle Border:     #e8eaed   → Card borders, dividers
Faint Separator:   #f1f3f4   → Row dividers inside cards
```

### Status System

```
STABLE:  bg #e6f9f0 · text #1a7a4a · dot #1a7a4a
WATCH:   bg #fef9e6 · text #92610a · dot #f5a500
RISK:    bg #fef0f0 · text #c0392b · dot #c0392b
ALERT:   bg #2c0a0a · text #ff6b6b · border #c0392b
```

---

## 3. Typography

### Fonts
- **Inter** — all UI text (headings, body, labels, buttons)
- **JetBrains Mono** — all numeric values, IDs, timestamps, code, metric readouts

### Heading Scale

```
h1 — 2rem / 600 / tracking -0.02em   → Page titles
h2 — 1.5rem / 600 / tracking -0.01em → Section headers, card titles  
h3 — 1.25rem / 600                   → Sub-section headers
h4 — 1rem / 500                      → Card labels, field headers
```

### Eyebrow Labels (above headings)

Always use this pattern above major headings:
```tsx
<div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">
  Section Context
</div>
<h1>Main Title</h1>
```

### Metric Values (always monospace)

```tsx
<div className="font-mono text-2xl font-bold text-[#1f1f1f]">$445.2k</div>
<div className="font-mono text-xs font-semibold text-[#1a7a4a]">+12.4%</div>
```

---

## 4. Border Radius System

This is the most distinctive aspect of the design. Use aggressively rounded corners.

```
rounded-full    → Buttons, badges, pills, toggle switches, avatar circles
rounded-3xl     → Primary cards, chart containers, KPI cards (24px radius)
rounded-[40px]  → Section hero cards (large editorial blocks with bg color)
rounded-2xl     → Inner cards, input fields, table cells
rounded-xl      → Tab items, small chips
```

Never use `rounded-sm`, `rounded-md`, or `rounded-lg` in this system.

---

## 5. Component Recipes

### KPI Card (with sparkline)

```tsx
<div className="bg-white rounded-3xl p-5 border border-[#e8eaed] hover:shadow-lg hover:border-transparent transition-all">
  <div className="flex items-center justify-between mb-3">
    <div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
      <Icon className="w-4 h-4 text-[#1f1f1f]" strokeWidth={2} />
    </div>
    <div className={`flex items-center gap-1 px-2 py-1 rounded-full font-mono text-[11px] font-semibold ${
      isUp ? "bg-[#e6f9f0] text-[#1a7a4a]" : "bg-[#fef0f0] text-[#c0392b]"
    }`}>
      {isUp ? <TrendingUp /> : <TrendingDown />} {change}
    </div>
  </div>
  <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">{label}</div>
  <div className="font-mono text-2xl font-bold text-[#1f1f1f] mb-2">{value}</div>
  <div className="opacity-50 h-9">
    {/* tiny recharts BarChart, height=36, no axes */}
  </div>
</div>
```

### Status Badge (STABLE / WATCH / RISK)

```tsx
const STATUS_CONFIG = {
  STABLE: { bg: "#e6f9f0", text: "#1a7a4a" },
  WATCH:  { bg: "#fef9e6", text: "#92610a" },
  RISK:   { bg: "#fef0f0", text: "#c0392b" },
};

<span
  className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full"
  style={{ backgroundColor: STATUS_CONFIG[status].bg, color: STATUS_CONFIG[status].text }}
>
  {status}
</span>
```

### Chart Card Container

```tsx
<div className="bg-white rounded-3xl p-6 border border-[#e8eaed]">
  <div className="flex items-start justify-between mb-5">
    <div>
      <h3 className="text-[#1f1f1f] mb-0.5">{title}</h3>
      <p className="text-sm text-[#9aa0a6]">{subtitle}</p>
    </div>
    <div className="px-3 py-1 bg-[#f8f9fa] text-[#5f6368] text-xs font-mono rounded-full">{badge}</div>
  </div>
  <div className="h-72">
    <ResponsiveContainer width="100%" height="100%">
      {/* chart */}
    </ResponsiveContainer>
  </div>
</div>
```

### Editorial Section Card (colored header)

```tsx
<div className="rounded-[40px] overflow-hidden border border-[#e8eaed]">
  <div className="px-8 py-6" style={{ backgroundColor: accentColor }}>
    <div className="text-[10px] uppercase tracking-widest text-[#5f6368] font-semibold mb-1">{eyebrow}</div>
    <h2 className="text-[#1f1f1f]">{title}</h2>
  </div>
  <div className="bg-white px-8 py-7 rounded-t-[40px]">
    {/* content */}
  </div>
</div>
```

### Page Header

```tsx
<div className="border-b border-[#e8eaed] px-8 py-5">
  <div className="flex items-center justify-between">
    <div>
      <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-1">Context Label</div>
      <h1 className="text-[#1f1f1f]">Page Title</h1>
      <p className="text-sm text-[#5f6368] mt-0.5">Descriptive subtitle · Game · Date · Data status</p>
    </div>
    <div className="flex items-center gap-2">
      {/* actions */}
    </div>
  </div>
</div>
```

### Button System

```tsx
/* Primary */
<button className="px-5 py-2.5 bg-[#1f1f1f] text-white rounded-full text-sm font-medium hover:bg-[#3c4043] transition-colors">
  Action
</button>

/* Secondary (outline) */
<button className="px-5 py-2.5 border border-[#e8eaed] text-[#5f6368] rounded-full text-sm font-medium hover:bg-[#f8f9fa] transition-colors">
  Secondary
</button>

/* Accent (colored) */
<button className="px-5 py-2.5 bg-[#5e8fff] text-white rounded-full text-sm font-medium hover:bg-[#4a7aee] transition-colors">
  Connect
</button>

/* Icon button */
<button className="p-2.5 border border-[#e8eaed] rounded-full hover:bg-[#f8f9fa] transition-colors text-[#5f6368]">
  <Icon className="w-4 h-4" />
</button>
```

---

## 6. Chart Configuration (Recharts)

### Axis Styling (always use this pattern)

```tsx
const AXIS_PROPS = {
  stroke: "#9aa0a6",
  fontSize: 11,
  tickLine: false,
};

// XAxis
<XAxis dataKey="date" {...AXIS_PROPS} axisLine={{ stroke: "#e8eaed" }} />

// YAxis
<YAxis {...AXIS_PROPS} axisLine={false} />
```

### Tooltip Styling (always use this pattern)

```tsx
const TOOLTIP_STYLE = {
  backgroundColor: "#ffffff",
  border: "1px solid #e8eaed",
  borderRadius: "16px",
  fontSize: "12px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
};

<Tooltip contentStyle={TOOLTIP_STYLE} />
```

### Grid Lines

```tsx
<CartesianGrid strokeDasharray="3 3" stroke="#f1f3f4" vertical={false} />
```

### Color Sequence for Multi-Series Charts

1. `#5e8fff` — Bright Blue (primary)
2. `#00f5a0` — Mint Green
3. `#ff8c69` — Coral Orange
4. `#ffb3d9` — Bright Pink
5. `#b8a3ff` — Soft Purple

### Gradient Fills for Area Charts

```tsx
<defs>
  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor="#5e8fff" stopOpacity={0.25} />
    <stop offset="100%" stopColor="#5e8fff" stopOpacity={0.02} />
  </linearGradient>
</defs>
<Area fill="url(#areaGrad)" stroke="#5e8fff" strokeWidth={3} />
```

### Bar Styling

```tsx
/* Standard upright bar */
<Bar dataKey="value" fill="#5e8fff" radius={[6, 6, 0, 0]} barSize={24} />

/* Horizontal bar (for rankings) */
<Bar dataKey="value" fill="#5e8fff" radius={[0, 8, 8, 0]} barSize={14} layout="vertical" />
```

### Chart Type Selection Guide

| Data type | Recommended chart |
|-----------|------------------|
| Trend over time (single series) | AreaChart with gradient fill |
| Trend over time (multi-series) | LineChart or ComposedChart |
| DAU + NRU together | ComposedChart (Bar + Area) |
| Category comparison | Horizontal BarChart |
| Part-to-whole | PieChart with innerRadius (donut) |
| Multi-dimension comparison | RadarChart |
| Correlation (2 variables) | ScatterChart |
| Correlation (3 variables) | ScatterChart with ZAxis (bubble) |
| Conversion steps | Custom div-based funnel (more control than FunnelChart) |
| Cohort retention | Custom table with colored cells (heatmap) |
| Mini sparklines | Tiny BarChart (height: 36px, no axes) |

---

## 7. Layout Patterns

### Primary: Sidebar + Content

```
w-60 sidebar (sticky, h-screen) | flex-1 main content (overflow-auto)
```

Sidebar structure:
1. Logo (48px)
2. Nav sections with eyebrow labels
3. Workspace switcher at bottom

### Two-Panel Split View (Archive + Detail)

Used in: Watchtower, Games
```
w-56 left panel | flex-1 right content
```

### Three-Column Analysis

Used in: Reports, Watchtower detail
```
3/5 main chart area | 2/5 supporting panel
```

OR

```
3/5 briefing content | 2/5 metadata + signals
```

### Dashboard Grid

```
6-column KPI row
Full-width chart
3/5 + 2/5 split
1/2 + 1/2 split
Full-width callout
```

### Right Sidebar / Operator Panel

Used as a quiet secondary column for:
- Status metadata (freshness, delivery)
- Operations summary  
- Data source status
- Signals / missing inputs

Width: `w-64` to `w-72`, left border `border-l border-[#e8eaed]`

---

## 8. Page Structure Patterns

### Dashboard Page

1. Status bar (freshness indicator + date range selector)
2. KPI grid (4–6 cards with sparklines)
3. Primary trend chart (full width AreaChart)
4. Secondary charts (2–3 column grid with varied chart types)
5. AI Insight callout (lime green `#d4ff00` background)

### Briefing/Watchtower Page

1. Archive sidebar (left, `w-56`)
2. Hero card (blue `#5e8fff` background, large editorial headline)
3. Pillar status grid (3 columns, slide up from hero)
4. Detail content: Top Risks | Watch Items | Confidence | Signals

### Analysis/Reports Page

1. Tab navigation (Growth / Retention / Monetization / Engagement)
2. KPI chip row (4 numbers for active tab)
3. Chart area (changes per tab)
4. Right operator panel (Operations | Freshness | Signals)

### Settings Page

1. Tab navigation (left-aligned pills)
2. Color-coded section cards (different accent per section)
3. Right status sidebar (Current state | Operating baseline)

---

## 9. Color-to-Purpose Mapping

| Context | Color |
|---------|-------|
| Primary actions, active nav | `#1f1f1f` (dark) or `#5e8fff` (blue) |
| Revenue / monetization metrics | `#ff8c69` coral |
| User / engagement metrics | `#ffb3d9` pink |
| Retention metrics | `#00f5a0` mint |
| AI / prediction / insights | `#b8a3ff` purple |
| Growth / positive signal callout | `#d4ff00` lime |
| Workspace defaults section | `#ffb3d9` pink |
| Delivery / integrations section | `#00f5a0` mint |
| Retention analysis section | `#b8a3ff` purple |
| Monetization analysis section | `#ff8c69` coral |
| Data/privacy section | `#b8a3ff` purple |
| AI config section | `#ffb3d9` pink |

---

## 10. Do's and Don'ts

### ✅ DO

- Use `font-mono` for **all** numbers, percentages, IDs, timestamps, metric values
- Use `text-[10px] uppercase tracking-widest font-semibold` for **all** eyebrow labels
- Use `rounded-full` for pills, badges, buttons
- Use `rounded-3xl` for cards, `rounded-[40px]` for section heroes
- Use `transition-all duration-150` or `transition-colors` on interactive elements
- Use `border border-[#e8eaed]` on white cards
- Use `hover:shadow-lg hover:border-transparent` on primary KPI cards
- Use `opacity-50` to de-emphasize sparklines inside cards
- Pair every large metric with a delta badge (trend direction + change value)
- Use `activeDot={{ r: 6, fill: color, stroke: "white", strokeWidth: 2 }}` on AreaCharts
- Keep axis labels in `#9aa0a6`, not `#5f6368`

### ❌ DON'T

- Don't use gradients as backgrounds on section headers — use flat solid accent colors
- Don't use Tailwind typography utilities (text-2xl, font-bold, leading-none) for h1–h4 — these are defined in `theme.css`
- Don't add shadows to bordered cards by default — only on hover
- Don't use `rounded-sm`, `rounded-md`, `rounded-lg` — they're inconsistent with the system
- Don't use `text-gray-500` or any Tailwind named colors — always use hex values from the palette
- Don't use vertical grid lines in charts — only horizontal (`vertical={false}`)
- Don't add axis lines to YAxis — only to XAxis
- Don't use pie charts without `innerRadius` — always use donut style
- Don't use bright accent colors for text on white — they're for backgrounds only
- Don't stack more than 3 series on a RadarChart

---

## 11. File Structure

```
/src/app/
  App.tsx                     → RouterProvider entry
  routes.tsx                  → createBrowserRouter config
  components/
    Layout.tsx                → Sidebar + Outlet wrapper
    figma/                    → Protected Figma components
    ui/                       → Shared UI primitives
  pages/
    Dashboard.tsx             → KPIs + 6 chart types
    Watchtower.tsx            → Editorial briefing + archive
    Games.tsx                 → Portfolio + funnel + cohort heatmap
    Reports.tsx               → Tabbed analysis + operator panel
    Insights.tsx              → AI chat with inline charts
    Settings.tsx              → Color-coded config sections

/src/styles/
  fonts.css                   → Google Fonts imports (Inter, JetBrains Mono)
  theme.css                   → CSS custom properties + @theme inline + base typography
  index.css                   → Imports: fonts → tailwind → theme
  tailwind.css                → Tailwind v4 directives
```

---

## 12. Animation & Interaction

```tsx
/* Hover lift for cards */
className="hover:shadow-lg hover:border-transparent transition-all duration-200"

/* Nav active state (no animation — instant) */
className="transition-all duration-150"

/* Button press feel */
className="active:scale-95 transition-transform"

/* Toggle slide */
className="transition-transform" (on the inner circle)
```

Keep animations subtle. No bouncing, spinning, or large transforms.
Data tables, charts, and dashboards should feel stable and professional.

---

## 13. Responsive Behavior

The primary design target is **desktop** (1280px+). Key breakpoints:

- 6-column KPI grid → 3-column at md, 2-column at sm
- Side-by-side charts → stack at md
- Sidebar is fixed on desktop; becomes collapsible on tablet
- Min content width: 900px before horizontal scroll

---

*Last updated: March 26, 2026 · morethanthat Analytics v2*
