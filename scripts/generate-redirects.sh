#!/bin/bash

# Script para gerar páginas de redirect estáticas para LPs antigas

SLUGS=(
  "sddsorkut"
  "millennial"
  "sonholucido"
  "sentido"
  "meioblackmirror"
  "macacosurbanos"
  "euacho"
  "nosquereminfelizes"
  "ghosting"
  "1000caminhos"
)

mkdir -p public/pages/lps

for slug in "${SLUGS[@]}"; do
  mkdir -p "public/pages/lps/$slug"
  cat > "public/pages/lps/$slug/index.html" << EOF
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Redirecionando...</title>
    <meta http-equiv="refresh" content="0;url=/lps/$slug">
    <link rel="canonical" href="/lps/$slug">
</head>
<body>
    <p>Redirecionando para <a href="/lps/$slug">/lps/$slug</a>...</p>
    <script>
        window.location.href = '/lps/$slug';
    </script>
</body>
</html>
EOF
  echo "✓ Criado redirect para /pages/lps/$slug"
done

echo "✓ Todos os redirects foram gerados!"
