import React from "react";

interface Props {
  m12: any;
  setM12: (v: any) => void;
  onSubmit: () => void;
  theme: any;
  accent: string;
}

export const Marksheet12Form: React.FC<Props> = ({
  m12, setM12, onSubmit, theme, accent
}) => {

  const readFile = (file: File, cb: (r: string) => void) => {
    const reader = new FileReader();
    reader.onload = e => cb(e.target!.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{background: theme.statBg, borderRadius: 16, padding: 24, maxWidth: 700}}>

      {/* Row 1 */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:14}}>
        {[
          {k:"nameEn", label:"Name In English", ph:"RAJU"},
          {k:"nameHi", label:"Name In Hindi", ph:"नाम"},
          {k:"motherEn", label:"Mother Name English", ph:"SUNITA"},
          {k:"motherHi", label:"Mother Name Hindi", ph:"माता का नाम"},
          {k:"fatherEn", label:"Father Name English", ph:"Father Name"},
          {k:"fatherHi", label:"Father Name Hindi", ph:"पिता का नाम"},
        ].map((f, i) => (
          <div key={i}>
            <div style={{color:"#F9A826", fontSize:12, fontWeight:700, marginBottom:6}}>{f.label}</div>
            <input value={m12[f.k]} onChange={e=>setM12({...m12, [f.k]:e.target.value})}
              style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
              placeholder={f.ph}/>
          </div>
        ))}
      </div>

      {/* School Names */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14}}>
        {[
          {k:"schoolEn", label:"School Name English", ph:"School Name"},
          {k:"schoolHi", label:"School Name Hindi", ph:"विद्यालय का नाम"},
        ].map((f, i) => (
          <div key={i}>
            <div style={{color:"#F9A826", fontSize:12, fontWeight:700, marginBottom:6}}>{f.label}</div>
            <input value={m12[f.k]} onChange={e=>setM12({...m12, [f.k]:e.target.value})}
              style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
              placeholder={f.ph}/>
          </div>
        ))}
      </div>

      {/* Subjects */}
      {m12.subjects.map((sub: any, i: number) => (
        <div key={i} style={{display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:10, marginBottom:10}}>
          <div>
            <div style={{color:"#F9A826", fontSize:11, fontWeight:700, marginBottom:4}}>SUBJECT</div>
            <input value={sub.s} onChange={e=>{const s=[...m12.subjects];s[i]={...s[i],s:e.target.value};setM12({...m12,subjects:s});}}
              style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:8, padding:"8px 10px", color:theme.text, fontSize:12, outline:"none"}}
              placeholder={"Subject "+(i+1)}/>
          </div>
          <div>
            <div style={{color:"#F9A826", fontSize:11, fontWeight:700, marginBottom:4}}>MARKS</div>
            <input value={sub.m} onChange={e=>{const s=[...m12.subjects];s[i]={...s[i],m:e.target.value};setM12({...m12,subjects:s});}}
              style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:8, padding:"8px 10px", color:theme.text, fontSize:12, outline:"none"}}
              placeholder="1/71"/>
          </div>
          <div>
            <div style={{color:"#F9A826", fontSize:11, fontWeight:700, marginBottom:4}}>TOTAL</div>
            <input value={sub.t} onChange={e=>{const s=[...m12.subjects];s[i]={...s[i],t:e.target.value};setM12({...m12,subjects:s});}}
              style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:8, padding:"8px 10px", color:theme.text, fontSize:12, outline:"none"}}
              placeholder="071"/>
          </div>
        </div>
      ))}

      {/* Extra Fields */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:14, marginBottom:14, marginTop:10}}>
        {[
          {k:"grand", label:"Grand Total", ph:"373/500"},
          {k:"year", label:"Pass Year", ph:"2024"},
          {k:"date", label:"Result Date", ph:"31 JULY 2024"},
          {k:"district", label:"District", ph:"District"},
          {k:"sr", label:"SR No.", ph:"1333386"},
          {k:"roll", label:"Roll Number", ph:"212082801"},
          {k:"code", label:"School Code", ph:"55/15126/211"},
          {k:"cert", label:"Certificate No", ph:"55879061"},
        ].map((f, i) => (
          <div key={i}>
            <div style={{color:"#F9A826", fontSize:12, fontWeight:700, marginBottom:6}}>{f.label}</div>
            <input value={m12[f.k]} onChange={e=>setM12({...m12, [f.k]:e.target.value})}
              style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
              placeholder={f.ph}/>
          </div>
        ))}
      </div>

      {/* Photo */}
      <div style={{marginBottom:20}}>
        <div style={{color:"#F9A826", fontSize:12, fontWeight:700, marginBottom:6}}>Photo</div>
        <label style={{display:"inline-flex", alignItems:"center", gap:8, background:`rgba(0,201,167,0.08)`, border:`1.5px dashed ${accent}`, borderRadius:10, padding:"9px 12px", cursor:"pointer"}}>
          <span>📷</span>
          <span style={{color:accent, fontWeight:700, fontSize:12}}>{m12.photo ? "✅ Selected" : "Choose File"}</span>
          <input type="file" accept="image/*" style={{display:"none"}}
            onChange={e=>{const f=e.target.files?.[0]; if(f) readFile(f, d=>setM12({...m12, photo:d}));}}/>
        </label>
      </div>

      <button onClick={onSubmit}
        style={{padding:"13px 28px", border:"none", borderRadius:12, background:"linear-gradient(135deg,#f59e0b,#d97706)", color:"white", fontWeight:800, fontSize:15, cursor:"pointer"}}>
        💳 Pay ₹30 & Download PDF
      </button>
    </div>
  );
};
