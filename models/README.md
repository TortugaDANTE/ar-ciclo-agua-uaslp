# Modelos 3D
Todos PENDIENTES; la app usa primitivas A-Frame marcadas "PROVISIONAL".
Archivos esperados: `casa.glb`, `01.glb` … `08.glb` (número = estación en orden del ciclo, ver data/contenido.json). Al añadir uno, poner `"modelo_disponible": true`.

## Brief común
Low-poly limpio, colores planos de la paleta (#003B71, #0E2240, #0B3B6E, #E66A2C); GLB < 5 MB (meta < 2 MB, Draco con gltf-transform); escala real en metros, Y arriba, origen en la base; un mesh por parte llamado `part_<nombre>` (ver campo `mesh` en contenido.json) y un empty `label_<nombre>` como ancla de etiqueta.

| Est. | Ecotecnia | Fuente gratuita sugerida |
|---|---|---|
| casa | Casa en corte | Blender (modelar) |
| 1 | Captación de lluvia | Sketchfab CC-BY: Rain Water Barrel, Rain Gutter; separador en Blender |
| 2 | Filtro arena y grava | Blender (capas en corte) |
| 3 | SODIS | Sketchfab CC-BY: Plastic Bottle |
| 4 | Ahorradores | Sketchfab CC-BY: Shower Head, Sink with Faucet, Toilet |
| 5 | Lavadero ecológico | Sketchfab CC-BY Wash Basin Stand / TRELLIS.2 (MIT) |
| 6 | Biofiltro/humedal | Blender + plantas CC0 (Poly Haven) |
| 7 | Sanitario seco | Blender (el de Sketchfab es NC) |
| 8 | Goteo / olla | Sketchfab CC-BY Clay Pot + Blender |
Lista completa con URLs y licencias: ver `recursos_gratis.md` del paquete de supervisión. Registrar cada modelo usado en CREDITS.md.
