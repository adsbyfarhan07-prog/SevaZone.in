import React from "react";

interface Props {
  onSubmit: () => void;
  theme: any;
  accent: string;
}

export const AadharManualForm: React.FC<Props> = ({
  onSubmit, theme, accent
}) => {

  return (
    <div style={{background: theme.statBg, borderRadius: 16, padding: 24, maxWidth: 700}}>

      {/* Row 1 */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:14}}>
        {[
          {label:"Aadhar Card No.", ph:"Aadhar No...", type:"tel"},
          {label:"Name", ph:"Example: Raju Kumar"},
          {label:"Father Name", ph:"Example: Shyam Singh"},
        ].map((f, i) => (
          <div key={i}>
            <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>{f.label}</div>
            <input style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
              placeholder={f.ph} type={f.type || "text"}/>
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:14}}>
        {[
          {label:"House No", ph:"House No"},
          {label:"Gali, Locality", ph:"Gali, Locality, Panchayat"},
          {label:"Post Office", ph:"Post Office"},
        ].map((f, i) => (
          <div key={i}>
            <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>{f.label}</div>
            <input style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
              placeholder={f.ph}/>
          </div>
        ))}
      </div>

      {/* Row 3 */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:14}}>
        {[
          {label:"State", ph:"State"},
          {label:"City", ph:"City"},
          {label:"Pin Code", ph:"Pincode", type:"tel"},
        ].map((f, i) => (
          <div key={i}>
            <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>{f.label}</div>
            <input style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
              placeholder={f.ph} type={f.type || "text"}/>
          </div>
        ))}
      </div>

      {/* Row 4 */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:14}}>
        <div>
          <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>Date Of Birth</div>
          <input type="date" style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}/>
        </div>
        <div>
          <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>Select Gender</div>
          <select style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}>
            <option value="">GENDER</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>Select Image</div>
          <label style={{display:"inline-flex", alignItems:"center", gap:10, background:`rgba(0,201,167,0.1)`, border:`1.5px dashed ${accent}`, borderRadius:10, padding:"10px 18px", cursor:"pointer"}}>
            <span style={{fontSize:20}}>📷</span>
            <span style={{color:accent, fontWeight:700, fontSize:13}}>Choose File</span>
            <input type="file" accept="image/*" style={{display:"none"}}/>
          </label>
        </div>
      </div>

      {/* Row 5 */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 2fr", gap:14, marginBottom:14}}>
        <div>
          <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>Gender Local</div>
          <input style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
            placeholder="Gender Local"/>
        </div>
        <div>
          <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>Address</div>
          <textarea style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none", resize:"none", height:70}}
            placeholder="Full Address"/>
        </div>
      </div>

      {/* Row 6 */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:24}}>
        <div>
          <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>Select Local Language</div>
          <select style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}>
            <option value="">SELECT</option>
            <option>Hindi</option>
            <option>English</option>
            <option>Punjabi</option>
            <option>Bengali</option>
            <option>Tamil</option>
            <option>Telugu</option>
            <option>Marathi</option>
            <option>Gujarati</option>
            <option>Kannada</option>
            <option>Malayalam</option>
            <option>Odia</option>
            <option>Urdu</option>
          </select>
        </div>
        <div>
          <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>Name (Local Language)</div>
          <input style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
            placeholder="Local Name"/>
        </div>
        <div>
          <div style={{color:theme.subtext, fontSize:12, fontWeight:700, marginBottom:6}}>Address (Local Language)</div>
          <input style={{width:"100%", background:theme.inputBg, border:`1.5px solid ${theme.inputBorder}`, borderRadius:10, padding:"10px 12px", color:theme.text, fontSize:13, outline:"none"}}
            placeholder="Local Address"/>
        </div>
      </div>

      <button onClick={onSubmit}
        style={{padding:"13px 28px", border:"none", borderRadius:12, background:"linear-gradient(135deg,#f59e0b,#d97706)", color:"white", fontWeight:800, fontSize:15, cursor:"pointer"}}>
        💳 Pay ₹10 & Submit
      </button>
    </div>
  );
};
