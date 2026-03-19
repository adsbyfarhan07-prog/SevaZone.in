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

  // ✅ PAN Number
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 15, 90);
  doc.text(data.pNo || "", 44, 26);

  // ✅ Name
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 15, 90);
  doc.text(data.pName || "", 5, 40);

  // ✅ Father Name
  doc.text(data.pFather || "", 5, 45);

  // ✅ DOB
  doc.text(data.pDob || "", 5, 50);

  // ✅ Photo
  if (data.pPhoto) {
    try {
      doc.addImage(data.pPhoto, "JPEG", 5, 15, 17, 21);
    } catch (e) {}
  }

  // ✅ Signature
  if (data.pSign) {
    try {
      doc.addImage(data.pSign, "PNG", 28, 44, 20, 6);
    } catch (e) {}
  }

  doc.save(`pan_${data.pNo || "card"}.pdf`);
};
