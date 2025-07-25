#!/bin/bash

# Script para deploy manual a GitHub Pages
echo "🚀 Iniciando deploy manual a GitHub Pages..."

# Construir el proyecto
echo "📦 Construyendo el proyecto..."
npm run build

# Ir al directorio dist
cd dist

# Inicializar git en dist
git init
git add -A
git commit -m "Deploy to GitHub Pages"

# Agregar remote y push a gh-pages branch
git remote add origin https://github.com/AleeJoM/Propuesta-Interactiva.git
git branch -M gh-pages
git push -f origin gh-pages

echo "✅ Deploy completado!"
echo "🌐 Tu sitio estará disponible en: https://aleejom.github.io/Propuesta-Interactiva/"
