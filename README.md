# Halcones Torrevieja - Web

Sitio web oficial del club de hockey línea Halcones de Torrevieja.

## 🚀 Inicio Rápido

1. **Instalar dependencias**:
   ```bash
   npm install
   ```
2. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

## 🛠️ Mantenimiento de Datos

Este proyecto utiliza scrapers automáticos para obtener datos de la federación.

*   **Partidos y Calendario**: Se almacenan en Supabase.
*   **Estadísticas de Jugadores**: Se almacenan en `src/data/player_stats.json`.

Para aprender cómo actualizar estos datos, consulta la:
👉 **[Guía de Scrapers](./scripts/SCRAPERS_GUIDE.md)**

## 🌐 Tecnologías used

*   **Frontend**: React + Vite + Tailwind CSS
*   **Animaciones**: Framer Motion
*   **Base de datos**: Supabase
*   **Scraping**: Node.js + Puppeteer
