@echo off
echo 🚀 Iniciando deploy manual a GitHub Pages...

echo 📦 Construyendo el proyecto...
call npm run build

echo 📁 Navegando al directorio dist...
cd dist

echo 🔧 Configurando git...
git init
git add -A
git commit -m "Deploy to GitHub Pages"

echo 🌐 Subiendo a GitHub Pages...
git remote add origin https://github.com/AleeJoM/Propuesta-Interactiva.git
git branch -M gh-pages
git push -f origin gh-pages

echo ✅ Deploy completado!
echo 🌐 Tu sitio estará disponible en: https://aleejom.github.io/Propuesta-Interactiva/

pause
