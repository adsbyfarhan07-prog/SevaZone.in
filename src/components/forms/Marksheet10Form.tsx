// Marksheet10Form.tsx
import React from "react";
import { readFileAsDataURL } from "../../utils/helpers/fileReader";

interface Props {
  // All state fields for 10th marksheet
  m10: any; // Ideally you'd define a proper type
  setM10: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: () => void;
  theme: any;
  backBtn: (onClick: () => void) => JSX.Element;
  setActiveSubMenu: (val: null) => void;
}

export const Marksheet10Form: React.FC<Props> = ({
  m10,
  setM10,
  onSubmit,
  theme,
  backBtn,
  setActiveSubMenu
}) => {
  // Helper to update nested subject fields
  const updateSubject = (index: number, field: string, value: string) => {
    const newSubjects = [...m10.subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setM10({ ...m10, subjects: newSubjects });
  };

  return (
    <div className="fade-up">
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        {backBtn(() => setActiveSubMenu(null))}
        <h2 style={{ color: theme.text, fontWeight: 900, fontSize: 20 }}>📝 10th Marksheet Manual</h2>
      </div>
      <div style={{ background: theme.statBg, borderRadius: 16, padding: 24, maxWidth: 700 }}>
        {/* Row 1: Name in English/Hindi, Mother, Father */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
          {[
            { k: "nameEn", label: "Name In English", ph: "Name" },
            { k: "nameHi", label: "Name In Hindi", ph: "नाम" },
            { k: "motherEn", label: "Mother Name In English", ph: "Mother Name" },
            { k: "motherHi", label: "Mother Name In Hindi", ph: "माता का नाम" },
            { k: "fatherEn", label: "Father Name In English", ph: "Father Name" },
            { k: "fatherHi", label: "Father Name In Hindi", ph: "पिता का नाम" },
          ].map((f, i) => (
            <div key={i}>
              <div style={{ color: "#F9A826", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{f.label}</div>
              <input
                value={m10[f.k] || ""}
                onChange={(e) => setM10({ ...m10, [f.k]: e.target.value })}
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
                placeholder={f.ph}
              />
            </div>
          ))}
        </div>

        {/* Row 2: School Name English/Hindi */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          {[
            { k: "schoolEn", label: "School Full Name In English", ph: "School Name" },
            { k: "schoolHi", label: "School Full Name In Hindi", ph: "विद्यालय का नाम" },
          ].map((f, i) => (
            <div key={i}>
              <div style={{ color: "#F9A826", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{f.label}</div>
              <input
                value={m10[f.k] || ""}
                onChange={(e) => setM10({ ...m10, [f.k]: e.target.value })}
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
                placeholder={f.ph}
              />
            </div>
          ))}
        </div>

        {/* Subjects (6 subjects) */}
        {m10.subjects?.map((sub: any, i: number) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div>
              <div style={{ color: "#F9A826", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>SUBJECT</div>
              <input
                value={sub.s || ""}
                onChange={(e) => updateSubject(i, "s", e.target.value)}
                style={{
                  width: "100%",
                  background: theme.inputBg,
                  border: `1.5px solid ${theme.inputBorder}`,
                  borderRadius: 8,
                  padding: "8px 10px",
                  color: theme.text,
                  fontSize: 12,
                  outline: "none",
                }}
                placeholder={`Subject ${i + 1}`}
              />
            </div>
            <div>
              <div style={{ color: "#F9A826", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>MARKS</div>
              <input
                value={sub.m || ""}
                onChange={(e) => updateSubject(i, "m", e.target.value)}
                style={{
                  width: "100%",
                  background: theme.inputBg,
                  border: `1.5px solid ${theme.inputBorder}`,
                  borderRadius: 8,
                  padding: "8px 10px",
                  color: theme.text,
                  fontSize: 12,
                  outline: "none",
                }}
                placeholder="0/100"
              />
            </div>
            <div>
              <div style={{ color: "#F9A826", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>TOTAL MARKS</div>
              <input
                value={sub.t || ""}
                onChange={(e) => updateSubject(i, "t", e.target.value)}
                style={{
                  width: "100%",
                  background: theme.inputBg,
                  border: `1.5px solid ${theme.inputBorder}`,
                  borderRadius: 8,
                  padding: "8px 10px",
                  color: theme.text,
                  fontSize: 12,
                  outline: "none",
                }}
                placeholder="100"
              />
            </div>
            <div>
              <div style={{ color: "#F9A826", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>GRADE</div>
              <input
                value={sub.g || ""}
                onChange={(e) => updateSubject(i, "g", e.target.value)}
                style={{
                  width: "100%",
                  background: theme.inputBg,
                  border: `1.5px solid ${theme.inputBorder}`,
                  borderRadius: 8,
                  padding: "8px 10px",
                  color: theme.text,
                  fontSize: 12,
                  outline: "none",
                }}
                placeholder="A"
              />
            </div>
          </div>
        ))}

        {/* Other fields: grand total, year, date, district, sr, roll, code, cert */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14, marginBottom: 14, marginTop: 10 }}>
          {[
            { k: "grand", label: "Grand Total", ph: "373/500" },
            { k: "year", label: "Pass Year", ph: "2024" },
            { k: "date", label: "Result Date", ph: "31ST JULY 2024" },
            { k: "district", label: "District", ph: "District" },
            { k: "sr", label: "SR No.", ph: "1333386" },
            { k: "roll", label: "Roll Number", ph: "212082801" },
            { k: "code", label: "School Code", ph: "55/15126/211" },
            { k: "cert", label: "Certificate No", ph: "55879061" },
          ].map((f, i) => (
            <div key={i}>
              <div style={{ color: "#F9A826", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{f.label}</div>
              <input
                value={m10[f.k] || ""}
                onChange={(e) => setM10({ ...m10, [f.k]: e.target.value })}
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
                placeholder={f.ph}
              />
            </div>
          ))}
        </div>

        {/* Photo upload */}
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
              {m10.photo ? "✅ Selected" : "Choose File"}
            </span>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) readFileAsDataURL(file, (d) => setM10({ ...m10, photo: d }));
              }}
            />
          </label>
        </div>

        {/* Submit button */}
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
