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

  // Background Template
  try {
    const base64 = await loadImageAsBase64("/assets/templates/pan.png");
    doc.addImage(base64, "PNG", 0, 0, W, H);
  } catch (e) {
    console.error("Template load failed:", e);
  }

  // User Photo - inside dashed box
  if (data.pPhoto) {
    try {
      doc.addImage(data.pPhoto, "JPEG", 11.1, 11.8, 14.6, 27.1);
    } catch (e) {}
  }

  // PAN Number - center below heading
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(20, 20, 100);
  doc.text(data.pNo || "", W / 2, 23.2, { align: "center" });

  // Name - below naam label
  doc.setFontSize(6);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 80);
  doc.text(data.pName || "", 11.1, 37.8);

  // Father Name
  doc.text(data.pFather || "", 11.1, 42.7);

  // DOB - formatted DD/MM/YYYY
  doc.text(formatDate(data.pDob), 11.1, 48.6);

  // Signature
  if (data.pSign) {
    try {
      doc.addImage(data.pSign, "PNG", 29.6, 44, 14.8, 6);
    } catch (e) {}
  }

  doc.save(`pan_${data.pNo || "card"}.pdf`);
};
    
