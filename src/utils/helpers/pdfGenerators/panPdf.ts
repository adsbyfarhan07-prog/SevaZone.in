import jsPDF from "jspdf";

const loadImageAsBase64 = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx!.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = url;
  });
};

const formatDate = (dateStr: string): string => {
  if (!dateStr) return "";
  if (dateStr.includes("/")) return dateStr;
  const parts = dateStr.split("-");
  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  return dateStr;
};

export const downloadPanTemplatePDF = async (data: {
  pNo: string;
  pName: string;
  pFather: string;
  pDob: string;
  pPhoto: string | null;
  pSign: string | null;
}) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [85.6, 54],
  });

  const W = 85.6;
  const H = 54;

  // ✅ Template Background
  try {
    const base64 = await loadImageAsBase64("/assets/templates/pan.png");
    doc.addImage(base64, "PNG", 0, 0, W, H);
  } catch (e) {
    console.error("Template load failed:", e);
  }

  // ✅ PHOTO (perfect fit inside box)
  if (data.pPhoto) {
    try {
      doc.addImage(data.pPhoto, "JPEG", 3.0, 9.0, 24.0, 36.0);
    } catch (e) {}
  }

  // ✅ PAN NUMBER (center perfect)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(20, 20, 100);
  doc.text(data.pNo || "", W / 2, 26.5, { align: "center" });

  // ✅ TEXT SETTINGS
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 80);

  // ✅ NAME
  doc.text(data.pName || "", 30.0, 38.5);

  // ✅ FATHER NAME
  doc.text(data.pFather || "", 30.0, 43.0);

  // ✅ DOB
  doc.text(formatDate(data.pDob), 30.0, 48.5);

  // ✅ SIGNATURE (above label perfect)
  if (data.pSign) {
    try {
      doc.addImage(data.pSign, "PNG", 30.0, 44.5, 15.0, 6.0);
    } catch (e) {}
  }

  doc.save(`pan_${data.pNo || "card"}.pdf`);
};
