# Arquitetura Refatorada

## Structure Overview

### Core Layering System (`lib/layerConfig.ts`)
Todas as páginas seguem a mesma ordem de z-index:
- **0**: Background elements (mountains)
- **1**: Decorative animations (lightning, snowflakes)
- **100**: Page content (cards, main content)
- **1000**: Mobile menu dropdown
- **1001**: Navbar (always on top)

### Component Factory Pattern

#### `DecoratedPageLayout` 
Component wrapper que centraliza todos os elementos decorativos:
```tsx
<DecoratedPageLayout 
  backgroundColor="#f7f1ff"
  showMountains={true}
  showAnimations={true}
>
  {/* Your page content here */}
</DecoratedPageLayout>
```

**Benefits:**
- Consistent decoration layer ordering
- Easy to enable/disable decorations
- Reusable across pages
- Single source of truth for decorative logic

### Page Structure

#### Static Pages (with metadata)
```
src/app/main/page.tsx (server component with metadata)
  └─ imports → MainPageContent (client component)
    └─ uses → DecoratedPageLayout
```

#### Dynamic Pages (like LPs)
```
src/app/pages/lps/[slug]/page.tsx (server component with dynamic metadata)
  └─ renders → LPPage component (client component)
    └─ uses → DecoratedPageLayout
```

#### Landing/Catch-all Pages
```
src/app/page.tsx (custom implementation)
  └─ Direct DecoratedPageLayout usage OR custom navbar
```

## Navigation Structure

### Global Layout (`src/app/layout.tsx`)
Routes EXCEPT `/` (landing page):
```
└─ LayoutWrapper
    ├─ Navbar (global, from Navbar component)
    └─ main (with pt-14 padding)
        └─ {children}
```

### Landing Page (`src/app/page.tsx`)
- Route: `/`
- Custom navbar that appears on scroll
- Own navigation UI (not using global Navbar)

### Portfolio (`src/app/portfolio/page.tsx`)
- Route: `/portfolio`
- Uses global Navbar
- Clean separation with PortfolioContent component

### Dynamic LPs (`src/app/lps/[slug]/page.tsx`)
- Routes: `/lps/sddsorkut`, `/lps/millennial`, etc.
- Uses global Navbar
- LPPage component handles special layout

## File Organization

```
src/
├── app/
│   ├── layout.tsx                 (root layout with LayoutWrapper)
│   ├── page.tsx                   (landing - route /)
│   ├── portfolio/
│   │   └── page.tsx              (portfolio - route /portfolio)
│   └── lps/[slug]/
│       └── page.tsx              (dynamic LPs - route /lps/[slug])
│
├── components/
│   ├── index.ts                   (centralized exports)
│   ├── Navbar.tsx                 (global navigation)
│   ├── LayoutWrapper.tsx          (root layout wrapper)
│   ├── DecoratedPageLayout.tsx    (factory for decorated pages)
│   ├── PortfolioContent.tsx       (portfolio page content)
│   ├── LPPage.tsx                 (LP page content)
│   ├── LightningAnimation.tsx     (uses LAYERS.DECORATIONS)
│   ├── SnowflakesAnimation.tsx    (uses LAYERS.DECORATIONS)
│   └── ... (other components)
│
└── lib/
    ├── layerConfig.ts             (centralized z-index values)
    ├── content-metadata.ts
    ├── lps-metadata.ts
    └── metadata.ts
```

## Design Patterns Used

### 1. **Factory Pattern** (`DecoratedPageLayout`)
- Creates consistent page layouts with decorations
- Abstracts away z-index complexity
- Easy to extend with new decoration types

### 2. **Separation of Concerns**
- Server components handle: metadata, routing, static generation
- Client components handle: interactivity, state, animations
- Layout components handle: structure and layering

### 3. **Centralization** (`layerConfig.ts`)
- Single source of truth for z-index values
- Easy to adjust layer order for all pages at once
- Prevents z-index conflicts

## Migration Notes

If adding new pages:
1. Import `DecoratedPageLayout` from components
2. Wrap your content with it:
   ```tsx
   <DecoratedPageLayout backgroundColor="#your-color">
     {/* Your content */}
   </DecoratedPageLayout>
   ```
3. Use consistent navbar either:
   - Through LayoutWrapper (global Navbar)
   - Custom navbar like landing page
4. Reference colors/styling from LAYERS in layerConfig

## Key Improvements

✅ **Before**: Multiple z-index values scattered (0, 1, 50, 100, 999, 1000, 1001, 9998, 9999)
✅ **After**: Centralized in one file with clear semantics

✅ **Before**: Duplicate decorative code in main/page.tsx, LPPage.tsx, page.tsx
✅ **After**: Reusable DecoratedPageLayout factory component

✅ **Before**: Confusing pages folder with empty layouts
✅ **After**: Clear page structure with MainPageContent separation

✅ **Before**: Hardcoded animations with no way to control them
✅ **After**: Toggleable animations via DecoratedPageLayout props
