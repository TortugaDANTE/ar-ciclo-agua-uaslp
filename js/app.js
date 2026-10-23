// Lógica compartida: carga contenido.json y muestra paneles.
const $=s=>document.querySelector(s);
async function cargarContenido(){return (await fetch('data/contenido.json')).json();}
function panelEstacion(e,total,onSig,onCasa){
  const p=$('#panel');p.classList.remove('oculto');
  p.innerHTML=`<header><b>${e.id}. ${e.nombre}</b><img src="assets/logos/logo_aa.svg" alt="Agenda Ambiental UASLP"></header>
  <div class="cuerpo"><span class="fase">${e.fase}</span> <span class="aviso">${e.ubicacion||''}</span>
  <p>${e.funcion}</p><h4>Partes</h4><ul>${e.partes.map(x=>`<li><b>${x.nombre}:</b> ${x.texto}</li>`).join('')}</ul>
  <h4>Datos clave</h4><ul>${e.datos.map(d=>`<li>${d}</li>`).join('')}</ul>
  ${e.modelo_disponible?'':'<p class="aviso">⚠ Modelo 3D provisional (primitivas). GLB pendiente.</p>'}
  <button id="bCasa">Volver a la casa</button>${e.id<total?'<button id="bSig">Siguiente estación →</button>':'<button id="bInfo">Créditos y contacto</button>'}</div>`;
  $('#bCasa').onclick=onCasa; if($('#bSig'))$('#bSig').onclick=onSig; if($('#bInfo'))$('#bInfo').onclick=panelInfo;
}
function panelInfo(){const p=$('#panel');p.classList.remove('oculto');
  p.innerHTML=`<header><b>Créditos y contacto</b><img src="assets/logos/logo_aa.svg" alt=""></header><div class="cuerpo">
  <p><b>Agenda Ambiental UASLP</b> — Universidad Autónoma de San Luis Potosí.</p><p>Contacto: extensiones <b>7200</b> y <b>7210</b>.</p>
  <p>Código MIT. Créditos de modelos y fuentes: ver CREDITS.md en el repositorio.</p><button onclick="document.querySelector('#panel').classList.add('oculto')">Cerrar</button></div>`;}
