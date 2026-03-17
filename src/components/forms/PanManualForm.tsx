// PanManualForm.tsx
import React from "react";
import { readFileAsDataURL } from "../../utils/helpers/fileReader";

interface Props {
  pNo: string;
  setPNo: (val: string) => void;
  pName: string;
  setPName: (val: string) => void;
  pFather: string;
  setPFather: (val: string) => void;
  pDob: string;
  setPDob: (val: string) => void;
  pGender: string;
  setPGender: (val: string) => void;
  pPhoto: string | null;
  setPPhoto: (val: string | null) => void;
  pSign: string | null;
  setPSign: (val: string | null) => void;
  onSubmit: () => void;
  theme: any;
  backBtn: (onClick: () => void) => JSX.Element;
  setActiveSubMenu: (val: null) => void;
}

export const PanManualForm: React.FC<Props> = ({
  pNo, setPNo, pName, setPName, pFather, setPFather, pDob, setPDob,
  pGender, setPGender, pPhoto, setPPhoto, pSign, setPSign,
  onSubmit, theme, backBtn, setActiveSubMenu
}) => {
  return (
    <div className="fade-up">
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        {backBtn(() => setActiveSubMenu(null))}
        <h2 style={{ color: theme.text, fontWeight: 900, fontSize: 20 }}>🖨️ Pan Manual</h2>
      </div>

      <div style={{ background: theme.statBg, borderRadius: 16, padding: 24, maxWidth: 700 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
          
          <div>
            <div style={{ color: theme.subtext, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Pan No.</div>
            <input
              value={pNo}
              onChange={(e) => setPNo(e.target.value.toUpperCase())}
              maxLength={10}
              style={{ width: "100%", background: theme.inputBg, border: `1.5px solid ${theme.inputBorder}`, borderRadius: 10, padding: "10px 12px", color: theme.text, fontSize: 13, outline: "none" }}
              placeholder="Pan Number"
            />
          </div>

          <div>
            <div style={{ color: theme.subtext, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Name</div>
            <input
              value={pName}
              onChange={(e) => setPName(e.target.value)}
              style={{ width: "100%", background: theme.inputBg, border: `1.5px solid ${theme.inputBorder}`, borderRadius: 10, padding: "10px 12px", color: theme.text, fontSize: 13, outline: "none" }}
              placeholder="Full Name"
            />
          </div>

          <div>
            <div style={{ color: theme.subtext, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Father Name</div>
            <input
              value={pFather}
              onChange={(e) => setPFather(e.target.value)}
              style={{ width: "100%", background: theme.inputBg, border: `1.5px solid ${theme.inputBorder}`, borderRadius: 10, padding: "10px 12px", color: theme.text, fontSize: 13, outline: "none" }}
              placeholder="Father Name"
            />
          </div>

          <div>
            <div style={{ color: theme.subtext, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Date Of Birth</div>
            <input
              type="date"
              value={pDob}
              onChange={(e) => setPDob(e.target.value)}
              style={{ width: "100%", background: theme.inputBg, border: `1.5px solid ${theme.inputBorder}`, borderRadius: 10, padding: "10px 12px", color: theme.text, fontSize: 13, outline: "none" }}
            />
          </div>

        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
          
          <div>
            <div style={{ color: theme.subtext, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Gender</div>
            <select
              value={pGender}
              onChange={(e) => setPGender(e.target.value)}
              style={{ width: "100%", background: theme.inputBg, border: `1.5px solid ${theme.inputBorder}`, borderRadius: 10, padding: "10px 12px", color: theme.text, fontSize: 13, outline: "none" }}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <div style={{ color: theme.subtext, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Photo</div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, background: `rgba(0,201,167,0.08)`, border: `1.5px dashed #00C9A7`, borderRadius: 10, padding: "9px 12px", cursor: "pointer" }}>
              <span style={{ fontSize: 16 }}>📷</span>
              <span style={{ color: "#00C9A7", fontWeight: 700, fontSize: 12 }}>{pPhoto ? "✅ Selected" : "Choose File"}</span>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) readFileAsDataURL(file, (d) => { setPPhoto(d); });
                }}
              />
            </label>
          </div>

          <div>
            <div style={{ color: theme.subtext, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Signature</div>
            <div style={{ border: "1.5px solid #845EC2", borderRadius: 10, background: "rgba(132,94,194,0.06)", padding: 8 }}>
              
              <div style={{ fontSize: 11, color: "#845EC2", fontWeight: 700, marginBottom: 4 }}>✍️ Draw Signature Below</div>

              <canvas
                id="signCanvas"
                width={200}
                height={60}
                style={{
                  display: "block",
                  background: "white",
                  borderRadius: 6,
                  cursor: "crosshair",
                  border: "1px solid rgba(132,94,194,0.3)",
                  touchAction: "none"
                }}

                onMouseDown={(e) => {
                  const canvas = e.currentTarget;
                  const ctx = canvas.getContext("2d");
                  ctx!.strokeStyle = "#1a1a2e";
                  ctx!.lineWidth = 2;
                  ctx!.lineCap = "round";
                  (canvas as any)._drawing = true;
                  const rect = canvas.getBoundingClientRect();
                  ctx!.beginPath();
                  ctx!.moveTo(e.clientX - rect.left, e.clientY - rect.top);
                }}

                onMouseMove={(e) => {
                  const canvas = e.currentTarget;
                  if (!(canvas as any)._drawing) return;
                  const ctx = canvas.getContext("2d");
                  const rect = canvas.getBoundingClientRect();
                  ctx!.lineTo(e.clientX - rect.left, e.clientY - rect.top);
                  ctx!.stroke();
                }}

                onMouseUp={(e) => {
                  const canvas = e.currentTarget;
                  (canvas as any)._drawing = false;
                  setPSign(canvas.toDataURL());
                }}

                onMouseLeave={(e) => {
                  const canvas = e.currentTarget;
                  if ((canvas as any)._drawing) {
                    (canvas as any)._drawing = false;
                    setPSign(canvas.toDataURL());
                  }
                }}

                onTouchStart={(e) => {
                  e.preventDefault();
                  const canvas = e.currentTarget;
                  const ctx = canvas.getContext("2d");
                  ctx!.strokeStyle = "#1a1a2e";
                  ctx!.lineWidth = 2;
                  ctx!.lineCap = "round";
                  (canvas as any)._drawing = true;
                  const rect = canvas.getBoundingClientRect();
                  const touch = e.touches[0];
                  ctx!.beginPath();
                  ctx!.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
                }}

                onTouchMove={(e) => {
                  e.preventDefault();
                  const canvas = e.currentTarget;
                  if (!(canvas as any)._drawing) return;
                  const ctx = canvas.getContext("2d");
                  const rect = canvas.getBoundingClientRect();
                  const touch = e.touches[0];
                  ctx!.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
                  ctx!.stroke();
                }}

                onTouchEnd={(e) => {
                  e.preventDefault();
                  const canvas = e.currentTarget;
                  (canvas as any)._drawing = false;
                  setPSign(canvas.toDataURL());
                }}
              />

              <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                <button
                  type="button"
                  onClick={() => {
                    const canvas = document.getElementById("signCanvas") as HTMLCanvasElement;
                    const ctx = canvas.getContext("2d");
                    ctx!.clearRect(0, 0, canvas.width, canvas.height);
                    setPSign(null);
                  }}
                  style={{ flex: 1, padding: "5px 0", borderRadius: 7, border: "1px solid #845EC2", background: "transparent", color: "#845EC2", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                >
                  🗑 Clear
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const canvas = document.getElementById("signCanvas") as HTMLCanvasElement;
                    setPSign(canvas.toDataURL());
                  }}
                  style={{ flex: 1, padding: "5px 0", borderRadius: 7, border: "none", background: "#845EC2", color: "white", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                >
                  {pSign ? "✅ Saved" : "💾 Save"}
                </button>
              </div>

            </div>
          </div>
        </div>

        <button
          className="submit-btn"
          style={{ maxWidth: 240, background: "linear-gradient(135deg,#f59e0b,#d97706)" }}
          onClick={onSubmit}
        >
          💳 Pay ₹30 & Download PDF
        </button>

      </div>
    </div>
  );
};
