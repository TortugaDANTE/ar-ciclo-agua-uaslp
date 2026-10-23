# El ciclo del agua en mi casa — RA · Agenda Ambiental UASLP
App web gratuita de realidad aumentada: apunta al cartel tabloide y aparece una casa en corte con 8 estaciones del ciclo doméstico del agua (Capto → Potabilizo → Uso y ahorro → Trato y reúso → Devuelvo al suelo).

- App RA: https://tortugadante.github.io/ar-ciclo-agua-uaslp/
- Visor sin cámara: https://tortugadante.github.io/ar-ciclo-agua-uaslp/visor.html

**Estado: andamiaje.** Pendiente `targets/cartel.mind` y los GLB (ahora primitivas PROVISIONALES).

Tecnología: A-Frame 1.5 + MindAR 1.2.5 (CDN), model-viewer 4 como respaldo, GitHub Pages (HTTPS, requerido para cámara). Textos editables en `data/contenido.json`.

Estructura: `index.html`, `visor.html`, `css/`, `js/`, `data/`, `targets/`, `models/`, `assets/logos/`, `CREDITS.md`, `LICENSE`.

Prueba local: `python3 -m http.server` y abrir http://localhost:8000 (la cámara funciona en localhost).

Nota: los logos están como SVG que envuelve el PNG/JPG original sin modificar (limitación de subida); pueden sustituirse por los archivos binarios originales.

Contacto: Agenda Ambiental UASLP, ext. **7200** y **7210**.
