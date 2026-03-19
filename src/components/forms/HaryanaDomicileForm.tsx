import React from "react";

interface Props {
  hy: any;
  setHy: (v: any) => void;
  onSubmit: () => void;
  theme: any;
  accent: string;
}

export const HaryanaDomicileForm: React.FC<Props> = ({
  hy, setHy, onSubmit, theme, accent
}) => {

  const readFile = (file: File, cb: (r: string) => void) => {
    const reader = new FileReader();
    reader.onload = e => cb(e.target!.result as string);
    reader.readAsDataURL(file);
  };

  const fields = [
    {k:"name", label:"NAME", ph:"Name"},
    {k:"father", label:"Father Name", ph:"Father Name"},
    {k:"place", label:"Place", ph:"Place"},
    {k:"mother", label:"Mother Name", ph:"Mother Name"},
    {k:"house", label:"House No.", ph:"House No"},
    {k:"tahsil", label:"Tahsil Name", ph:"Tahsil Name"},
    {k:"district", label:"District", ph:"District"},
    {k:"pin", label:"Pin Code", ph:"Pin Code"},
    {k:"landmark", label:"Landmark", ph:"Landmark"},
    {k:"vill", label:"Vill / Town", ph:"Vill / Town"},
    {k:"town", label:"Town Name", ph:"Town Name"},
  ];

  return (
    <div style={{background: theme.statBg, borderRadius: 16, padding: 24, maxWidth: 700}}>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:14}}>
        {fields.map((f, i) => (
          <div key={i}>
            <div style={{color:"#F9A826", fontSize:12, fontWeight:700, marginBottom:6}}>{f.label}</div>
            <input
              value={hy[f.k]}
              onChange={e => setHy({...hy, [f.k]: e.target.value})}
              style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
              placeholder={f.ph}
            />
          </div>
        ))}
        <div>
          <div style={{color:"#F9A826", fontSize:12, fontWeight:700, marginBottom:6}}>Photo</div>
          <label style={{display:"flex", alignItems:"center", gap:8, background:`rgba(0,201,167,0.08)`, border:`1.5px dashed ${accent}`, borderRadius:10, padding:"9px 12px", cursor:"pointer"}}>
            <span>📷</span>
            <span style={{color:accent, fontWeight:700, fontSize:12}}>{hy.photo ? "✅ Selected" : "Choose File"}</span>
            <input type="file" accept="image/*" style={{display:"none"}}
              onChange={e=>{const f=e.target.files?.[0]; if(f) readFile(f, d=>setHy({...hy, photo:d}));}}/>
          </label>
        </div>
      </div>
      <button onClick={onSubmit}
        style={{padding:"13px 28px", border:"none", borderRadius:12, background:"linear-gradient(135deg,#f59e0b,#d97706)", color:"white", fontWeight:800, fontSize:15, cursor:"pointer"}}>
        💳 Pay ₹30 & Download PDF
      </button>
    </div>
  );
};
