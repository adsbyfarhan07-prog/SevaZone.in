 React from "react";

interface Props {
  pNo: string; setPNo: (v: string) => void;
  pName: string; setPName: (v: string) => void;
  pFather: string; setPFather: (v: string) => void;
  pDob: string; setPDob: (v: string) => void;
  pGender: string; setPGender: (v: string) => void;
  pPhoto: string | null; setPPhoto: (v: string | null) => void;
  pSign: string | null; setPSign: (v: string | null) => void;
  onSubmit: () => void;
  theme: any;
  accent: string;
}

export const PanManualForm: React.FC<Props> = ({
  pNo, setPNo, pName, setPName, pFather, setPFather,
  pDob, setPDob, pGender, setPGender,
  pPhoto, setPPhoto, pSign, setPSign,
  onSubmit, theme, accent
}) => {

  const readFile = (file: File, cb: (r: string) => void) => {
    const reader = new FileReader();
    reader.onload = e => cb(e.target!.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{background: theme.statBg, borderRadius: 16, padding: 24, maxWidth: 700}}>

      {/* Row 1 */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:14, marginBottom:14}}>
        <div>
          <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>Pan No.</div>
          <input value={pNo} onChange={e=>setPNo(e.target.value.toUpperCase())} maxLength={10}
            style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
            placeholder="Pan Number"/>
        </div>
        <div>
          <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>Name</div>
          <input value={pName} onChange={e=>setPName(e.target.value)}
            style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
            placeholder="Full Name"/>
        </div>
        <div>
          <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>Father Name</div>
          <input value={pFather} onChange={e=>setPFather(e.target.value)}
            style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
            placeholder="Father Name"/>
        </div>
        <div>
          <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>Date Of Birth</div>
          <input type="date" value={pDob} onChange={e=>setPDob(e.target.value)}
            style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}/>
        </div>
      </div>

      {/* Row 2 */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:20}}>
        <div>
          <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>Gender</div>
          <select value={pGender} onChange={e=>setPGender(e.target.value)}
            style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>Photo</div>
          <label style={{display:"flex", alignItems:"center", gap:8, background:`rgba(0,201,167,0.08)`, border:`1.5px dashed ${accent}`, borderRadius:10, padding:"9px 12px", cursor:"pointer"}}>
            <span>📷</span>
            <span style={{color:accent, fontWeight:700, fontSize:12}}>{pPhoto ? "✅ Selected" : "Choose File"}</span>
            <input type="file" accept="image/*" style={{display:"none"}}
              onChange={e=>{const f=e.target.files?.[0]; if(f) readFile(f, d=>setPPhoto(d));}}/>
          </label>
        </div>
        <div>
          <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>Signature</div>
          <div style={{border:"1.5px solid #845EC2", borderRadius:10, background:"rgba(132,94,194,0.06)", padding:8}}>
            <div style={{fontSize:11, color:"#845EC2", fontWeight:700, marginBottom:4}}>✍️ Draw Signature</div>
            <canvas id="signCanvas" width={200} height={55}
              style={{display:"block", background:"white", borderRadius:6, cursor:"crosshair", touchAction:"none", border:"1px solid rgba(132,94,194,0.3)"}}
              onMouseDown={e=>{const c=e.currentTarget,ctx=c.getContext("2d")!;ctx.strokeStyle="#1a1a2e";ctx.lineWidth=2;ctx.lineCap="round";(c as any)._d=true;const r=c.getBoundingClientRect();ctx.beginPath();ctx.moveTo(e.clientX-r.left,e.clientY-r.top);}}
              onMouseMove={e=>{const c=e.currentTarget;if(!(c as any)._d)return;const ctx=c.getContext("2d")!,r=c.getBoundingClientRect();ctx.lineTo(e.clientX-r.left,e.clientY-r.top);ctx.stroke();}}
              onMouseUp={e=>{(e.currentTarget as any)._d=false;setPSign(e.currentTarget.toDataURL());}}
              onMouseLeave={e=>{if((e.currentTarget as any)._d){(e.currentTarget as any)._d=false;setPSign(e.currentTarget.toDataURL());}}}
              onTouchStart={e=>{e.preventDefault();const c=e.currentTarget,ctx=c.getContext("2d")!;ctx.strokeStyle="#1a1a2e";ctx.lineWidth=2;ctx.lineCap="round";(c as any)._d=true;const r=c.getBoundingClientRect(),t=e.touches[0];ctx.beginPath();ctx.moveTo(t.clientX-r.left,t.clientY-r.top);}}
              onTouchMove={e=>{e.preventDefault();const c=e.currentTarget;if(!(c as any)._d)return;const ctx=c.getContext("2d")!,r=c.getBoundingClientRect(),t=e.touches[0];ctx.lineTo(t.clientX-r.left,t.clientY-r.top);ctx.stroke();}}
              onTouchEnd={e=>{(e.currentTarget as any)._d=false;setPSign(e.currentTarget.toDataURL());}}
            />
            <div style={{display:"flex", gap:6, marginTop:6}}>
              <button type="button"
                onClick={()=>{const c=document.getElementById("signCanvas") as HTMLCanvasElement;c.getContext("2d")!.clearRect(0,0,c.width,c.height);setPSign(null);}}
                style={{flex:1, padding:"5px 0", borderRadius:7, border:"1px solid #845EC2", background:"transparent", color:"#845EC2", fontSize:11, fontWeight:700, cursor:"pointer"}}>
                🗑 Clear
              </button>
              <button type="button"
                onClick={()=>{const c=document.getElementById("signCanvas") as HTMLCanvasElement;setPSign(c.toDataURL());}}
                style={{flex:1, padding:"5px 0", borderRadius:7, border:"none", background:"#845EC2", color:"white", fontSize:11, fontWeight:700, cursor:"pointer"}}>
                {pSign ? "✅ Saved" : "💾 Save"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <button onClick={onSubmit}
        style={{padding:"13px 28px", border:"none", borderRadius:12, background:"linear-gradient(135deg,#f59e0b,#d97706)", color:"white", fontWeight:800, fontSize:15, cursor:"pointer"}}>
        💳 Pay ₹30 & Download PDF
      </button>
    </div>
  );
};
