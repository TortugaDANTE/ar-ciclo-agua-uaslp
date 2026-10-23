// Construye la casa provisional y los 8 hotspots sobre el target MindAR.
const COLORES={'CAPTO':'#0B3B6E','POTABILIZO':'#003B71','USO Y AHORRO':'#E66A2C','TRATO Y REÚSO':'#2F855A','DEVUELVO AL SUELO':'#8B5A2B'};
AFRAME.registerComponent('hotspot',{schema:{id:{type:'int'}},init(){this.el.addEventListener('click',()=>window.abrirEstacion(this.data.id));}});
async function construir(){
  const C=await cargarContenido(); window.C=C; const raiz=document.querySelector('#raiz');
  // PROVISIONAL: casa en corte con primitivas (reemplazar por models/casa.glb)
  raiz.insertAdjacentHTML('beforeend',`<a-entity id="casa" class="placeholder">
   <a-box position="0 0.5 -0.05" width="1.2" height="0.9" depth="0.05" color="#F7FAFC" opacity="0.9"></a-box>
   <a-cone position="0 1.05 -0.05" radius-bottom="0.75" height="0.3" segments-radial="4" color="#A0AEC0"></a-cone>
   <a-box position="0 0.02 0" width="1.6" height="0.04" depth="0.3" color="#8B5A2B"></a-box>
   <a-text value="PROVISIONAL" position="-0.3 0.9 0" color="#E53E3E" width="1.2"></a-text></a-entity>`);
  C.estaciones.forEach(e=>{const [x,y,z]=e.posicion;
    raiz.insertAdjacentHTML('beforeend',`<a-entity position="${x} ${y} ${z+0.05}">
     <a-sphere class="clicable" hotspot="id:${e.id}" radius="0.06" color="${COLORES[e.fase]}"></a-sphere>
     <a-text value="${e.id}" align="center" position="0 0 0.065" color="#fff" width="1.5"></a-text></a-entity>`);});
}
window.abrirEstacion=function(id){const e=C.estaciones[id-1];const m=document.querySelector('#modelo');
  m.innerHTML=''; document.querySelector('#casa').setAttribute('visible',false);
  // PROVISIONAL: cilindro + etiquetas de partes en lugar del GLB
  e.partes.forEach((p,i)=>m.insertAdjacentHTML('beforeend',`<a-box position="0 ${0.15+i*0.12} 0.1" width="0.25" height="0.1" depth="0.1" color="${COLORES[e.fase]}"></a-box>
    <a-text value="${p.nombre}" position="0.16 ${0.15+i*0.12} 0.1" color="#0E2240" width="1"></a-text>`));
  panelEstacion(e,C.estaciones.length,()=>abrirEstacion(id+1),()=>{m.innerHTML='';document.querySelector('#casa').setAttribute('visible',true);document.querySelector('#panel').classList.add('oculto');});
};
