import React from "react";

interface Props {
  status: string;
}

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const map: Record<string, [string, string]> = {
    Success: ["rgba(0,201,167,0.15)", "#00C9A7"],
    Pending: ["rgba(249,168,38,0.15)", "#F9A826"],
    Failed:  ["rgba(255,107,107,0.15)", "#FF6B6B"],
  };
  const [bg, color] = map[status] || ["#eee", "#333"];
  return (
    <span style={{
      background: bg,
      color,
      padding: "4px 10px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 700
    }}>
      {status}
    </span>
  );
};
