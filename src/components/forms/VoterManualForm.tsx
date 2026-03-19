import React from "react";

interface Props {
  vEpic: string; setVEpic: (v: string) => void;
  vName: string; setVName: (v: string) => void;
  vPhoto: string | null; setVPhoto: (v: string | null) => void;
  onSubmit: () => void;
  theme: any;
  accent: string;
}

export const VoterManualForm: React.FC<Props> = ({
  vEpic, setVEpic, vName, setVName,
  vPhoto, setVPhoto, onSubmit, theme, accent
}) => {

  const readFile = (file: File, cb: (r: string) => void) => {
    const reader = new FileReader();
    reader.onload = e => cb(e.target!.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{background: theme.statBg, borderRadius: 16, padding: 24, maxWidth: 600}}>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14}}>
        <div>
          <div style={{color:"#F9A826", fontSize:12, fontWeight:700, marginBottom:6}}>Epic No.</div>
          <input value={vEpic} onChange={e=>setVEpic(e.target.value)}
            style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
            placeholder="Enter Epic No."/>
        </div>
        <div>
          <div style={{color:"#F9A826", fontSize:12, fontWeight:700, marginBottom:6}}>Name</div>
          <input value={vName} onChange={e=>setVName(e.target.value)}
            style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
            placeholder="Enter Name"/>
        </div>
      </div>

      <div style={{marginBottom:20}}>
        <div style={{color:"#F9A826", fontSize:12, fontWeight:700, marginBottom:6}}>Photo</div>
        <label style={{display:"inline-flex", alignItems:"center", gap:10, background:`rgba(0,201,167,0.1)`, border:`1.5px dashed ${accent}`, borderRadius:10, padding:"10px 18px", cursor:"pointer"}}>
          <span style={{fontSize:20}}>📷</span>
          <span style={{color:accent, fontWeight:700, fontSize:13}}>{vPhoto ? "✅ Photo Selected" : "Choose File"}</span>
          <input type="file" accept="image/*" style={{display:"none"}}
            onChange={e=>{const f=e.target.files?.[0]; if(f) readFile(f, d=>setVPhoto(d));}}/>
        </label>
      </div>

      <button onClick={onSubmit}
        style={{padding:"13px 28px", border:"none", borderRadius:12, background:"linear-gradient(135deg,#f59e0b,#d97706)", color:"white", fontWeight:800, fontSize:15, cursor:"pointer"}}>
        💳 Pay ₹20 & Download PDF
      </button>
    </div>
  );
};
