// NiosForm.tsx
import React from "react";
import { readFileAsDataURL } from "../../utils/helpers/fileReader";

interface Props {
  nName: string;
  setNName: (val: string) => void;
  nFather: string;
  setNFather: (val: string) => void;
  nMother: string;
  setNMother: (val: string) => void;
  nDob: string;
  setNDob: (val: string) => void;
  nYear: string;
  setNYear: (val: string) => void;
  nEnrolment?: string;
  setNEnrolment?: (val: string) => void;
  nPhoto: string | null;
  setNPhoto: (val: string | null) => void;
  onSubmit: () => void;
  theme: any;
  backBtn: (onClick: () => void) => JSX.Element;
  setActiveSubMenu: (val: null) => void;
}

export const NiosForm: React.FC<Props> = ({
  nName, setNName,
  nFather, setNFather,
  nMother, setNMother,
  nDob, setNDob,
  nYear, setNYear,
  nEnrolment, setNEnrolment,
  nPhoto, setNPhoto,
  onSubmit,
  theme,
  backBtn,
  setActiveSubMenu
}) => {
  return (
    <div className="fade-up">
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        {backBtn(() => setActiveSubMenu(null))}
        <h2 style={{ color: theme.text, fontWeight: 900, fontSize: 20 }}>📄 NIOS Certificate Manual</h2>
      </div>
      <div style={{ background: theme.statBg, borderRadius: 16, padding: 24, maxWidth: 600 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
          <div>
            <div style={{ color: "#F9A826", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>NAME</div>
            <input
              value={nName}
              onChange={(e) => setNName(e.target.value)}
              style={{
                width: "100%",
                background: theme.inputBg,
                border: `1.5px solid ${theme.inputBorder}`,
                borderRadius: 10,
                padding: "10px 12px",
                color: theme.text,
                fontSize: 13,
                outline: "none",
              }}
              placeholder="Name in English"
            />
          </div>
          <div>
            <div style={{ color: "#F9A826", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Father Name</div>
            <input
              value={nFather}
              onChange={(e) => setNFather(e.target.value)}
              style={{
                width: "100%",
                background: theme.inputBg,
                border: `1.5px solid ${theme.inputBorder}`,
                borderRadius: 10,
                padding: "10px 12px",
                color: theme.text,
                fontSize: 13,
                outline: "none",
              }}
              placeholder="Father Name"
            />
          </div>
          <div>
            <div style={{ color: "#F9A826", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Mother's Name</div>
            <input
              value={nMother}
              onChange={(e) => setNMother(e.target.value)}
              style={{
                width: "100%",
                background: theme.inputBg,
                border: `1.5px solid ${theme.inputBorder}`,
                borderRadius: 10,
                padding: "10px 12px",
                color: theme.text,
                fontSize: 13,
                outline: "none",
              }}
              placeholder="Mother's Name"
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
          <div>
            <div style={{ color: "#F9A826", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>DOB</div>
            <input
              type="date"
              value={nDob}
              onChange={(e) => setNDob(e.target.value)}
              style={{
                width: "100%",
                background: theme.inputBg,
                border: `1.5px solid ${theme.inputBorder}`,
                borderRadius: 10,
                padding: "10px 12px",
                color: theme.text,
                fontSize: 13,
                outline: "none",
              }}
            />
          </div>
          <div>
            <div style={{ color: "#F9A826", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Examination Year</div>
            <input
              value={nYear}
              onChange={(e) => setNYear(e.target.value)}
              style={{
                width: "100%",
                background: theme.inputBg,
                border: `1.5px solid ${theme.inputBorder}`,
                borderRadius: 10,
                padding: "10px 12px",
                color: theme.text,
                fontSize: 13,
                outline: "none",
              }}
              placeholder="e.g., OCT-2024"
            />
          </div>
          {setNEnrolment && (
            <div>
              <div style={{ color: "#F9A826", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Enrolment No.</div>
              <input
                value={nEnrolment}
                onChange={(e) => setNEnrolment(e.target.value)}
                style={{
                  width: "100%",
                  background: theme.inputBg,
                  border: `1.5px solid ${theme.inputBorder}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  color: theme.text,
                  fontSize: 13,
                  outline: "none",
                }}
                placeholder="Optional"
              />
            </div>
          )}
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ color: "#F9A826", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Photo</div>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `rgba(0,201,167,0.08)`,
              border: `1.5px dashed #00C9A7`,
              borderRadius: 10,
              padding: "9px 12px",
              cursor: "pointer",
            }}
          >
            <span>📷</span>
            <span style={{ color: "#00C9A7", fontWeight: 700, fontSize: 12 }}>
              {nPhoto ? "✅ Selected" : "Choose File"}
            </span>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) readFileAsDataURL(file, (d) => setNPhoto(d));
              }}
            />
          </label>
        </div>

        <button
          className="submit-btn"
          style={{ maxWidth: 240, background: "linear-gradient(135deg,#f59e0b,#d97706)" }}
          onClick={onSubmit}
        >
          💳 Pay ₹20 & Download PDF
        </button>
      </div>
    </div>
  );
};
