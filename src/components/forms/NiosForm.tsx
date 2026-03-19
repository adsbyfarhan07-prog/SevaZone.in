import React from "react";

interface Props {
  nName: string; setNName: (v: string) => void;
  nFather: string; setNFather: (v: string) => void;
  nMother: string; setNMother: (v: string) => void;
  nDob: string; setNDob: (v: string) => void;
  nYear: string; setNYear: (v: string) => void;
  nEnrolment: string; setNEnrolment: (v: string) => void;
  nPhoto: string | null; setNPhoto: (v: string | null) => void;
  onSubmit: () => void;
  theme: any;
  accent: string;
}

export const NiosForm: React.FC<Props> = ({
  nName, setNName, nFather, setNFather,
  nMother, setNMother, nDob, setNDob,
  nYear, setNYear, nEnrolment, setNEnrolment,
  nPhoto, setNPhoto, onSubmit, theme, accent
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
        <div>
          <div style={{color:"#F9A826", fontSize:12, fontWeight:700, marginBottom:6}}>Enrollment Number</div>
          <input value={nEnrolment} onChange={e=>setNEnrolment(e.target.value)}
            style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
            placeholder="e.g. 202462961657"/>
        </div>
        <div>
          <div style={{color:"#F9A826", fontSize:12, fontWeight:700, marginBottom:6}}>Candidate Name</div>
          <input value={nName} onChange={e=>setNName(e.target.value)}
            style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
            placeholder="Full Name"/>
        </div>
        <div>
          <div style={{color:"#F9A826", fontSize:12, fontWeight:700, marginBottom:6}}>Father Name</div>
          <input value={nFather} onChange={e=>setNFather(e.target.value)}
            style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
            placeholder="Father Name"/>
        </div>
      </div>

      {/* Row 2 */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:14}}>
        <div>
          <div style={{color:"#F9A826", fontSize:12, fontWeight:700, marginBottom:6}}>Mother Name</div>
          <input value={nMother} onChange={e=>setNMother(e.target.value)}
            style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
            placeholder="Mother Name"/>
        </div>
        <div>
          <div style={{color:"#F9A826", fontSize:12, fontWeight:700, marginBottom:6}}>DOB (DD-MM-YYYY)</div>
          <input value={nDob} onChange={e=>setNDob(e.target.value)}
            style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
            placeholder="DD-MM-YYYY"/>
        </div>
        <div>
          <div style={{color:"#F9A826", fontSize:12, fontWeight:700, marginBottom:6}}>Exam Year</div>
          <input value={nYear} onChange={e=>setNYear(e.target.value)}
            style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
            placeholder="e.g. OCT-2023"/>
        </div>
      </div>

      {/* Row 3 — Photo */}
      <div style={{marginBottom:20}}>
        <div style={{color:"#F9A826", fontSize:12, fontWeight:700, marginBottom:6}}>Photo</div>
        <label style={{display:"inline-flex", alignItems:"center", gap:8, background:`rgba(0,201,167,0.08)`, border:`1.5px dashed ${accent}`, borderRadius:10, padding:"9px 12px", cursor:"pointer"}}>
          <span>📷</span>
          <span style={{color:accent, fontWeight:700, fontSize:12}}>{nPhoto ? "✅ Selected" : "Choose File"}</span>
          <input type="file" accept="image/*" style={{display:"none"}}
            onChange={e=>{const f=e.target.files?.[0]; if(f) readFile(f, d=>setNPhoto(d));}}/>
        </label>
      </div>

      <button onClick={onSubmit}
        style={{padding:"13px 28px", border:"none", borderRadius:12, background:"linear-gradient(135deg,#f59e0b,#d97706)", color:"white", fontWeight:800, fontSize:15, cursor:"pointer"}}>
        💳 Pay ₹20 & Download PDF
      </button>
    </div>
  );
};
