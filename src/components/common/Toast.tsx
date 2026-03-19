import React from "react";

interface Props {
  toast: { msg: string; type: string } | null;
}

export const Toast: React.FC<Props> = ({ toast }) => {
  if (!toast) return null;
  return (
    <div className="toast-box" style={{
      background: toast.type === "error"
        ? "linear-gradient(135deg,#ff5252,#c62828)"
        : "linear-gradient(135deg,#00C9A7,#00695C)",
      color: "white"
    }}>
      {toast.msg}
    </div>
  );
};
