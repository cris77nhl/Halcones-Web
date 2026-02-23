# Guía de Scrapers - Halcones Web

Esta guía explica cómo mantener actualizados los datos de partidos y jugadores en la web.

## 📋 Resumen de Datos

| Datos | Destino | Frecuencia Sugerida | Método de Carga |
| :--- | :--- | :--- | :--- |
| **Partidos** | Base de Datos (Supabase) | Semanal | Script + SQL Manual |
| **Estadísticas** | Archivo JSON (`src/data/player_stats.json`) | Semanal | Script Automático |

---

## 🏒 1. Actualizar Partidos (Calendario y Resultados)

Los partidos se guardan en la base de datos para permitir búsquedas y filtros rápidos.

### Pasos:
1. **Ejecutar el scraper**: Descarga los últimos datos de la federación.
   ```powershell
   node scripts/scrape_matches_network.js
   ```
2. **Generar la migración**: Convierte los datos descargados a formato SQL.
   ```powershell
   node scripts/generate_migration.js
   ```
3. **Subir a Supabase**:
   * Abre el archivo `import_matches.sql` generado en la raíz del proyecto.
   * Copia todo su contenido.
   * Ve al **SQL Editor** de tu panel de Supabase.
   * Pega el código y pulsa **Run**.

---

## 📊 2. Actualizar Estadísticas de Jugadores (Puntos/Goles)

Las estadísticas se guardan en un archivo JSON para que la web las cargue instantáneamente sin consultar la base de datos.

### Pasos:
1. **Ejecutar el scraper**:
   ```powershell
   node scripts/scrape_player_stats.js
   ```
2. **Resultado**: El archivo `src/data/player_stats.json` se actualizará automáticamente. Solo tienes que subir (push) el cambio a tu repositorio de GitHub para que se vea en la web en producción.

---

## 🛠️ Requisitos técnicos

* **Node.js**: Instalado en tu ordenador.
* **Librerías**: Asegúrate de haber ejecutado `npm install` para tener Puppeteer y otras dependencias listas.
* **Conexión**: Los scripts necesitan internet para acceder a las webs de la federación.

> [!TIP]
> Si ves que un equipo nuevo no aparece o una categoría ha cambiado de nombre, revisa el archivo `scripts/generate_migration.js` donde se definen los mapeos de categorías.
