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
// Controles de zoom en pantalla: misma escala/límites que el pellizco (experiencia.zoom limita 0.5–2.5)
function montarZoom(visible){const L='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5" fill="none" stroke="#fff" stroke-width="2.4"/><path d="M15 15l6 6" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>';
 const EXz=()=>{const e=document.querySelector('[experiencia]');return e&&e.components.experiencia;},P=1.15;
 const mk=(id,txt,obj)=>{const d=document.createElement('div');d.id=id;d.className='zg';d.innerHTML=L+`<span>${txt}</span><button aria-label="Acercar ${txt}">+</button><button aria-label="Alejar ${txt}">−</button>`;
  const z=f=>{const ex=EXz();if(!ex||!ex.est)return;const t=ex[obj].object3D;ex.zoom(t,((ex.zoomT&&ex.zoomT.get(t))||t.scale.x)*f);};
  const b=d.querySelectorAll('button');b[0].onclick=()=>z(P);b[1].onclick=()=>z(1/P);document.body.appendChild(d);return d;};
 const a=mk('zgI','Infografía','card'),m=mk('zgM','Modelo','giroM');
 setInterval(()=>{const on=!!visible();a.classList.toggle('on',on);m.classList.toggle('on',on);},300);}
