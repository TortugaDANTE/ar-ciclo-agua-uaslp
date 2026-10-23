/* Experiencia 3D compartida (RA y visor): menú anular holográfico, modelo, infografía, vista explotada. */
(function(){
const COL={azul:'#003B71',azul2:'#0B3B6E',cian:'#5AE0F0',agua:'#5AA9E6',naranja:'#E66A2C',blanco:'#F7FAFC'};
const T=()=>AFRAME.THREE;
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
function anim(dur,fn,done){const t0=performance.now();(function f(){const k=Math.min(1,(performance.now()-t0)/dur);fn(ease(k));k<1?requestAnimationFrame(f):done&&done();})();}
function wrap(ctx,txt,max){const out=[];txt.split('\n').forEach(par=>{let l='';par.split(' ').forEach(w=>{const t=l?l+' '+w:w;if(ctx.measureText(t).width>max&&l){out.push(l);l=w}else l=t});out.push(l)});return out;}
function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
// Tarjeta "vidrio" con gradiente, borde luminoso y scanlines.
function vidrio(c,W,H,r){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(0,59,113,0.82)');g.addColorStop(1,'rgba(11,59,110,0.62)');
 rr(c,6,6,W-12,H-12,r);c.fillStyle=g;c.fill();c.save();c.clip();c.fillStyle='rgba(90,224,240,0.05)';for(let y=0;y<H;y+=6)c.fillRect(0,y,W,2);c.restore();
 c.lineWidth=4;c.strokeStyle='rgba(90,224,240,0.85)';c.shadowColor='#5AE0F0';c.shadowBlur=18;rr(c,6,6,W-12,H-12,r);c.stroke();c.shadowBlur=0;}
function plano(canvas,w){const th=T(),h=w*canvas.height/canvas.width;const tex=new th.CanvasTexture(canvas);tex.colorSpace=th.SRGBColorSpace;
 return new th.Mesh(new th.PlaneGeometry(w,h),new th.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,side:th.DoubleSide}));}
function lienzo(W,H){const c=document.createElement('canvas');c.width=W;c.height=H;return c;}
function ent(parent,obj,cls){const e=document.createElement('a-entity');if(cls)e.classList.add(cls);parent.appendChild(e);if(obj)e.setObject3D('mesh',obj);return e;}
const FONT='Montserrat, "Open Sans", Arial, sans-serif';
function cargarImg(src){return new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src;});}

AFRAME.registerComponent('mirar-camara',{tick(){const cam=this.el.sceneEl.camera;if(!cam)return;const p=new (T().Vector3)();cam.getWorldPosition(p);
 const o=this.el.object3D,par=o.parent;if(!par)return;const q=new (T().Quaternion)();par.getWorldQuaternion(q);o.lookAt(p);}});

AFRAME.registerComponent('experiencia',{
 schema:{escala:{default:1}},
 async init(){
  this.C=await (await fetch('data/contenido.json')).json();
  const raiz=this.el; this.raiz=raiz; this.t=0;
  // --- menú anular ---
  const menu=ent(raiz); menu.object3D.position.set(0,0,0.12); this.menu=menu;
  const th=T();
  const toro=new th.Mesh(new th.TorusGeometry(0.42,0.006,12,96),new th.MeshBasicMaterial({color:COL.cian,transparent:true,opacity:.75}));
  const halo=new th.Mesh(new th.TorusGeometry(0.42,0.03,12,96),new th.MeshBasicMaterial({color:COL.cian,transparent:true,opacity:.12,depthWrite:false}));
  const orb=new th.Mesh(new th.RingGeometry(0.30,0.305,96),new th.MeshBasicMaterial({color:COL.agua,transparent:true,opacity:.5,side:th.DoubleSide}));
  this.anillo=ent(menu); this.anillo.object3D.add(toro,halo,orb);
  const tit=lienzo(1024,200);{const c=tit.getContext('2d');vidrio(c,1024,200,90);c.fillStyle='#fff';c.font=`800 64px ${FONT}`;c.textAlign='center';c.fillText('El ciclo del agua',512,92);c.font=`600 42px ${FONT}`;c.fillStyle=COL.cian;c.fillText('en mi casa · toca una estación',512,155);}
  this.titulo=ent(menu,plano(tit,0.46)); this.titulo.setAttribute('mirar-camara','');
  this.nodos=[];const giro=ent(menu);this.giro=giro;
  for(const e of this.C.estaciones){const a=(e.id-1)/8*Math.PI*2+Math.PI/2;
   const cv=lienzo(256,330),c=cv.getContext('2d'),g=c.createRadialGradient(128,118,10,128,118,118);
   g.addColorStop(0,'rgba(90,169,230,0.75)');g.addColorStop(.7,'rgba(0,59,113,0.7)');g.addColorStop(1,'rgba(0,59,113,0.35)');
   c.beginPath();c.arc(128,118,108,0,7);c.fillStyle=g;c.fill();c.lineWidth=6;c.strokeStyle='rgba(90,224,240,.95)';c.shadowColor=COL.cian;c.shadowBlur=24;c.stroke();c.shadowBlur=0;
   c.beginPath();c.arc(100,80,40,Math.PI,1.5*Math.PI);c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=8;c.stroke();
   const im=await cargarImg(e.icono);if(im)c.drawImage(im,68,58,120,120);
   c.beginPath();c.arc(206,40,26,0,7);c.fillStyle=COL.naranja;c.fill();c.fillStyle='#fff';c.font=`800 30px ${FONT}`;c.textAlign='center';c.fillText(e.id,206,51);
   c.font=`700 40px ${FONT}`;c.fillStyle='#fff';c.shadowColor='#000';c.shadowBlur=8;c.fillText(e.corto,128,300);
   const piv=ent(giro);piv.object3D.position.set(Math.cos(a)*0.42,Math.sin(a)*0.42,0);
   const n=ent(piv,plano(cv,0.17),'clicable');n.setAttribute('mirar-camara','');n.dataset.id=e.id;
   n.addEventListener('click',()=>this.abrir(e.id));this.nodos.push({piv,n,fase:Math.random()*6});}
  // --- escena de estación ---
  this.est=ent(raiz);this.est.object3D.position.set(0,0,0.32);this.est.object3D.visible=false;
  this.giroM=ent(this.est);this.giroM.object3D.position.y=0.2;this.modelo=document.createElement('a-entity');this.modelo.classList.add('clicable');this.giroM.appendChild(this.modelo);
  this.etq=ent(this.est);this.lineas=new th.Group();this.est.object3D.add(this.lineas);
  this.card=ent(this.est);this.card.object3D.position.set(0,-0.3,0.02);this.card.setAttribute('mirar-camara','');
  this.botones=ent(this.est);this.botones.object3D.position.set(0,-0.6,0.04);this.botones.setAttribute('mirar-camara','');
  this.modelo.addEventListener('model-loaded',()=>this.preparar());
  this.modelo.addEventListener('click',ev=>{const o=ev.detail.intersection&&ev.detail.intersection.object;if(!o)return;let x=o;while(x&&!(x.name||'').startsWith('part_'))x=x.parent;if(x)this.parteInfo(x.name);});
  this.gestos(); this.listo=true; this.el.emit('experiencia-lista');
 },
 tick(t,dt){if(!this.listo)return;this.t+=dt/1000;
  if(this.giro)this.giro.object3D.rotation.z=this.t*0.12;
  this.nodos.forEach(o=>o.piv.object3D.position.z=Math.sin(this.t*1.4+o.fase)*0.015);
  if(this.anillo)this.anillo.object3D.children[1].material.opacity=.1+.06*Math.sin(this.t*2);
  if(this.est.object3D.visible){if(!this.arrastrando)this.giroM.object3D.rotation.y+=dt/1000*0.35;this.giroM.object3D.position.y=0.2+Math.sin(this.t*1.2)*0.01;this.actualizarLineas();}},
 abrir(id){const e=this.C.estaciones[id-1];this.e=e;this.explotado=false;this.parteSel=null;
  anim(450,k=>this.menu.object3D.scale.setScalar(Math.max(.001,1-k)),()=>this.menu.object3D.visible=false);
  this.giroM.object3D.rotation.set(0,0,0);this.giroM.object3D.scale.setScalar(1);
  this.modelo.removeAttribute('gltf-model');this.modelo.setAttribute('gltf-model',e.modelo);
  this.est.object3D.visible=true;this.est.object3D.scale.setScalar(.01);anim(600,k=>this.est.object3D.scale.setScalar(Math.max(.01,k)));
  this.dibujarCard();this.dibujarBotones();},
 preparar(){const th=T(),o=this.modelo.getObject3D('mesh');if(!o)return;const sc0=this.est.object3D.scale.x,r0=this.giroM.object3D.rotation.y;this.est.object3D.scale.setScalar(1);this.giroM.object3D.rotation.y=0;this.el.object3D.updateMatrixWorld(true);const ws=this.el.object3D.getWorldScale(new th.Vector3()).x;
  o.traverse(m=>{if(m.isMesh){m.material=new th.MeshStandardMaterial({vertexColors:true,roughness:.85,metalness:0});}});
  const box=new th.Box3().setFromObject(o),s=box.getSize(new th.Vector3()),c=box.getCenter(new th.Vector3());
  const k=0.36*ws/Math.max(s.x,s.y,s.z);o.scale.setScalar(k);o.position.set(-c.x*k,-c.y*k,-c.z*k);
  this.partes=[];const cen=new th.Vector3();
  this.e.partes.forEach(p=>{const n=o.getObjectByName(p.mesh);if(!n)return;const b=new th.Box3().setFromObject(n);const pc=b.getCenter(new th.Vector3());
   const dir=pc.clone().sub(new th.Box3().setFromObject(o).getCenter(cen));if(dir.length()<1e-4)dir.set(0,1,0);
   this.partes.push({p,n,base:n.position.clone(),dirL:dir.normalize().divideScalar(k)});});
  this.est.object3D.scale.setScalar(sc0);this.giroM.object3D.rotation.y=r0;this.crearEtiquetas();},
 crearEtiquetas(){while(this.etq.object3D.children.length)this.etq.object3D.remove(this.etq.object3D.children[0]);this.etqs=[];
  const n=this.partes.length;this.partes.forEach((q,i)=>{const cv=lienzo(512,96),c=cv.getContext('2d');rr(c,4,4,504,88,44);c.fillStyle='rgba(0,59,113,.8)';c.fill();
   c.lineWidth=3;c.strokeStyle='rgba(90,224,240,.9)';c.stroke();c.beginPath();c.arc(48,48,14,0,7);c.fillStyle=COL.naranja;c.fill();
   c.fillStyle='#fff';c.font=`700 38px ${FONT}`;c.fillText(q.p.nombre.slice(0,22),76,61);
   const m=plano(cv,0.16);const y=0.36-i*(0.3/Math.max(1,n-1));m.position.set(-0.3,y,0.08);this.etq.object3D.add(m);this.etqs.push(m);});
  this.etq.object3D.visible=false;},
 actualizarLineas(){const th=T();while(this.lineas.children.length){const l=this.lineas.children.pop();l.geometry.dispose();}
  if(!this.etq.object3D.visible||!this.etqs)return;const inv=new th.Matrix4().copy(this.est.object3D.matrixWorld).invert();
  this.partes.forEach((q,i)=>{const a=new th.Vector3();new th.Box3().setFromObject(q.n).getCenter(a);a.applyMatrix4(inv);
   const b=this.etqs[i].position.clone().add(new th.Vector3(0.1,0,0));const mid=new th.Vector3((a.x+b.x)/2,b.y,(a.z+b.z)/2+0.05);
   const pts=new th.QuadraticBezierCurve3(b,mid,a).getPoints(24);
   const sel=this.parteSel===q.p.mesh;this.lineas.add(new th.Line(new th.BufferGeometry().setFromPoints(pts),new th.LineBasicMaterial({color:sel?COL.naranja:COL.cian,transparent:true,opacity:.9})));});},
 explotar(on){this.explotado=on;this.etq.object3D.visible=true;const desde=this.partes.map(q=>q.n.position.clone());
  anim(700,k=>this.partes.forEach((q,i)=>{const dest=on?q.base.clone().add(q.dirL.clone().multiplyScalar(0.12)):q.base;q.n.position.lerpVectors(desde[i],dest,k);}),()=>{if(!on)this.etq.object3D.visible=false;});
  this.dibujarBotones();},
 parteInfo(mesh){const q=(this.partes||[]).find(x=>x.p.mesh===mesh);if(!q)return;this.parteSel=mesh;this.etq.object3D.visible=true;this.dibujarCard(q.p);},
 dibujarCard(parte){const e=this.e,W=900,H=1100,cv=lienzo(W,H),c=cv.getContext('2d');vidrio(c,W,H,70);
  c.fillStyle=COL.naranja;rr(c,50,46,260,52,26);c.fill();c.fillStyle='#fff';c.font=`700 28px ${FONT}`;c.fillText(e.fase,72,82);
  c.font=`800 54px ${FONT}`;let y=170;wrap(c,`${e.id}. ${e.nombre}`,850).forEach(l=>{c.fillText(l,50,y);y+=62;});
  c.fillStyle=COL.cian;c.font=`700 34px ${FONT}`;y+=10;c.fillText(parte?'Componente':'¿Qué hace?',50,y);y+=46;
  c.fillStyle='#fff';c.font=`400 32px ${FONT}`;wrap(c,parte?`${parte.nombre}: ${parte.texto}`:e.funcion,850).forEach(l=>{c.fillText(l,50,y);y+=42;});
  y+=20;c.fillStyle=COL.cian;c.font=`700 34px ${FONT}`;c.fillText('Datos clave',50,y);y+=46;c.font=`400 27px ${FONT}`;
  for(const d of e.datos.slice(0,4)){const ls=wrap(c,'• '+d,850);if(y+ls.length*34>H-50)break;c.fillStyle='#E2E8F0';ls.forEach(l=>{c.fillText(l,50,y);y+=34;});y+=10;}
  const old=this.card.getObject3D('mesh');if(old)this.card.removeObject3D('mesh');this.card.setObject3D('mesh',plano(cv,0.5));},
 dibujarBotones(){[...this.botones.children].forEach(x=>x.remove());const total=this.C.estaciones.length;
  const defs=[[this.explotado?'Unir':'Ver componentes',()=>this.explotar(!this.explotado)],['Siguiente',()=>this.abrir(this.e.id%total+1)],['Volver al menú',()=>this.cerrar()]];
  defs.forEach(([t,fn],i)=>{const cv=lienzo(420,110),c=cv.getContext('2d');rr(c,5,5,410,100,50);const g=c.createLinearGradient(0,0,420,0);
   g.addColorStop(0,i==0?'rgba(230,106,44,.95)':'rgba(0,59,113,.9)');g.addColorStop(1,i==0?'rgba(230,140,80,.9)':'rgba(11,90,160,.85)');c.fillStyle=g;c.fill();
   c.lineWidth=3;c.strokeStyle='rgba(90,224,240,.9)';c.stroke();c.fillStyle='#fff';c.font=`700 40px ${FONT}`;c.textAlign='center';c.fillText(t,210,70);
   const b=ent(this.botones,plano(cv,0.16),'clicable');b.object3D.position.x=(i-1)*0.175;b.addEventListener('click',fn);});},
 cerrar(){this.menu.object3D.visible=true;anim(450,k=>{this.est.object3D.scale.setScalar(Math.max(.01,1-k));this.menu.object3D.scale.setScalar(Math.max(.001,k));},()=>this.est.object3D.visible=false);},
 gestos(){const cv=this.el.sceneEl.canvas||document.body;let p0=null,d0=0,s0=1;
  const el=document.body;el.addEventListener('touchstart',ev=>{if(ev.touches.length==2){d0=Math.hypot(ev.touches[0].clientX-ev.touches[1].clientX,ev.touches[0].clientY-ev.touches[1].clientY);s0=this.giroM.object3D.scale.x;}else p0=ev.touches[0].clientX;},{passive:true});
  el.addEventListener('touchmove',ev=>{if(!this.est.object3D.visible)return;if(ev.touches.length==2&&d0){const d=Math.hypot(ev.touches[0].clientX-ev.touches[1].clientX,ev.touches[0].clientY-ev.touches[1].clientY);this.giroM.object3D.scale.setScalar(Math.min(2.5,Math.max(.5,s0*d/d0)));}
   else if(p0!=null){this.arrastrando=true;const x=ev.touches[0].clientX;this.giroM.object3D.rotation.y+=(x-p0)*0.01;p0=x;}},{passive:true});
  el.addEventListener('touchend',()=>{p0=null;d0=0;this.arrastrando=false;});
  let m0=null;el.addEventListener('mousedown',e=>m0=e.clientX);el.addEventListener('mousemove',e=>{if(m0!=null&&e.buttons&&this.est.object3D.visible){this.arrastrando=true;this.giroM.object3D.rotation.y+=(e.clientX-m0)*0.01;m0=e.clientX;}});
  el.addEventListener('mouseup',()=>{m0=null;this.arrastrando=false;});
  el.addEventListener('wheel',e=>{if(this.est.object3D.visible)this.giroM.object3D.scale.setScalar(Math.min(2.5,Math.max(.5,this.giroM.object3D.scale.x*(e.deltaY<0?1.1:.9))));});}
});
})();
