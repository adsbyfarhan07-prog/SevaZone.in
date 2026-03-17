// HaryanaDomicileForm.tsx
import React from "react";
import { readFileAsDataURL } from "../../utils/helpers/fileReader";

interface Props {
  hy: any;
  setHy: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: () => void;
  theme: any;
  backBtn: (onClick: () => void) => JSX.Element;
  setActiveSubMenu: (val: null) => void;
}

export const HaryanaDomicileForm: React.FC<Props> = ({
  hy,
  setHy,
  onSubmit,
  theme,
  backBtn,
  setActiveSubMenu
}) => {
  const fields = [
    { k: "name", label: "NAME", ph: "Name" },
    { k: "father", label: "Father", ph: "Father Name" },
    { k: "place", label: "Place", ph: "Place" },
    { k: "mother", label: "Mother Name", ph: "Mother Name" },
    { k: "house", label: "House No.", ph: "House no" },
    { k: "tahsil", label: "Tahsil Name", ph: "Tahsil Name" },
    { k: "district", label: "District", ph: "District" },
    { k: "pin", label: "Pin Code", ph: "Pin Code" },
    { k: "landmark", label: "Landmark Name", ph: "Landmark Name" },
    { k: "vill", label: "Vill / Town Name", ph: "Vill / Town Name" },
    { k: "town", label: "Town Name", ph: "Town Name" },
  ];

  return (
    <div className="fade-up">
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        {backBtn(() => setActiveSubMenu(null))}
        <h2 style={{ color: theme.text, fontWeight: 900, fontSize: 20 }}>🏠 Haryana Resident Manual</h2>
      </div>
      <div style={{ background: theme.statBg, borderRadius: 16, padding: 24, maxWidth: 600 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
          {fields.map((f, i) => (
            <div key={i}>
              <div style={{ color: "#F9A826", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{f.label}</div>
              <input
                value={hy[f.k] || ""}
                onChange={(e) => setHy({ ...hy, [f.k]: e.target.value })}
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
          <div>
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
                {hy.photo ? "✅ Selected" : "Choose File"}
              </span>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) readFileAsDataURL(file, (d) => setHy({ ...hy, photo: d }));
                }}
              />
            </label>
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
