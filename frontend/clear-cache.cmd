@echo off
echo Limpiando cache y dependencias...
if exist node_modules\.cache rmdir /s /q node_modules\.cache
if exist node_modules\.tmp rmdir /s /q node_modules\.tmp
if exist node_modules\.vite rmdir /s /q node_modules\.vite
if exist dist rmdir /s /q dist
if exist .vite rmdir /s /q .vite
echo Cache limpiado. Ejecuta: npm run dev
pause