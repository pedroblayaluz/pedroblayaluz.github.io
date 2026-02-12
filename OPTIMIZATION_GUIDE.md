# 🖼️ Guia de Uso das Imagens Otimizadas

## 📊 Resumo da Otimização

Foram geradas **70 imagens otimizadas** em diferentes resoluções conforme o uso:

### Estrutura Criada

```
public/optimized/
├── albums/
│   ├── 1000-caminhos-thumb.jpg (300x300)
│   ├── 1000-caminhos-full.jpg (600x600)
│   ├── ghosting-thumb.jpg
│   ├── ghosting-full.jpg
│   ├── infelizes-thumb.jpg
│   ├── infelizes-full.jpg
│   ├── millennial-thumb.jpg
│   ├── millennial-full.jpg
│   ├── sdds-orkut-thumb.jpg
│   ├── sdds-orkut-full.jpg
│   ├── sonho-lucido-thumb.jpg
│   └── sonho-lucido-full.jpg (12 arquivos)
│
├── poesias/
│   ├── {title}-thumb.jpg (350x350) - para grid
│   └── {title}-full.jpg (800x800) - para modal
│   (48 arquivos - 24 poesias × 2)
│
├── projetos/
│   ├── criatura/{name}-opt.jpg (600x480)
│   └── sta_marta/{name}-opt.jpg (600x480)
│   (8 arquivos)
│
├── mountains-desktop.jpg (1920x600)
└── mountains-mobile.jpg (1280x400)
```

## 🎯 Tamanhos Otimizados

### Albums (LPs)
- **Thumb**: 300x300px - Usado em cards/grid
- **Full**: 600x600px - Usado em modais/detalhes

### Poesias
- **Thumb**: 350x350px - Grid em página principal
- **Full**: 800x800px - Modal ao clicar

### Projetos
- **Opt**: 600x480px - Cards em grid (largura máxima mantida)

### Mountains (Background)
- **Desktop**: 1920x600px - Full HD desktop
- **Mobile**: 1280x400px - Mobile/tablet views

## 📝 Como Usar nos Componentes

### LPPage Component
```tsx
// Antes (tamanho original)
<Image src={lp.image} fill style={{ objectFit: 'cover' }} />

// Depois (com srcSet)
<Image 
  src={`/optimized/albums/${albumName}-full.jpg`}
  fill 
  style={{ objectFit: 'cover' }}
  sizes="(max-width: 640px) 90vw, 600px"
  priority
/>
```

###PoetryGrid Component
```tsx
// Grid thumbnail
<Image
  src={`/optimized/poesias/${poetry.filename.replace(/\.\w+$/, '')}-thumb.jpg`}
  alt={poetry.title}
  fill
  style={{ objectFit: 'cover' }}
  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
/>

// Modal full
<Image
  src={`/optimized/poesias/${poetry.filename.replace(/\.\w+$/, '')}-full.jpg`}
  alt={poetry.title}
  width={800}
  height={800}
  style={{ width: '100%', height: 'auto' }}
/>
```

### ProjectsGrid Component
```tsx
// Card image
<Image
  src={`/optimized/projetos/${project.id}/${project.imageName}-opt.jpg`}
  alt={project.title}
  fill
  style={{ objectFit: 'cover' }}
  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 300px"
/>
```

### Mountains Background
```tsx
// Desktop
<Image
  srcSet="/optimized/mountains-desktop.jpg 1920w, /optimized/mountains-mobile.jpg 1280w"
  src="/optimized/mountains-desktop.jpg"
  alt="Mountains"
  sizes="100vw"
  style={{
    width: '100%',
    height: '600px',
    objectFit: 'cover'
  }}
/>

// Ou com media queries no CSS
<picture>
  <source media="(min-width: 1024px)" srcSet="/optimized/mountains-desktop.jpg" />
  <source media="(max-width: 1023px)" srcSet="/optimized/mountains-mobile.jpg" />
  <img src="/optimized/mountains-desktop.jpg" alt="Mountains" />
</picture>
```

## ⚡ Ganhos de Performance

### Redução de Tamanho (Estimado)

| Tipo | Antes | Depois | Redução |
|------|-------|--------|---------|
| Albums (6 × 2) | ~12MB | ~3MB | 75% |
| Poesias (24 × 2) | ~24MB | ~6MB | 75% |
|Projetos (8) | ~16MB | ~4MB | 75% |
| Mountains | (2 versões) | ~2.1MB | 90% |
| **Total estimado** | **~52MB** | **~15MB** | **71%** |

## 🔄 Próximos Passos

1. ✅ Imagens geradas em `public/optimized/`
2. ⏳ Atualizar componentes para usar as versões otimizadas
3. ⏳ Testar carregamento em diferentes devices
4. ⏳ Considerar WebP com fallback (próxima otimização)
5. ⏳ Implementar lazy loading
6. ⏳ Adicionar `srcSet` e `sizes` para melhor responsividade

## 📦 Para Regenerar

```bash
./optimize-images.sh
```

O script usa `sips` (ferramenta nativa do macOS) - nenhuma dependência extra necessária!
