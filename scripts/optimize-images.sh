#!/bin/bash

# Script para otimizar imagens usando sips (macOS nativo)
# Cria versões em diferentes resoluções para cada uso

set -e

PROJECT_ROOT="/Users/pedroluz/Desktop/codigo/site_novo"
OPTIMIZED_DIR="$PROJECT_ROOT/public/optimized"

mkdir -p "$OPTIMIZED_DIR"

echo "🖼️  Iniciando otimização de imagens (usando sips)..."
echo ""

# ============= ALBUMS =============
echo "📀 Otimizando albums (300x300 thumb, 600x600 full)..."
mkdir -p "$OPTIMIZED_DIR/albums"

for album in "$PROJECT_ROOT"/public/albums/*.jpg; do
    filename=$(basename "$album" .jpg)
    
    # Versão para card/grid (300x300)
    sips -Z 300 300 "$album" -o "$OPTIMIZED_DIR/albums/${filename}-thumb.jpg" 2>/dev/null || cp "$album" "$OPTIMIZED_DIR/albums/${filename}-thumb.jpg"
    
    # Versão para modal/full (600x600)
    sips -Z 600 600 "$album" -o "$OPTIMIZED_DIR/albums/${filename}-full.jpg" 2>/dev/null || cp "$album" "$OPTIMIZED_DIR/albums/${filename}-full.jpg"
    
    echo "  ✓ $filename"
done

# ============= POESIAS =============
echo ""
echo "📝 Otimizando poesias (350x350 thumb, 800x800 full)..."
mkdir -p "$OPTIMIZED_DIR/poesias"

for poesia in "$PROJECT_ROOT"/public/poesias/*; do
    [ -f "$poesia" ] || continue
    filename=$(basename "$poesia")
    extension="${filename##*.}"
    basename="${filename%.*}"
    
    # GIFs são copiados como-estão (sem otimização)
    if [ "$extension" = "gif" ]; then
        cp "$poesia" "$OPTIMIZED_DIR/poesias/${filename}"
        echo "  ✓ $filename (GIF copiado como-está)"
        continue
    fi
    
    # Versão thumbnail para grid (350x350)
    sips -Z 350 350 "$poesia" -o "$OPTIMIZED_DIR/poesias/${basename}-thumb.jpg" 2>/dev/null || cp "$poesia" "$OPTIMIZED_DIR/poesias/${basename}-thumb.jpg"
    
    # Versão full para modal (800x800)
    sips -Z 800 800 "$poesia" -o "$OPTIMIZED_DIR/poesias/${basename}-full.jpg" 2>/dev/null || cp "$poesia" "$OPTIMIZED_DIR/poesias/${basename}-full.jpg"
    
    echo "  ✓ $basename"
done

# ============= PROJETOS =============
echo ""
echo "🎨 Otimizando projetos (240x192 thumb, 600x480 full)..."
mkdir -p "$OPTIMIZED_DIR/projetos/criatura"
mkdir -p "$OPTIMIZED_DIR/projetos/sta_marta"

for projeto in "$PROJECT_ROOT"/public/projetos/**/*.{jpg,jpeg,png}; do
    [ -f "$projeto" ] || continue
    
    filename=$(basename "$projeto")
    extension="${filename##*.}"
    basename="${filename%.*}"
    dir=$(dirname "$projeto" | xargs basename)
    
    # Skip .png files (provavelmente logos)
    if [ "$extension" = "png" ]; then
        echo "  ⊘ $filename (PNG preservado)"
        continue
    fi
    
    # Versão thumbnail para grid (240x192)
    sips -Z 240 192 "$projeto" -o "$OPTIMIZED_DIR/projetos/$dir/${basename}-thumb.jpg" 2>/dev/null || cp "$projeto" "$OPTIMIZED_DIR/projetos/$dir/${basename}-thumb.jpg"
    
    # Versão full para modal (600x480)
    sips -Z 600 480 "$projeto" -o "$OPTIMIZED_DIR/projetos/$dir/${basename}-full.jpg" 2>/dev/null || cp "$projeto" "$OPTIMIZED_DIR/projetos/$dir/${basename}-full.jpg"
    
    echo "  ✓ $dir/$filename"
done

# ============= MOUNTAINS =============
echo ""
echo "🏔️  Otimizando background mountains..."
mkdir -p "$OPTIMIZED_DIR"

if [ -f "$PROJECT_ROOT/public/mountains.png" ]; then
    # Desktop version (1920 width)
    sips -Z 1920 600 "$PROJECT_ROOT/public/mountains.png" -o "$OPTIMIZED_DIR/mountains-desktop.jpg" 2>/dev/null || cp "$PROJECT_ROOT/public/mountains.png" "$OPTIMIZED_DIR/mountains-desktop.jpg"
    
    # Mobile version (1280 width)
    sips -Z 1280 400 "$PROJECT_ROOT/public/mountains.png" -o "$OPTIMIZED_DIR/mountains-mobile.jpg" 2>/dev/null || cp "$PROJECT_ROOT/public/mountains.png" "$OPTIMIZED_DIR/mountains-mobile.jpg"
    
    echo "  ✓ mountains-desktop (1920x600)"
    echo "  ✓ mountains-mobile (1280x400)"
fi

# ============= SUMMARY =============
echo ""
echo "✅ Otimização concluída!"
echo ""
echo "📊 Arquivos gerados:"
echo "   $(find "$OPTIMIZED_DIR" -type f 2>/dev/null | wc -l) imagens otimizadas"
echo ""
echo "💾 Tamanho total:"
du -sh "$OPTIMIZED_DIR" 2>/dev/null || echo "   (tamanho indisponível)"
echo ""
echo "📁 Localização: $OPTIMIZED_DIR"
echo ""
echo "📋 Estrutura criada:"
echo "   optimized/"
echo "   ├── albums/"
echo "   │   ├── {name}-thumb.jpg (300x300)"
echo "   │   └── {name}-full.jpg (600x600)"
echo "   ├── poesias/"
echo "   │   ├── {name}-thumb.jpg (350x350)"
echo "   │   └── {name}-full.jpg (800x800)"
echo "   ├── projetos/criatura/"
echo "   │   ├── {name}-thumb.jpg (240x192)"
echo "   │   └── {name}-full.jpg (600x480)"
echo "   ├── projetos/sta_marta/"
echo "   │   ├── {name}-thumb.jpg (240x192)"
echo "   │   └── {name}-full.jpg (600x480)"
echo "   ├── mountains-desktop.jpg (1920x600)"
echo "   └── mountains-mobile.jpg (1280x400)"
echo ""
echo "🚀 Próximos passos:"
echo "   1. Revisar as imagens em: $OPTIMIZED_DIR"
echo "   2. Adicionar as otimizadas ao git"
echo "   3. Atualizar componentes para usar -thumb e -full"
echo "   4. Usar srcSet para servir versões corretas"
