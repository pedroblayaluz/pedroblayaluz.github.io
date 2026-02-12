# Como Adicionar Novas Páginas

## Template para página com decorativos

### 1. Criar componente de conteúdo (client)
`src/components/NewPageContent.tsx`
```tsx
'use client';

import { DecoratedPageLayout } from '@/components/DecoratedPageLayout';

export function NewPageContent() {
  return (
    <DecoratedPageLayout backgroundColor="#f7f1ff">
      {/* Your content here */}
      <section>
        <h1>Nova Página</h1>
      </section>
    </DecoratedPageLayout>
  );
}
```

### 2. Criar página (server, com metadata)
`src/app/new-page/page.tsx`
```tsx
import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { NewPageContent } from "@/components/NewPageContent";

export const metadata: Metadata = createMetadata(
  "Título da Página",
  "Descrição",
  "/pedroluz.ico"
);

export default function NewPage() {
  return <NewPageContent />;
}
```

### 3. Exportar no index
`src/components/index.ts`
```ts
export { NewPageContent } from "./NewPageContent";
```

## Layer Management

Se precisar customizar camadas:
```tsx
import { LAYERS } from "@/lib/layerConfig";

// Use os valores centralizados
<div style={{ zIndex: LAYERS.CONTENT }}>
  {/* content */}
</div>
```

## Navegação

### Para adicionar à navbar global
Edite `src/components/Navbar.tsx` na `<ul>`:
```tsx
<li>
  <Link href="/new-page" ...>
    novo link
  </Link>
</li>
```

## Animações

### Desabilitar animações para uma página
```tsx
<DecoratedPageLayout
  backgroundColor="#f7f1ff"
  showAnimations={false}  // Sem raios/neve
  showMountains={true}    // Com montanhas
>
```

### Usar cor de fundo customizada
```tsx
<DecoratedPageLayout backgroundColor="#xyz123">
```

## Exemplos Existentes

- **Página estática simples**: `src/app/main/page.tsx` → `MainPageContent.tsx`
- **Página dinâmica**: `src/app/pages/lps/[slug]/page.tsx` → `LPPage.tsx`
- **Landing customizada**: `src/app/page.tsx` (usa navbar diferente)
