import { useState } from "react";

// ── COLORES ──
const C = {
  gd:"#145C2D", g:"#1A7A3C", gm:"#2EA050", gl:"#E8F5EE",
  blue:"#2E6DA4", bl:"#EBF4FF", og:"#D97706", ogl:"#FFFBEB",
  red:"#E53E3E", gray:"#F4F6F9", gray2:"#E2E8F0",
  text:"#1A2332", soft:"#64748B", w:"#FFFFFF"
};

// ── ESTILOS BASE ──
const S = {
  shell:{width:390,minHeight:844,background:C.w,borderRadius:44,boxShadow:"0 20px 60px rgba(0,0,0,0.18),0 0 0 8px #14222A18",overflow:"hidden",display:"flex",flexDirection:"column"},
  statusBar:{background:C.gd,padding:"14px 24px 10px",display:"flex",justifyContent:"space-between",alignItems:"center",color:"white",fontSize:13,fontWeight:700},
  screen:{flex:1,overflowY:"auto",display:"flex",flexDirection:"column"},
  hdrGreen:{background:`linear-gradient(135deg,${C.gd},${C.g})`,padding:"20px 20px 24px",color:"white"},
  back:{cursor:"pointer",background:"rgba(255,255,255,0.15)",borderRadius:8,padding:"4px 12px",display:"inline-block",marginBottom:12,fontSize:18},
  inp:{width:"100%",padding:"13px 14px",border:`2px solid ${C.gray2}`,borderRadius:12,background:C.gray,fontSize:14,fontFamily:"DM Sans",color:C.text,outline:"none"},
  btn:{width:"100%",padding:16,background:C.g,color:C.w,border:"none",borderRadius:14,fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"Nunito",marginTop:8},
  chip:{background:C.gl,color:C.gd,padding:"5px 12px",borderRadius:20,fontSize:12,fontWeight:600},
};

const OFICIOS = ["Albañil","Plomero","Electricista","Gasista","Pintor","Carpintero","Herrero","Cerrajero","Techista","Jardinero"];

const SOLICITUDES = [
  {id:1,tipo:"urgente",tag:"🚨 URGENTE",titulo:"BUSCO PLOMERO YA",desc:"Pérdida de agua en cocina. Caño roto bajo la mesada.",zona:"F. Varela centro",tiempo:"hace 5 min",precio:"A convenir",clienteNombre:"Ana García"},
  {id:2,tipo:"consorcio",tag:"🏢 CONSORCIO",titulo:"Electricista para edificio",desc:"Revisión de tablero general. Edificio de 8 pisos.",zona:"Quilmes Oeste",tiempo:"hace 20 min",precio:"$180.000",clienteNombre:"Consorcio Quilmes"},
  {id:3,tipo:"normal",tag:"🔨 TRABAJO",titulo:"Humedad en pared",desc:"Humedad en dormitorio, necesito presupuesto.",zona:"Berazategui",tiempo:"hace 1 h",precio:"A presupuestar",clienteNombre:"Roberto Sánchez"},
];

const WORKERS = [
  {id:1,emoji:"🔧",name:"Carlos Méndez",trade:"Plomero",rating:4.9,jobs:38,zone:"F. Varela",resp:"~12 min",skills:["Cañerías","Filtraciones","Termotanques"],reviews:[{name:"Ana G.",text:"Excelente, resolvió en una hora.",stars:5},{name:"Roberto M.",text:"Muy profesional.",stars:5}]},
  {id:2,emoji:"⚡",name:"Sergio Díaz",trade:"Electricista",rating:4.8,jobs:52,zone:"Quilmes",resp:"~8 min",skills:["Tableros","LED","Cortocircuitos"],reviews:[{name:"Laura P.",text:"Solucionó el problema de meses.",stars:5}]},
  {id:3,emoji:"🧱",name:"Diego Romero",trade:"Albañil",rating:4.7,jobs:21,zone:"F. Varela",resp:"~25 min",skills:["Reformas","Humedad","Revoque"],reviews:[{name:"Claudia R.",text:"Muy ordenado con el trabajo.",stars:5}]},
  {id:4,emoji:"🎨",name:"Pablo Torres",trade:"Pintor",rating:4.6,jobs:14,zone:"Berazategui",resp:"~18 min",skills:["Interior","Exterior"],reviews:[{name:"Mónica L.",text:"Prolijo, cumplió los tiempos.",stars:4}]},
];

const CHATS_T = [
  {id:1,name:"Ana García",preview:"Mañana a las 10 me viene bien",time:"09:32",unread:2,emoji:"👩",msgs:[{from:"recv",text:"¿Podés venir hoy para la pérdida?"},{from:"sent",text:"Sí, ¿a las 17hs?"},{from:"recv",text:"Mañana a las 10 me viene bien"}]},
  {id:2,name:"Consorcio Quilmes",preview:"¿Tenés matrícula habilitante?",time:"ayer",unread:1,emoji:"🏢",msgs:[{from:"recv",text:"Buen día, somos el consorcio de Quilmes"},{from:"recv",text:"¿Tenés matrícula habilitante?"}]},
];
const CHATS_C = [
  {id:1,name:"Carlos Méndez 🔧",preview:"Puedo ir hoy a las 17hs",time:"09:41",unread:1,emoji:"🔧",msgs:[{from:"recv",text:"Vi tu solicitud de plomería"},{from:"recv",text:"Puedo ir hoy a las 17hs"},{from:"sent",text:"Perfecto, te espero"}]},
  {id:2,name:"Sergio Díaz ⚡",preview:"El presupuesto es $85.000",time:"ayer",unread:0,emoji:"⚡",msgs:[{from:"recv",text:"El presupuesto es $85.000 con mano de obra"}]},
];

// ── STATUS BAR ──
function StatusBar(){
  return <div style={S.statusBar}><span>9:41</span><span style={{fontFamily:"Nunito",fontWeight:900,fontSize:15}}>ChangaYa!</span><span>●●● 🔋</span></div>;
}

// ── WELCOME ──
function Welcome({onRol, onLogin}){
  return(
    <div style={{flex:1,background:`linear-gradient(170deg,${C.gd},${C.g} 55%,${C.gm})`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:"48px 32px 40px"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontFamily:"Nunito",fontSize:56,fontWeight:900,color:"white",letterSpacing:-1}}>ChangaYa!</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.75)",marginTop:4}}>Servicios de oficio · Conurbano Bonaerense</div>
      </div>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:26,fontWeight:800,color:"white",fontFamily:"Nunito",marginBottom:10}}>El trabajo bien hecho, cerca tuyo</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,0.8)",lineHeight:1.5}}>Conectamos trabajadores de oficio verificados con vecinos del conurbano.</div>
      </div>
      <div style={{width:"100%"}}>
        <div style={{textAlign:"center",color:"rgba(255,255,255,0.7)",fontSize:13,fontWeight:600,marginBottom:16,textTransform:"uppercase",letterSpacing:1}}>¿Cómo querés entrar?</div>
        <button style={{...S.btn,background:"white",color:C.gd,display:"flex",alignItems:"center",gap:12,justifyContent:"center",marginBottom:12}} onClick={()=>onRol("trabajador")}>🔧 Soy trabajador de oficio</button>
        <button style={{...S.btn,background:"rgba(255,255,255,0.15)",border:"2px solid rgba(255,255,255,0.4)",marginBottom:12}} onClick={()=>onRol("cliente")}>🏠 Busco un profesional</button>
        <button style={{...S.btn,background:"rgba(255,255,255,0.08)",border:"2px solid rgba(255,255,255,0.25)",marginBottom:12}} onClick={()=>onRol("consorcio")}>🏢 Soy administrador de consorcio</button>
        <div style={{textAlign:"center",color:"rgba(255,255,255,0.6)",fontSize:13,cursor:"pointer"}} onClick={onLogin}>Ya tengo cuenta · <span style={{color:"white",fontWeight:700}}>Iniciar sesión</span></div>
      </div>
    </div>
  );
}

// ── LOGIN ──
function Login({onBack, onLogin}){
  return(
    <div style={S.screen}>
      <div style={S.hdrGreen}><div style={S.back} onClick={onBack}>← Volver</div><div style={{fontFamily:"Nunito",fontSize:24,fontWeight:800}}>Bienvenido de nuevo</div><div style={{fontSize:13,opacity:.75,marginTop:2}}>Ingresá con tu teléfono</div></div>
      <div style={{padding:20}}>
        <div style={{marginBottom:16}}><div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>Teléfono</div><input style={S.inp} placeholder="Ej: 11 2345-6789" type="tel"/></div>
        <div style={{marginBottom:16}}><div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>Contraseña</div><input style={S.inp} placeholder="••••••••" type="password"/></div>
        <button style={S.btn} onClick={onLogin}>Iniciar sesión</button>
        <div style={{textAlign:"center",marginTop:12,fontSize:13,color:C.soft}}>¿Olvidaste tu contraseña? <span style={{color:C.g,fontWeight:700,cursor:"pointer"}}>Recuperar</span></div>
        <div style={{textAlign:"center",marginTop:20,fontSize:13,color:C.soft}}>¿No tenés cuenta? <span style={{color:C.g,fontWeight:700,cursor:"pointer"}} onClick={onBack}>Registrarte</span></div>
      </div>
    </div>
  );
}

// ── REGISTRO ──
function Registro({rol, onBack, onDone}){
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({nombre:"",apellido:"",dni:"",tel:"",oficio:""});
  const [fotos, setFotos] = useState([]);
  const total = rol==="trabajador" ? 5 : 4; // consorcio=4, cliente=4
  const upd = (k,v) => setForm(f=>({...f,[k]:v}));
  const canNext = () => {
    if(rol==="consorcio"){
      if(step===1) return form.razonSocial&&form.cuit&&form.direccion;
      if(step===2) return form.nombre&&form.tel&&form.municipio;
      return true;
    }
    if(step===1) return form.nombre&&form.apellido&&form.dni;
    if(step===2) return form.tel&&form.municipio&&(rol==="cliente"||form.oficio);
    return true;
  };
  const next = () => { if(step<total) setStep(s=>s+1); else onDone(form); };
  const isFace = (rol==="trabajador"&&step===5)||((rol==="cliente"||rol==="consorcio")&&step===4);

  if(isFace) return <FaceValidation onBack={()=>setStep(s=>s-1)} onDone={()=>onDone(form)}/>;

  return(
    <div style={S.screen}>
      <div style={S.hdrGreen}>
        <div style={S.back} onClick={()=>step>1?setStep(s=>s-1):onBack()}>← Volver</div>
        <div style={{fontFamily:"Nunito",fontSize:22,fontWeight:800}}>{rol==="trabajador"?"Registro Trabajador":"Registro Cliente"}</div>
        <div style={{fontSize:13,opacity:.75,marginTop:2}}>Paso {step} de {total}</div>
      </div>
      <div style={{padding:20}}>
        {/* STEP DOTS */}
        <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:20}}>
          {Array.from({length:total}).map((_,i)=><div key={i} style={{height:6,borderRadius:3,background:i+1===step?C.g:i+1<step?C.gm:C.gray2,width:i+1===step?24:6,transition:"all 0.3s"}}/>)}
        </div>

        {/* CONSORCIO STEPS */}
        {rol==="consorcio"&&step===1&&<>
          <div style={{fontSize:15,fontWeight:700,marginBottom:16,fontFamily:"Nunito"}}>Datos del consorcio</div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>Razón social</div>
            <input style={S.inp} placeholder="Ej: Consorcio Av. San Martín 1240" value={form.razonSocial||""} onChange={e=>upd("razonSocial",e.target.value)}/>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>CUIT</div>
            <input style={S.inp} placeholder="Ej: 30-12345678-9" value={form.cuit||""} onChange={e=>upd("cuit",e.target.value)}/>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>Dirección del edificio</div>
            <input style={S.inp} placeholder="Ej: Av. San Martín 1240, piso 1" value={form.direccion||""} onChange={e=>upd("direccion",e.target.value)}/>
          </div>
        </>}

        {rol==="consorcio"&&step===2&&<>
          <div style={{fontSize:15,fontWeight:700,marginBottom:16,fontFamily:"Nunito"}}>Datos del administrador</div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>Nombre del administrador</div>
            <input style={S.inp} placeholder="Ej: Roberto García" value={form.nombre||""} onChange={e=>upd("nombre",e.target.value)}/>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>Teléfono</div>
            <input style={S.inp} placeholder="Ej: 11 2345-6789" type="tel" value={form.tel||""} onChange={e=>upd("tel",e.target.value)}/>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>📍 Municipio</div>
            <select style={{...S.inp,appearance:"none",cursor:"pointer"}} value={form.municipio||""} onChange={e=>upd("municipio",e.target.value)}>
              <option value="">Seleccioná tu municipio...</option>
              {["Almirante Brown","Avellaneda","Berazategui","Ensenada","Esteban Echeverría","Ezeiza","Florencio Varela","General San Martín","Hurlingham","Ituzaingó","José C. Paz","La Matanza","Lanús","La Plata","Lomas de Zamora","Malvinas Argentinas","Merlo","Moreno","Morón","Pilar","Quilmes","San Fernando","San Isidro","San Miguel","Tigre","Tres de Febrero","Vicente López"].map(m=><option key={m}>{m}</option>)}
            </select>
          </div>
          <div style={{padding:12,background:"#FEF3E7",borderRadius:10,fontSize:12,color:C.og,fontWeight:600,lineHeight:1.5}}>
            💳 El plan para consorcios tendrá un costo mensual. Próximamente habilitamos el pago en línea.
          </div>
        </>}

        {rol!=="consorcio"&&step===1&&<>
          <div style={{fontSize:15,fontWeight:700,marginBottom:16,fontFamily:"Nunito"}}>Tus datos personales</div>
          {[["nombre","Nombre","Ej: Carlos"],["apellido","Apellido","Ej: Méndez"],["dni","DNI","Ej: 28.456.789"]].map(([k,l,p])=>(
            <div key={k} style={{marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>{l}</div>
              <input style={S.inp} placeholder={p} value={form[k]} onChange={e=>upd(k,e.target.value)}/>
            </div>
          ))}
        </>}

        {rol!=="consorcio"&&step===2&&<>
          <div style={{fontSize:15,fontWeight:700,marginBottom:16,fontFamily:"Nunito"}}>Tu contacto y ubicación</div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>Teléfono</div>
            <input style={S.inp} placeholder="Ej: 11 2345-6789" type="tel" value={form.tel} onChange={e=>upd("tel",e.target.value)}/>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>📍 Municipio</div>
            <select style={{...S.inp,appearance:"none",cursor:"pointer"}} value={form.municipio||""} onChange={e=>upd("municipio",e.target.value)}>
              <option value="">Seleccioná tu municipio...</option>
              {["Almirante Brown","Avellaneda","Berazategui","Ensenada","Esteban Echeverría","Ezeiza","Florencio Varela","General San Martín","Hurlingham","Ituzaingó","José C. Paz","La Matanza","Lanús","La Plata","Lomas de Zamora","Malvinas Argentinas","Merlo","Moreno","Morón","Pilar","Quilmes","San Fernando","San Isidro","San Miguel","Tigre","Tres de Febrero","Vicente López"].map(m=><option key={m}>{m}</option>)}
            </select>
          </div>
          {rol==="trabajador"&&<div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>Oficio principal</div>
            <select style={{...S.inp,appearance:"none",cursor:"pointer"}} value={form.oficio} onChange={e=>upd("oficio",e.target.value)}>
              <option value="">Seleccioná tu oficio...</option>
              {OFICIOS.map(o=><option key={o}>{o}</option>)}
            </select>
          </div>}
        </>}

        {step===3&&<>
          <div style={{fontSize:15,fontWeight:700,marginBottom:4,fontFamily:"Nunito"}}>Tu foto de perfil</div>
          <div style={{fontSize:13,color:C.soft,marginBottom:20}}>Una buena foto genera más confianza. (Opcional)</div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
            <div style={{width:120,height:120,borderRadius:"50%",background:form.fotoPerfil?C.gl:C.gray,border:"3px "+( form.fotoPerfil?"solid":"dashed")+" "+(form.fotoPerfil?C.gm:C.gray2),display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative"}} onClick={()=>upd("fotoPerfil","set")}>
              {form.fotoPerfil
                ? <><span style={{fontSize:56}}>🧑</span><div style={{position:"absolute",bottom:4,right:4,background:C.g,color:"white",width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,border:"2px solid white"}}>✓</div></>
                : <><span style={{fontSize:36,color:C.soft}}>📷</span><span style={{fontSize:11,color:C.soft,marginTop:6,fontWeight:600}}>Agregar foto</span></>
              }
            </div>
            {form.fotoPerfil&&<div style={{fontSize:13,color:C.g,fontWeight:600}}>✓ Foto de perfil lista</div>}
            {form.fotoPerfil&&<button style={{padding:"8px 20px",borderRadius:20,border:"2px solid "+C.gray2,background:C.gray,color:C.soft,fontSize:13,fontWeight:600,cursor:"pointer"}} onClick={()=>upd("fotoPerfil","")}>Cambiar foto</button>}
          </div>
          <div style={{marginTop:20,padding:12,background:C.bl,borderRadius:10,fontSize:12,color:C.blue,fontWeight:500,lineHeight:1.5}}>💡 Los perfiles con foto reciben un 60% más de solicitudes.</div>
        </>}

        {step===4&&rol==="trabajador"&&<>
          <div style={{fontSize:15,fontWeight:700,marginBottom:4,fontFamily:"Nunito"}}>Fotos de tus trabajos</div>
          <div style={{fontSize:13,color:C.soft,marginBottom:16}}>Mostrá tu trabajo. Los clientes eligen más a quienes tienen fotos. (Opcional)</div>
          <div style={{border:`2px dashed ${C.gray2}`,borderRadius:12,padding:20,textAlign:"center",background:C.gray,cursor:"pointer"}} onClick={()=>{const e=["🚿","🔧","⚡","🧱","🎨","🪟"];if(fotos.length<5)setFotos(f=>[...f,e[f.length%e.length]]);}}>
            <div style={{fontSize:28,marginBottom:6}}>📷</div>
            <div style={{fontSize:13,color:C.soft,fontWeight:500}}>Tocá para agregar fotos</div>
            <div style={{fontSize:11,color:C.soft,marginTop:3}}>JPG, PNG · Máx 5 fotos</div>
          </div>
          {fotos.length>0&&<div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
            {fotos.map((f,i)=><div key={i} style={{width:72,height:72,borderRadius:10,background:C.gl,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,border:`2px solid ${C.gm}`,position:"relative"}}>
              {f}<div style={{position:"absolute",top:-6,right:-6,background:C.red,color:"white",borderRadius:"50%",width:18,height:18,fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",border:"2px solid white"}} onClick={()=>setFotos(f=>f.filter((_,idx)=>idx!==i))}>✕</div>
            </div>)}
          </div>}
          <div style={{marginTop:16,padding:12,background:C.gl,borderRadius:10,fontSize:12,color:C.gd,fontWeight:600}}>✓ El siguiente paso verificará tu identidad con DNI y reconocimiento facial</div>
        </>}

        <button style={{...S.btn,marginTop:24,opacity:canNext()?1:.5}} disabled={!canNext()} onClick={next}>
          {step<total?"Continuar →":"Verificar identidad →"}
        </button>
        <div style={{textAlign:"center",marginTop:12,fontSize:13,color:C.soft}}>¿Ya tenés cuenta? <span style={{color:C.g,fontWeight:700,cursor:"pointer"}}>Iniciá sesión</span></div>
      </div>
    </div>
  );
}

// ── VALIDACIÓN FACIAL ──
function FaceValidation({onBack, onDone}){
  const [step, setStep] = useState("intro"); // intro | dni-f | dni-b | selfie | selfie-scan | selfie-done | processing | ok
  const [dniF, setDniF] = useState(false);
  const [dniB, setDniB] = useState(false);
  const [progress, setProgress] = useState(0);
  const [checks, setChecks] = useState({dni:false,rostro:false,liveness:false});

  const runProcess = () => {
    setStep("processing");
    let p=0;
    const iv=setInterval(()=>{
      p+=10; setProgress(Math.min(p,100));
      if(p>=30) setChecks(c=>({...c,dni:true}));
      if(p>=60) setChecks(c=>({...c,rostro:true}));
      if(p>=90) setChecks(c=>({...c,liveness:true}));
      if(p>=100){clearInterval(iv);setTimeout(()=>setStep("ok"),500);}
    },200);
  };

  const captureSelfie = () => {
    setStep("selfie-scan");
    setTimeout(()=>setStep("selfie-done"),2000);
  };

  return(
    <div style={S.screen}>
      <div style={S.hdrGreen}>
        {step!=="ok"&&<div style={S.back} onClick={()=>{if(step==="intro")onBack();else setStep("intro");}}>← Volver</div>}
        <div style={{fontFamily:"Nunito",fontSize:22,fontWeight:800}}>Verificación de identidad</div>
        <div style={{fontSize:13,opacity:.75,marginTop:2}}>{step==="ok"?"¡Verificación exitosa!":step==="processing"?"Verificando...":"Confirmá que sos vos"}</div>
      </div>
      <div style={{padding:20,flex:1,display:"flex",flexDirection:"column"}}>

        {step==="intro"&&<>
          <div style={{background:C.ogl,border:`1.5px solid #FCD34D`,borderRadius:12,padding:14,marginBottom:20,fontSize:13,color:C.og,fontWeight:600,lineHeight:1.5}}>📋 Verificamos la identidad de todos los usuarios con DNI y reconocimiento facial.</div>
          {[{icon:"🪪",t:"Foto DNI (frente)",done:dniF},{icon:"🪪",t:"Foto DNI (dorso)",done:dniB},{icon:"🤳",t:"Selfie de verificación",done:step==="ok"}].map((item,i)=>(
            <div key={i} style={{display:"flex",gap:12,padding:14,background:item.done?C.gl:C.gray,borderRadius:12,border:`1.5px solid ${item.done?C.gm:C.gray2}`,marginBottom:10}}>
              <span style={{fontSize:24}}>{item.icon}</span>
              <div style={{fontSize:14,fontWeight:700,color:item.done?C.gd:C.text}}>{item.t} {item.done?"✓":""}</div>
            </div>
          ))}
          <div style={{background:C.bl,borderRadius:12,padding:12,fontSize:12,color:C.blue,fontWeight:500,marginBottom:20,lineHeight:1.5}}>🔒 Tus datos biométricos se encriptan y no se comparten con terceros.</div>
          {/* Nota para el programador */}
          <div style={{padding:10,background:"#FFF8E1",borderRadius:10,fontSize:11,color:"#7A5A00",fontWeight:600,borderLeft:"3px solid #F59E0B",marginBottom:16}}>
            📌 Dev: integrar <code>expo-camera</code> aquí para activar la cámara real del dispositivo.
          </div>
          <button style={S.btn} onClick={()=>setStep("dni-f")}>Comenzar verificación →</button>
        </>}

        {step==="dni-f"&&<>
          <div style={{background:C.ogl,border:`1.5px solid #FCD34D`,borderRadius:12,padding:14,marginBottom:20,fontSize:13,color:C.og,fontWeight:600}}>📷 Colocá el <strong>frente</strong> de tu DNI dentro del recuadro</div>
          <div style={{width:"100%",height:140,borderRadius:12,border:`3px solid ${C.g}`,background:C.gray,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",marginBottom:12}} onClick={()=>{setDniF(true);setStep("dni-b");}}>
            <span style={{fontSize:48}}>🪪</span><div style={{fontSize:13,color:C.soft,marginTop:8,fontWeight:500}}>Frente del DNI · Tocá para capturar</div>
          </div>
        </>}

        {step==="dni-b"&&<>
          <div style={{background:C.ogl,border:`1.5px solid #FCD34D`,borderRadius:12,padding:14,marginBottom:20,fontSize:13,color:C.og,fontWeight:600}}>📷 Ahora girá el DNI y sacá foto del <strong>dorso</strong></div>
          <div style={{width:"100%",height:140,borderRadius:12,border:`3px solid ${C.g}`,background:C.gl,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",marginBottom:12}} onClick={()=>{setDniB(true);setStep("selfie");}}>
            <span style={{fontSize:48}}>🪪</span><div style={{fontSize:13,color:C.gd,marginTop:8,fontWeight:600}}>Dorso del DNI · Tocá para capturar</div>
          </div>
          <div style={{padding:12,background:C.gl,borderRadius:10,fontSize:12,color:C.gd,fontWeight:600}}>✓ Frente capturado correctamente</div>
        </>}

        {(step==="selfie"||step==="selfie-scan"||step==="selfie-done")&&<>
          <div style={{background:C.ogl,border:`1.5px solid #FCD34D`,borderRadius:12,padding:14,marginBottom:20,fontSize:13,color:C.og,fontWeight:600}}>🤳 Mirá a la cámara, mantené el rostro dentro del óvalo</div>
          <div style={{width:240,height:300,borderRadius:"120px 120px 100px 100px",border:`3px ${step==="selfie"?"dashed":"solid"} ${step==="selfie-done"?C.g:C.g}`,background:step==="selfie-done"?C.gl:C.gray,margin:"0 auto 20px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",cursor:step==="selfie"?"pointer":"default"}} onClick={step==="selfie"?captureSelfie:undefined}>
            {step==="selfie-scan"&&<div style={{position:"absolute",left:0,right:0,height:3,background:`linear-gradient(90deg,transparent,${C.g},transparent)`,animation:"scanMove 1.5s linear infinite",top:0}}/>}
            <span style={{fontSize:80}}>{step==="selfie-done"?"😊":"🤳"}</span>
            <div style={{fontSize:13,color:step==="selfie-done"?C.gd:C.soft,marginTop:8,fontWeight:500,textAlign:"center",padding:"0 16px"}}>{step==="selfie"?"Tocá para capturar":step==="selfie-scan"?"Escaneando...":"¡Foto capturada!"}</div>
          </div>
          <style>{`@keyframes scanMove{0%{top:0}100%{top:100%}}`}</style>
          {step==="selfie-done"&&<button style={S.btn} onClick={runProcess}>Verificar identidad →</button>}
        </>}

        {step==="processing"&&<>
          <div style={{textAlign:"center",marginBottom:24}}><div style={{fontSize:48,marginBottom:12}}>🔍</div><div style={{fontSize:16,fontWeight:700,fontFamily:"Nunito"}}>Verificando tu identidad</div><div style={{fontSize:13,color:C.soft,marginTop:4}}>Esto tarda unos segundos...</div></div>
          <div style={{background:C.gray,borderRadius:20,height:8,marginBottom:24,overflow:"hidden"}}><div style={{height:"100%",background:`linear-gradient(90deg,${C.g},${C.gm})`,borderRadius:20,width:`${progress}%`,transition:"width 0.3s"}}/></div>
          <div style={{background:C.w,borderRadius:14,padding:"8px 16px",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
            {[{k:"dni",l:"Verificación del DNI",s:"Comparando con RENAPER"},{k:"rostro",l:"Reconocimiento facial",s:"Comparando selfie con DNI"},{k:"liveness",l:"Validación de vivacidad",s:"Confirmando que es una persona real"}].map(item=>(
              <div key={item.k} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:`1px solid ${C.gray2}`}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:checks[item.k]?C.gl:C.gray,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:checks[item.k]?C.g:C.soft}}>{checks[item.k]?"✓":"·"}</div>
                <div><div style={{fontSize:13,fontWeight:500}}>{item.l}</div><div style={{fontSize:11,color:C.soft}}>{item.s}</div></div>
              </div>
            ))}
          </div>
        </>}

        {step==="ok"&&<div style={{textAlign:"center",flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <div style={{fontSize:64,marginBottom:16}}>✅</div>
          <div style={{fontFamily:"Nunito",fontSize:26,fontWeight:800,color:C.gd,marginBottom:8}}>¡Identidad verificada!</div>
          <div style={{fontSize:14,color:C.soft,lineHeight:1.5,marginBottom:24}}>Tu cuenta está lista para usar.</div>
          <div style={{background:C.gl,border:`2px solid ${C.gm}`,borderRadius:12,padding:14,width:"100%",marginBottom:24}}>
            {["DNI verificado con RENAPER","Reconocimiento facial aprobado","Vivacidad confirmada"].map(t=><div key={t} style={{fontSize:13,color:C.gd,fontWeight:700,marginBottom:4}}>✓ {t}</div>)}
          </div>
          <button style={S.btn} onClick={onDone}>Entrar a ChangaYa! →</button>
        </div>}
      </div>
    </div>
  );
}

// ── HOME TRABAJADOR ──
function HomeTrabajador({form}){
  const [tab, setTab] = useState(0);
  const [selChat, setSelChat] = useState(null);
  const [msgs, setMsgs] = useState({});
  const [msgInput, setMsgInput] = useState("");
  const [chats, setChats] = useState(CHATS_T);

  const handleAceptar = (sol) => {
    // Crear nuevo chat con el cliente que publicó la solicitud
    const nuevoChat = {
      id: Date.now(),
      name: sol.clienteNombre || "Cliente",
      preview: "Hola, acepté tu solicitud. ¿Cuándo te viene bien?",
      time: "ahora",
      unread: 0,
      emoji: sol.tipo === "consorcio" ? "🏢" : "👤",
      msgs: [
        { from: "sent", text: `Hola! Vi tu solicitud "${sol.titulo}". Puedo ayudarte, ¿cuándo te viene bien?` }
      ]
    };
    setChats(prev => [nuevoChat, ...prev]);
    setSelChat(nuevoChat);
    setTab(1);
  };

  const getMsgs = (c) => msgs[c.id]||c.msgs;
  const sendMsg = (c) => {
    if(!msgInput.trim()) return;
    setMsgs(m=>({...m,[c.id]:[...getMsgs(c),{from:"sent",text:msgInput}]}));
    setMsgInput("");
  };

  if(selChat){
    const ms = getMsgs(selChat);
    return(<>
      <div style={{background:C.gd,padding:"16px 20px",color:"white",display:"flex",alignItems:"center",gap:12}}>
        <span style={{cursor:"pointer",background:"rgba(255,255,255,0.15)",borderRadius:8,padding:"4px 10px",fontSize:18}} onClick={()=>setSelChat(null)}>←</span>
        <span style={{fontSize:22}}>{selChat.emoji}</span>
        <div style={{flex:1}}><div style={{fontFamily:"Nunito",fontWeight:700,fontSize:15}}>{selChat.name}</div><div style={{fontSize:11,opacity:.7}}>En línea</div></div>
      </div>
      <div style={{flex:1,padding:16,overflowY:"auto",display:"flex",flexDirection:"column",gap:10}}>
        {ms.map((m,i)=><div key={i} style={{maxWidth:"75%",padding:"10px 14px",borderRadius:16,fontSize:14,lineHeight:1.4,background:m.from==="recv"?C.gray:C.g,color:m.from==="recv"?C.text:"white",alignSelf:m.from==="recv"?"flex-start":"flex-end"}}>{m.text}</div>)}
      </div>
      <div style={{padding:"12px 16px",borderTop:`1px solid ${C.gray2}`,display:"flex",gap:8,alignItems:"center"}}>
        <input style={{flex:1,padding:"12px 14px",border:`2px solid ${C.gray2}`,borderRadius:24,fontSize:14,fontFamily:"DM Sans",outline:"none",background:C.gray}} placeholder="Escribí un mensaje..." value={msgInput} onChange={e=>setMsgInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg(selChat)}/>
        <button style={{width:44,height:44,borderRadius:"50%",background:C.g,border:"none",fontSize:18,cursor:"pointer"}} onClick={()=>sendMsg(selChat)}>➤</button>
      </div>
    </>);
  }

  return(<>
    <div style={{flex:1,overflowY:"auto"}}>
      {tab===0&&<>
        <div style={S.hdrGreen}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontFamily:"Nunito",fontSize:22,fontWeight:800}}>Hola, {form.nombre||"Carlos"} 👋</div><div style={{fontSize:13,opacity:.75,marginTop:2}}>4 nuevas solicitudes cerca tuyo</div></div>
          <div style={{width:44,height:44,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🔧</div>
        </div></div>
        <div style={{padding:16}}>
          <div style={{fontFamily:"Nunito",fontSize:16,fontWeight:800,marginBottom:12}}>Solicitudes disponibles</div>
          {SOLICITUDES.map(s=><div key={s.id} style={{background:C.w,borderRadius:16,padding:16,boxShadow:"0 2px 12px rgba(0,0,0,0.07)",marginBottom:12,borderLeft:`4px solid ${s.tipo==="urgente"?C.red:s.tipo==="consorcio"?C.blue:C.g}`}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,marginBottom:8,background:s.tipo==="urgente"?"#FEF2F2":s.tipo==="consorcio"?C.bl:C.gl,color:s.tipo==="urgente"?C.red:s.tipo==="consorcio"?C.blue:C.gd}}>{s.tag}</div>
            <div style={{fontSize:15,fontWeight:700,fontFamily:"Nunito"}}>{s.titulo}</div>
            <div style={{fontSize:13,color:C.soft,marginTop:4,lineHeight:1.4}}>{s.desc}</div>
            <div style={{display:"flex",gap:10,marginTop:10,alignItems:"center"}}>
              <span style={{fontSize:11,color:C.soft,background:C.gray,padding:"3px 8px",borderRadius:20}}>📍 {s.zona}</span>
              <span style={{fontSize:11,color:C.soft}}>🕐 {s.tiempo}</span>
              <span style={{fontSize:12,fontWeight:700,color:C.g,marginLeft:"auto"}}>{s.precio}</span>
            </div>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button style={{flex:1,padding:10,borderRadius:10,border:"none",background:C.g,color:"white",fontSize:13,fontWeight:700,cursor:"pointer"}} onClick={()=>handleAceptar(s)}>✓ Aceptar</button>
              <button style={{flex:1,padding:10,borderRadius:10,border:"none",background:C.gray,color:C.soft,fontSize:13,fontWeight:700,cursor:"pointer"}}>Pasar</button>
            </div>
          </div>)}
        </div>
      </>}

      {tab===1&&<>
        <div style={S.hdrGreen}><div style={{fontFamily:"Nunito",fontSize:22,fontWeight:800}}>💬 Mensajes</div><div style={{fontSize:13,opacity:.75,marginTop:2}}>{chats.filter(c=>c.unread).length} sin leer</div></div>
        <div style={{padding:16}}>{chats.map(c=><div key={c.id} style={{display:"flex",gap:12,padding:"14px 0",borderBottom:`1px solid ${C.gray2}`,cursor:"pointer",alignItems:"flex-start"}} onClick={()=>setSelChat(c)}>
          <div style={{width:48,height:48,borderRadius:"50%",background:C.gl,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{c.emoji}</div>
          <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700}}>{c.name}</div><div style={{fontSize:13,color:C.soft,marginTop:2}}>{c.preview}</div></div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
            <div style={{fontSize:11,color:C.soft}}>{c.time}</div>
            {c.unread>0&&<div style={{background:C.g,color:"white",borderRadius:"50%",width:20,height:20,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{c.unread}</div>}
          </div>
        </div>)}</div>
      </>}

      {tab===2&&<>
        <div style={S.hdrGreen}><div style={{fontFamily:"Nunito",fontSize:22,fontWeight:800}}>📊 Mis estadísticas</div><div style={{fontSize:13,opacity:.75,marginTop:2}}>Mayo 2026</div></div>
        <div style={{padding:16}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
            {[["12","Trabajos este mes",C.g],["4.9","Calificación",C.blue],["$1.2M","Facturado",C.og],["8 min","Tiempo resp.",C.red]].map(([n,l,color])=>(
              <div key={l} style={{background:C.w,borderRadius:14,padding:16,boxShadow:"0 2px 10px rgba(0,0,0,0.07)",borderTop:`4px solid ${color}`}}>
                <div style={{fontSize:26,fontWeight:800,fontFamily:"Nunito"}}>{n}</div>
                <div style={{fontSize:12,color:C.soft,marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{fontFamily:"Nunito",fontSize:16,fontWeight:800,marginBottom:12}}>Reseñas recientes</div>
          {WORKERS[0].reviews.map((r,i)=><div key={i} style={{background:C.gray,borderRadius:12,padding:14,marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><div style={{fontSize:13,fontWeight:700}}>{r.name}</div></div>
            <div style={{color:"#F59E0B",fontSize:13}}>{"★".repeat(r.stars)}</div>
            <div style={{fontSize:13,color:C.soft,marginTop:4}}>{r.text}</div>
          </div>)}
          <div style={{background:C.gl,borderRadius:14,padding:16}}><div style={{fontSize:13,fontWeight:700,color:C.gd,marginBottom:4}}>📈 Tu posición en el ranking</div><div style={{fontSize:13,color:C.soft}}>#3 de 34 Plomeros en Florencio Varela</div></div>
        </div>
      </>}

      {tab===3&&<>
        <div style={{background:`linear-gradient(160deg,${C.gd},${C.g})`,padding:"24px 20px 32px",color:"white",textAlign:"center"}}>
          <div style={{width:80,height:80,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 12px",border:"3px solid rgba(255,255,255,0.5)",position:"relative"}}>🔧<div style={{position:"absolute",bottom:0,right:0,background:C.g,color:"white",width:24,height:24,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,border:"2px solid white"}}>✓</div></div>
          <div style={{fontFamily:"Nunito",fontSize:22,fontWeight:800}}>{form.nombre||"Carlos"} {form.apellido||"Méndez"}</div>
          <div style={{fontSize:13,opacity:.8,marginTop:2}}>{form.oficio||"Plomero"} · Florencio Varela</div>
          <div style={{marginTop:6,fontSize:14}}>★★★★★ 4.9 · 38 trabajos</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,padding:16,marginTop:-16}}>
          {[["38","Trabajos"],["4.9","Calificación"],["2 años","Activo"]].map(([n,l])=><div key={l} style={{background:C.w,borderRadius:12,padding:"14px 10px",textAlign:"center",boxShadow:"0 2px 10px rgba(0,0,0,0.08)"}}><div style={{fontSize:20,fontWeight:800,color:C.g,fontFamily:"Nunito"}}>{n}</div><div style={{fontSize:11,color:C.soft,marginTop:2,fontWeight:600}}>{l}</div></div>)}
        </div>
        <div style={{padding:"0 16px 12px"}}><div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>Verificaciones</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{["✓ DNI","✓ Rostro validado","✓ Matrícula"].map(t=><div key={t} style={S.chip}>{t}</div>)}</div></div>
        <div style={{padding:"0 16px 24px"}}><button style={{...S.btn,background:"transparent",color:C.g,border:`2px solid ${C.g}`,boxShadow:"none"}}>✏️ Editar perfil</button></div>
      </>}
    </div>
    <div style={{background:C.w,borderTop:`1px solid ${C.gray2}`,padding:"10px 0 20px",display:"flex",justifyContent:"space-around"}}>
      {[["🏠","Solicitudes"],["💬","Chat"],["📊","Stats"],["👤","Mi perfil"]].map(([icon,lbl],i)=>(
        <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",padding:"4px 10px"}} onClick={()=>setTab(i)}>
          <div style={{fontSize:22,padding:"4px 10px",borderRadius:10,background:tab===i?C.gl:"transparent"}}>{icon}</div>
          <div style={{fontSize:10,fontWeight:600,color:tab===i?C.g:C.soft}}>{lbl}</div>
        </div>
      ))}
    </div>
  </>);
}

// ── HOME CLIENTE ──
function HomeCliente({form}){
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [selWorker, setSelWorker] = useState(null);
  const [selChat, setSelChat] = useState(null);
  const [msgs, setMsgs] = useState({});
  const [msgInput, setMsgInput] = useState("");
  const [newRev, setNewRev] = useState({stars:0,text:""});
  const [revSent, setRevSent] = useState(false);

  const filtered = WORKERS.filter(w=>search===""||w.name.toLowerCase().includes(search.toLowerCase())||w.trade.toLowerCase().includes(search.toLowerCase()));
  const getMsgs = (c) => msgs[c.id]||c.msgs;
  const sendMsg = (c) => { if(!msgInput.trim()) return; setMsgs(m=>({...m,[c.id]:[...getMsgs(c),{from:"sent",text:msgInput}]})); setMsgInput(""); };

  if(selChat){
    const ms=getMsgs(selChat);
    return(<>
      <div style={{background:C.gd,padding:"16px 20px",color:"white",display:"flex",alignItems:"center",gap:12}}>
        <span style={{cursor:"pointer",background:"rgba(255,255,255,0.15)",borderRadius:8,padding:"4px 10px",fontSize:18}} onClick={()=>setSelChat(null)}>←</span>
        <span style={{fontSize:22}}>{selChat.emoji}</span>
        <div style={{flex:1}}><div style={{fontFamily:"Nunito",fontWeight:700,fontSize:15}}>{selChat.name}</div><div style={{fontSize:11,opacity:.7}}>En línea</div></div>
      </div>
      <div style={{flex:1,padding:16,overflowY:"auto",display:"flex",flexDirection:"column",gap:10}}>
        {ms.map((m,i)=><div key={i} style={{maxWidth:"75%",padding:"10px 14px",borderRadius:16,fontSize:14,lineHeight:1.4,background:m.from==="recv"?C.gray:C.g,color:m.from==="recv"?C.text:"white",alignSelf:m.from==="recv"?"flex-start":"flex-end"}}>{m.text}</div>)}
      </div>
      <div style={{padding:"12px 16px",borderTop:`1px solid ${C.gray2}`,display:"flex",gap:8,alignItems:"center"}}>
        <input style={{flex:1,padding:"12px 14px",border:`2px solid ${C.gray2}`,borderRadius:24,fontSize:14,fontFamily:"DM Sans",outline:"none",background:C.gray}} placeholder="Escribí un mensaje..." value={msgInput} onChange={e=>setMsgInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg(selChat)}/>
        <button style={{width:44,height:44,borderRadius:"50%",background:C.g,border:"none",fontSize:18,cursor:"pointer"}} onClick={()=>sendMsg(selChat)}>➤</button>
      </div>
    </>);
  }

  if(selWorker){
    const w=selWorker;
    return(<div style={{flex:1,overflowY:"auto"}}>
      <div style={{background:`linear-gradient(160deg,${C.gd},${C.g})`,padding:"24px 20px 32px",color:"white",textAlign:"center"}}>
        <div style={{cursor:"pointer",background:"rgba(255,255,255,0.15)",borderRadius:8,padding:"4px 12px",display:"inline-block",marginBottom:12,fontSize:18,alignSelf:"flex-start"}} onClick={()=>{setSelWorker(null);setRevSent(false);setNewRev({stars:0,text:""});}}>← Volver</div>
        <div style={{width:80,height:80,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 12px",border:"3px solid rgba(255,255,255,0.5)"}}>{w.emoji}</div>
        <div style={{fontFamily:"Nunito",fontSize:22,fontWeight:800}}>{w.name}</div>
        <div style={{fontSize:13,opacity:.8,marginTop:2}}>{w.trade} · {w.zone}</div>
        <div style={{marginTop:6,fontSize:14}}>★★★★★ {w.rating} · {w.jobs} trabajos</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,padding:16,marginTop:-16}}>
        {[[w.jobs,"Trabajos"],[w.rating,"Calificación"],[w.resp,"Respuesta"]].map(([n,l])=><div key={l} style={{background:C.w,borderRadius:12,padding:"14px 10px",textAlign:"center",boxShadow:"0 2px 10px rgba(0,0,0,0.08)"}}><div style={{fontSize:16,fontWeight:800,color:C.g,fontFamily:"Nunito"}}>{n}</div><div style={{fontSize:11,color:C.soft,marginTop:2,fontWeight:600}}>{l}</div></div>)}
      </div>
      <div style={{padding:"0 16px 12px"}}><div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>Especialidades</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{w.skills.map(s=><div key={s} style={S.chip}>{s}</div>)}</div></div>
      <div style={{padding:"0 16px 12px"}}>
        <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>Reseñas ({w.reviews.length})</div>
        {w.reviews.map((r,i)=><div key={i} style={{background:C.gray,borderRadius:12,padding:14,marginBottom:10}}><div style={{fontSize:13,fontWeight:700,marginBottom:4}}>{r.name}</div><div style={{color:"#F59E0B",fontSize:13}}>{"★".repeat(r.stars)}</div><div style={{fontSize:13,color:C.soft,marginTop:4}}>{r.text}</div></div>)}
      </div>
      {!revSent?(
        <div style={{padding:"0 16px 12px"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>Dejá tu reseña</div>
          <div style={{background:C.gray,borderRadius:14,padding:16}}>
            <div style={{display:"flex",gap:4}}>{[1,2,3,4,5].map(s=><span key={s} style={{fontSize:28,cursor:"pointer",color:s<=newRev.stars?"#F59E0B":C.gray2}} onClick={()=>setNewRev(r=>({...r,stars:s}))}>★</span>)}</div>
            <textarea style={{width:"100%",marginTop:10,padding:10,borderRadius:10,border:`2px solid ${C.gray2}`,fontFamily:"DM Sans",fontSize:13,outline:"none",resize:"none",background:C.w}} rows={3} placeholder="Contá tu experiencia..." value={newRev.text} onChange={e=>setNewRev(r=>({...r,text:e.target.value}))}/>
            <button style={{...S.btn,opacity:newRev.stars?1:.5}} disabled={!newRev.stars} onClick={()=>setRevSent(true)}>Enviar reseña</button>
          </div>
        </div>
      ):<div style={{padding:"0 16px 12px"}}><div style={{background:C.gl,borderRadius:12,padding:14,textAlign:"center",border:`2px solid ${C.gm}`}}><div style={{fontSize:24,marginBottom:4}}>⭐</div><div style={{fontWeight:700,color:C.gd,fontSize:14}}>¡Reseña enviada! Gracias.</div></div></div>}
      <div style={{padding:"0 16px 24px"}}><button style={S.btn} onClick={()=>{setSelWorker(null);setTab(1);setSelChat(CHATS_C[0]);}}>💬 Contactar a {w.name.split(" ")[0]}</button></div>
    </div>);
  }

  return(<>
    <div style={{flex:1,overflowY:"auto"}}>
      {tab===0&&<>
        <div style={S.hdrGreen}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div><div style={{fontFamily:"Nunito",fontSize:22,fontWeight:800}}>¿Qué changarin necesitás?</div><div style={{fontSize:13,opacity:.75,marginTop:2}}>34 profesionales activos en tu zona</div></div>
            <div style={{width:44,height:44,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🏠</div>
          </div>
          <div style={{background:C.w,borderRadius:14,padding:"12px 16px",display:"flex",alignItems:"center",gap:10,boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
            <span style={{fontSize:16}}>🔍</span>
            <input style={{flex:1,border:"none",outline:"none",fontSize:14,fontFamily:"DM Sans",color:C.text,background:"transparent"}} placeholder="Ej: plomero, electricista, pintor..." value={search} onChange={e=>setSearch(e.target.value)}/>
            {search&&<span style={{fontSize:14,cursor:"pointer",color:C.soft}} onClick={()=>setSearch("")}>✕</span>}
          </div>
        </div>
        <div style={{padding:16}}>
          {search===""&&<div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8,marginBottom:8}}>
            {["🔧 Plomero","⚡ Electricista","🧱 Albañil","🎨 Pintor","🔥 Gasista"].map(c=><div key={c} style={{flexShrink:0,background:C.w,border:`2px solid ${C.gray2}`,borderRadius:20,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}} onClick={()=>setSearch(c.split(" ")[1])}>{c}</div>)}
          </div>}
          <div style={{fontFamily:"Nunito",fontSize:16,fontWeight:800,marginBottom:12}}>{search?`Resultados para "${search}"`:"Disponibles ahora"}</div>
          {filtered.length===0&&<div style={{textAlign:"center",padding:40,color:C.soft,fontSize:14}}>Sin resultados para "{search}"</div>}
          {filtered.map(w=><div key={w.id} style={{background:C.w,borderRadius:16,padding:14,boxShadow:"0 2px 10px rgba(0,0,0,0.07)",marginBottom:10,display:"flex",gap:12,cursor:"pointer",border:`2px solid transparent`,transition:"all 0.2s"}} onClick={()=>setSelWorker(w)}>
            <div style={{width:56,height:56,borderRadius:"50%",background:C.gl,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0,position:"relative"}}>
              {w.emoji}<div style={{position:"absolute",bottom:-2,right:-2,background:C.g,color:"white",width:18,height:18,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,border:"2px solid white"}}>✓</div>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:700,fontFamily:"Nunito"}}>{w.name}</div>
              <div style={{fontSize:12,color:C.g,fontWeight:600}}>{w.trade}</div>
              <div style={{display:"flex",gap:8,alignItems:"center",marginTop:5,flexWrap:"wrap"}}>
                <span style={{color:"#F59E0B",fontSize:12}}>★★★★★</span>
                <span style={{fontSize:12,color:C.soft}}>{w.rating} ({w.jobs})</span>
                <span style={{fontSize:11,color:C.soft,background:C.gray,padding:"2px 8px",borderRadius:20}}>📍 {w.zone}</span>
              </div>
              <div style={{marginTop:5}}><span style={{fontSize:11,fontWeight:700,color:C.g,background:C.gl,padding:"2px 8px",borderRadius:20}}>⚡ {w.resp}</span></div>
            </div>
          </div>)}
        </div>
      </>}

      {tab===1&&<>
        <div style={S.hdrGreen}><div style={{fontFamily:"Nunito",fontSize:22,fontWeight:800}}>💬 Mensajes</div><div style={{fontSize:13,opacity:.75,marginTop:2}}>{CHATS_C.filter(c=>c.unread).length} sin leer</div></div>
        <div style={{padding:16}}>{CHATS_C.map(c=><div key={c.id} style={{display:"flex",gap:12,padding:"14px 0",borderBottom:`1px solid ${C.gray2}`,cursor:"pointer",alignItems:"flex-start"}} onClick={()=>setSelChat(c)}>
          <div style={{width:48,height:48,borderRadius:"50%",background:C.gl,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{c.emoji}</div>
          <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700}}>{c.name}</div><div style={{fontSize:13,color:C.soft,marginTop:2}}>{c.preview}</div></div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
            <div style={{fontSize:11,color:C.soft}}>{c.time}</div>
            {c.unread>0&&<div style={{background:C.g,color:"white",borderRadius:"50%",width:20,height:20,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{c.unread}</div>}
          </div>
        </div>)}</div>
      </>}

      {tab===2&&<>
        <div style={S.hdrGreen}><div style={{fontFamily:"Nunito",fontSize:22,fontWeight:800}}>📋 Mis pedidos</div></div>
        <div style={{padding:16}}>
          {[{emoji:"🔧",t:"Plomería – pérdida cocina",e:"Completado",w:"Carlos Méndez",r:5},{emoji:"⚡",t:"Revisión tablero eléctrico",e:"En curso",w:"Sergio Díaz",r:null},{emoji:"🧱",t:"Humedad en pared",e:"Presupuestando",w:"Diego Romero",r:null}].map((p,i)=>(
            <div key={i} style={{background:C.w,borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 2px 10px rgba(0,0,0,0.07)"}}>
              <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                <span style={{fontSize:28}}>{p.emoji}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:700,fontFamily:"Nunito"}}>{p.t}</div>
                  <div style={{fontSize:12,color:C.soft,marginTop:2}}>{p.w}</div>
                  <div style={{marginTop:6}}><span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,background:p.e==="Completado"?C.gl:p.e==="En curso"?C.bl:C.ogl,color:p.e==="Completado"?C.gd:p.e==="En curso"?C.blue:C.og}}>{p.e}</span></div>
                  {p.r&&<div style={{marginTop:6,color:"#F59E0B",fontSize:13}}>{"★".repeat(p.r)} Calificaste este trabajo</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </>}

      {tab===3&&<>
        <div style={{background:`linear-gradient(160deg,${C.gd},${C.g})`,padding:"24px 20px 32px",color:"white",textAlign:"center"}}>
          <div style={{width:80,height:80,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 12px",border:"3px solid rgba(255,255,255,0.5)"}}>🏠</div>
          <div style={{fontFamily:"Nunito",fontSize:22,fontWeight:800}}>{form.nombre||"Ana"} {form.apellido||"García"}</div>
          <div style={{fontSize:13,opacity:.8,marginTop:2}}>Cliente verificado · F. Varela</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,padding:16,marginTop:-16}}>
          {[["3","Servicios"],["2","Reseñas"],["✓","Verificado"]].map(([n,l])=><div key={l} style={{background:C.w,borderRadius:12,padding:"14px 10px",textAlign:"center",boxShadow:"0 2px 10px rgba(0,0,0,0.08)"}}><div style={{fontSize:20,fontWeight:800,color:C.g,fontFamily:"Nunito"}}>{n}</div><div style={{fontSize:11,color:C.soft,marginTop:2,fontWeight:600}}>{l}</div></div>)}
        </div>
        <div style={{padding:"0 16px 24px"}}><button style={{...S.btn,background:"transparent",color:C.g,border:`2px solid ${C.g}`,boxShadow:"none"}}>✏️ Editar perfil</button></div>
      </>}
    </div>
    <div style={{background:C.w,borderTop:`1px solid ${C.gray2}`,padding:"10px 0 20px",display:"flex",justifyContent:"space-around"}}>
      {[["🔍","Buscar"],["💬","Chat"],["📋","Pedidos"],["👤","Mi perfil"]].map(([icon,lbl],i)=>(
        <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",padding:"4px 10px"}} onClick={()=>setTab(i)}>
          <div style={{fontSize:22,padding:"4px 10px",borderRadius:10,background:tab===i?C.gl:"transparent"}}>{icon}</div>
          <div style={{fontSize:10,fontWeight:600,color:tab===i?C.g:C.soft}}>{lbl}</div>
        </div>
      ))}
    </div>
  </>);
}

// ── HOME CONSORCIO ──
function HomeConsorcio({form}){
  const [tab, setTab] = useState(0);
  const [selChat, setSelChat] = useState(null);
  const [msgs, setMsgs] = useState({});
  const [msgInput, setMsgInput] = useState("");

  const CHATS_CON = [
    {id:1,name:"Carlos Méndez 🔧",preview:"Puedo ir mañana a las 9hs",time:"09:41",unread:1,emoji:"🔧",msgs:[{from:"recv",text:"Buen día, vi la solicitud del edificio"},{from:"recv",text:"Puedo ir mañana a las 9hs, ¿les viene?"},{from:"sent",text:"Perfecto, los espero en portería"}]},
    {id:2,name:"Sergio Díaz ⚡",preview:"El presupuesto es $320.000",time:"ayer",unread:0,emoji:"⚡",msgs:[{from:"recv",text:"El presupuesto para el tablero es $320.000 con materiales"}]},
  ];

  const getMsgs = (c) => msgs[c.id]||c.msgs;
  const sendMsg = (c) => { if(!msgInput.trim()) return; setMsgs(m=>({...m,[c.id]:[...getMsgs(c),{from:"sent",text:msgInput}]})); setMsgInput(""); };

  if(selChat){
    const ms=getMsgs(selChat);
    return(<>
      <div style={{background:C.gd,padding:"16px 20px",color:"white",display:"flex",alignItems:"center",gap:12}}>
        <span style={{cursor:"pointer",background:"rgba(255,255,255,0.15)",borderRadius:8,padding:"4px 10px",fontSize:18}} onClick={()=>setSelChat(null)}>←</span>
        <span style={{fontSize:22}}>{selChat.emoji}</span>
        <div style={{flex:1}}><div style={{fontFamily:"Nunito",fontWeight:700,fontSize:15}}>{selChat.name}</div><div style={{fontSize:11,opacity:.7}}>En línea</div></div>
      </div>
      <div style={{flex:1,padding:16,overflowY:"auto",display:"flex",flexDirection:"column",gap:10}}>
        {ms.map((m,i)=><div key={i} style={{maxWidth:"75%",padding:"10px 14px",borderRadius:16,fontSize:14,lineHeight:1.4,background:m.from==="recv"?C.gray:C.g,color:m.from==="recv"?C.text:"white",alignSelf:m.from==="recv"?"flex-start":"flex-end"}}>{m.text}</div>)}
      </div>
      <div style={{padding:"12px 16px",borderTop:`1px solid ${C.gray2}`,display:"flex",gap:8,alignItems:"center"}}>
        <input style={{flex:1,padding:"12px 14px",border:`2px solid ${C.gray2}`,borderRadius:24,fontSize:14,fontFamily:"DM Sans",outline:"none",background:C.gray}} placeholder="Escribí un mensaje..." value={msgInput} onChange={e=>setMsgInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg(selChat)}/>
        <button style={{width:44,height:44,borderRadius:"50%",background:C.g,border:"none",fontSize:18,cursor:"pointer"}} onClick={()=>sendMsg(selChat)}>➤</button>
      </div>
    </>);
  }

  return(<>
    <div style={{flex:1,overflowY:"auto"}}>
      {tab===0&&<>
        <div style={S.hdrGreen}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontFamily:"Nunito",fontSize:20,fontWeight:800}}>🏢 {form.razonSocial||"Consorcio Av. San Martín"}</div><div style={{fontSize:13,opacity:.75,marginTop:2}}>{form.direccion||"Av. San Martín 1240"} · {form.municipio||"Florencio Varela"}</div></div>
            <div style={{width:44,height:44,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🏢</div>
          </div>
        </div>
        <div style={{padding:16}}>
          <div style={{fontFamily:"Nunito",fontSize:16,fontWeight:800,marginBottom:12}}>Nueva solicitud de servicio</div>
          <div style={{background:C.w,borderRadius:16,padding:16,boxShadow:"0 2px 12px rgba(0,0,0,0.07)",marginBottom:16}}>
            {[["Tipo de servicio",""],["Descripción del problema",""],["Urgencia",""]].map(([l],i)=>(
              <div key={i} style={{marginBottom:i<2?14:0}}>
                <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>{l}</div>
                {i===0&&<select style={{...S.inp,appearance:"none",cursor:"pointer"}}><option>Seleccioná el servicio...</option>{["Plomería","Electricidad","Gas","Albañilería","Pintura","Herrería","Limpieza de tanque","Ascensor"].map(s=><option key={s}>{s}</option>)}</select>}
                {i===1&&<textarea style={{...S.inp,resize:"none"}} rows={3} placeholder="Describí el problema con detalle..."/>}
                {i===2&&<div style={{display:"flex",gap:8}}>{["🚨 Urgente","⏰ Esta semana","📅 Sin apuro"].map(u=><div key={u} style={{flex:1,padding:"10px 6px",border:`2px solid ${C.gray2}`,borderRadius:10,background:C.gray,cursor:"pointer",fontSize:11,fontWeight:600,textAlign:"center"}}>{u}</div>)}</div>}
              </div>
            ))}
            <button style={{...S.btn,marginTop:16}}>Publicar solicitud</button>
          </div>

          <div style={{fontFamily:"Nunito",fontSize:16,fontWeight:800,marginBottom:12}}>Historial de servicios</div>
          {[{emoji:"🔧",t:"Reparación caño planta baja",e:"Completado",w:"Carlos Méndez",f:"20/05",r:5},{emoji:"⚡",t:"Cambio llaves térmicas",e:"En curso",w:"Sergio Díaz",f:"28/05",r:null}].map((p,i)=>(
            <div key={i} style={{background:C.w,borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 2px 10px rgba(0,0,0,0.07)"}}>
              <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                <span style={{fontSize:28}}>{p.emoji}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:700,fontFamily:"Nunito"}}>{p.t}</div>
                  <div style={{fontSize:12,color:C.soft,marginTop:2}}>{p.w} · {p.f}</div>
                  <div style={{marginTop:6}}><span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,background:p.e==="Completado"?C.gl:C.bl,color:p.e==="Completado"?C.gd:C.blue}}>{p.e}</span></div>
                  {p.r&&<div style={{marginTop:6,color:"#F59E0B",fontSize:13}}>{"★".repeat(p.r)} Calificaste este trabajo</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </>}

      {tab===1&&<>
        <div style={S.hdrGreen}><div style={{fontFamily:"Nunito",fontSize:22,fontWeight:800}}>💬 Mensajes</div><div style={{fontSize:13,opacity:.75,marginTop:2}}>{CHATS_CON.filter(c=>c.unread).length} sin leer</div></div>
        <div style={{padding:16}}>{CHATS_CON.map(c=><div key={c.id} style={{display:"flex",gap:12,padding:"14px 0",borderBottom:`1px solid ${C.gray2}`,cursor:"pointer",alignItems:"flex-start"}} onClick={()=>setSelChat(c)}>
          <div style={{width:48,height:48,borderRadius:"50%",background:C.gl,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{c.emoji}</div>
          <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700}}>{c.name}</div><div style={{fontSize:13,color:C.soft,marginTop:2}}>{c.preview}</div></div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
            <div style={{fontSize:11,color:C.soft}}>{c.time}</div>
            {c.unread>0&&<div style={{background:C.g,color:"white",borderRadius:"50%",width:20,height:20,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{c.unread}</div>}
          </div>
        </div>)}</div>
      </>}

      {tab===2&&<>
        <div style={S.hdrGreen}><div style={{fontFamily:"Nunito",fontSize:22,fontWeight:800}}>🏢 Perfil del consorcio</div></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,padding:16,marginTop:0}}>
          {[["2","Servicios"],["4.8","Rating"],["✓","Verificado"]].map(([n,l])=><div key={l} style={{background:C.w,borderRadius:12,padding:"14px 10px",textAlign:"center",boxShadow:"0 2px 10px rgba(0,0,0,0.08)"}}><div style={{fontSize:20,fontWeight:800,color:C.g,fontFamily:"Nunito"}}>{n}</div><div style={{fontSize:11,color:C.soft,marginTop:2,fontWeight:600}}>{l}</div></div>)}
        </div>
        <div style={{padding:"0 16px"}}>
          {[["Razón social",form.razonSocial||"Consorcio Av. San Martín 1240"],["CUIT",form.cuit||"30-12345678-9"],["Dirección",form.direccion||"Av. San Martín 1240"],["Administrador",form.nombre||"Roberto García"],["Municipio",form.municipio||"Florencio Varela"]].map(([l,v])=>(
            <div key={l} style={{padding:"12px 0",borderBottom:`1px solid ${C.gray2}`}}>
              <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:.8,marginBottom:3}}>{l}</div>
              <div style={{fontSize:14,color:C.text,fontWeight:500}}>{v}</div>
            </div>
          ))}
          <div style={{marginTop:16,padding:14,background:"#FEF3E7",borderRadius:12,border:"1.5px solid #FCD34D"}}>
            <div style={{fontSize:13,fontWeight:700,color:C.og,marginBottom:4}}>💳 Plan Consorcio — Próximamente</div>
            <div style={{fontSize:12,color:C.og,lineHeight:1.5}}>El plan para consorcios incluye publicación ilimitada de solicitudes, historial del edificio y reportes mensuales. Habilitamos el pago en línea próximamente.</div>
          </div>
        </div>
        <div style={{padding:"16px 16px 24px"}}><button style={{...S.btn,background:"transparent",color:C.g,border:`2px solid ${C.g}`,boxShadow:"none"}}>✏️ Editar perfil</button></div>
      </>}
    </div>
    <div style={{background:C.w,borderTop:`1px solid ${C.gray2}`,padding:"10px 0 20px",display:"flex",justifyContent:"space-around"}}>
      {[["📋","Solicitudes"],["💬","Chat"],["🏢","Mi perfil"]].map(([icon,lbl],i)=>(
        <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",padding:"4px 10px"}} onClick={()=>setTab(i)}>
          <div style={{fontSize:22,padding:"4px 10px",borderRadius:10,background:tab===i?C.gl:"transparent"}}>{icon}</div>
          <div style={{fontSize:10,fontWeight:600,color:tab===i?C.g:C.soft}}>{lbl}</div>
        </div>
      ))}
    </div>
  </>);
}


// ── APP PRINCIPAL ──
export default function App(){
  const [flow, setFlow] = useState("welcome"); // welcome | login | reg | home
  const [rol, setRol] = useState(null);
  const [form, setForm] = useState({});

  const goReg = (r) => { setRol(r); setFlow("reg"); };
  const goHome = (f={}) => { setForm(f); setFlow("home"); };

  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,gap:16,background:"linear-gradient(135deg,#C8E6D4,#E8F5EE,#D4EDE0)"}}>
      <div style={{fontFamily:"Nunito",fontSize:13,fontWeight:700,color:"#4A7A5A",letterSpacing:"1.5px",textTransform:"uppercase"}}>ChangaYa! — Demo completa</div>

      {flow==="home"&&<div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
        <button onClick={()=>{setRol("trabajador");}} style={{padding:"6px 16px",borderRadius:20,border:"none",background:rol==="trabajador"?C.gd:C.gray2,color:rol==="trabajador"?"white":C.text,fontWeight:700,cursor:"pointer",fontFamily:"Nunito",fontSize:12}}>🔧 Trabajador</button>
        <button onClick={()=>setRol("cliente")} style={{padding:"6px 16px",borderRadius:20,border:"none",background:rol==="cliente"?C.gd:C.gray2,color:rol==="cliente"?"white":C.text,fontWeight:700,cursor:"pointer",fontFamily:"Nunito",fontSize:12}}>🏠 Cliente</button>
        <button onClick={()=>setRol("consorcio")} style={{padding:"6px 16px",borderRadius:20,border:"none",background:rol==="consorcio"?C.gd:C.gray2,color:rol==="consorcio"?"white":C.text,fontWeight:700,cursor:"pointer",fontFamily:"Nunito",fontSize:12}}>🏢 Consorcio</button>
        <button onClick={()=>setFlow("welcome")} style={{padding:"6px 16px",borderRadius:20,border:`2px solid ${C.gray2}`,background:"transparent",color:C.soft,fontWeight:700,cursor:"pointer",fontFamily:"Nunito",fontSize:12}}>↩ Inicio</button>
      </div>}

      <div style={S.shell}>
        <StatusBar/>
        {flow==="welcome"&&<div style={S.screen}><Welcome onRol={goReg} onLogin={()=>setFlow("login")}/></div>}
        {flow==="login"&&<Login onBack={()=>setFlow("welcome")} onLogin={()=>{setRol("cliente");goHome({});}}/>}
        {flow==="reg"&&<Registro rol={rol} onBack={()=>setFlow("welcome")} onDone={f=>goHome(f)}/>}
        {flow==="home"&&rol==="trabajador"&&<HomeTrabajador form={form}/>}
        {flow==="home"&&rol==="cliente"&&<HomeCliente form={form}/>}
        {flow==="home"&&rol==="consorcio"&&<HomeConsorcio form={form}/>}
      </div>

      <div style={{fontFamily:"Nunito",fontSize:11,fontWeight:700,color:"#4A7A5A",letterSpacing:"1px",textTransform:"uppercase"}}>Prototipo navegable · no representa datos reales</div>
    </div>
  );
}
