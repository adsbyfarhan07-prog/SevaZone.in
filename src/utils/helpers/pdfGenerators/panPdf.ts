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

  // ✅ Background Template
  try {
    const base64 = await loadImageAsBase64("/assets/templates/pan.png");
    doc.addImage(base64, "PNG", 0, 0, W, H);
  } catch (e) {
    console.error("Template load failed:", e);
  }

  // ✅ Photo - exact dashed box
  // Box: left=2.5mm, top=8.5mm, right=27.1mm, bottom=45.7mm
  if (data.pPhoto) {
    try {
      doc.addImage(data.pPhoto, "JPEG", 2.5, 8.5, 24.6, 37.2);
    } catch (e) {}
  }

  // ✅ PAN Number - below "Permanent Account Number Card"
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(20, 20, 100);
  doc.text(data.pNo || "", W / 2, 25.0, { align: "center" });

  // ✅ Name - Block 1 ends at 36.3mm → value at 38.3mm
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 80);
  doc.text(data.pName || "", 2.5, 38.3);

  // ✅ Father Name - Block 2 ends at 40.4mm → value at 42.4mm
  doc.text(data.pFather || "", 2.5, 42.4);

  // ✅ DOB - Block 3+4 ends at 47.5mm → value at 49.5mm
  doc.text(formatDate(data.pDob), 2.5, 49.5);

  // ✅ Signature - below DOB, above "हस्ताक्षर"
  if (data.pSign) {
    try {
      doc.addImage(data.pSign, "PNG", 28.0, 44.0, 15.0, 6.0);
    } catch (e) {}
  }

  doc.save(`pan_${data.pNo || "card"}.pdf`);
};
    
