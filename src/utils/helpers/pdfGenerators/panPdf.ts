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

  // ✅ Background
  try {
    const base64 = await loadImageAsBase64("/assets/templates/pan.png");
    doc.addImage(base64, "PNG", 0, 0, W, H);
  } catch (e) {
    console.error("Template load failed:", e);
  }

  // ✅ Header - आयकर विभाग
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(120, 20, 60);
  doc.text("vk;dj foHkkx", W / 2 - 8, 7, { align: "center" });

  // ✅ INCOME TAX DEPARTMENT
  doc.setFontSize(7.5);
  doc.setTextColor(120, 20, 60);
  doc.text("INCOME TAX DEPARTMENT", W / 2 - 8, 11.5, { align: "center" });

  // ✅ भारत सरकार
  doc.setFontSize(11);
  doc.text("Hkkjr ljdkj", W - 18, 7, { align: "center" });

  // ✅ GOVT. OF INDIA
  doc.setFontSize(7.5);
  doc.text("GOVT. OF INDIA", W - 18, 11.5, { align: "center" });

  // ✅ Dashed photo box border
  doc.setDrawColor(180, 180, 210);
  doc.setLineWidth(0.3);
  doc.setLineDashPattern([1, 1], 0);
  doc.rect(2.5, 14, 22, 30);
  doc.setLineDashPattern([], 0);

  // ✅ User Photo
  if (data.pPhoto) {
    try {
      doc.addImage(data.pPhoto, "JPEG", 2.5, 14, 22, 30);
    } catch (e) {}
  }

  // ✅ स्थायी लेखा संख्या कार्ड
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(30, 30, 140);
  doc.text("LFkk;h ys[kk la[;k dkMZ", 27, 18);

  // ✅ Permanent Account Number Card
  doc.setFontSize(5.5);
  doc.setTextColor(30, 30, 140);
  doc.text("Permanent Account Number Card", 27, 22);

  // ✅ PAN Number - bold, large
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 120);
  doc.text(data.pNo || "", 27, 28);

  // ✅ Divider line
  doc.setDrawColor(100, 100, 180);
  doc.setLineWidth(0.2);
  doc.line(2.5, 46, 60, 46);

  // ✅ नाम / Name label
  doc.setFontSize(5.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(30, 30, 140);
  doc.text("uke / Name", 2.5, 38);

  // ✅ Name value
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(10, 10, 80);
  doc.text(data.pName || "", 2.5, 41.5);

  // ✅ पिता का नाम / Father's Name label
  doc.setFontSize(5.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(30, 30, 140);
  doc.text("firk dk uke / Father's Name", 2.5, 44.5);

  // ✅ Father value
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(10, 10, 80);
  doc.text(data.pFather || "", 2.5, 47.5);

  // ✅ जन्म की तारीख / Date of Birth label
  doc.setFontSize(5.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(30, 30, 140);
  doc.text("tUe dh rkjh[k / Date of Birth", 2.5, 50.5);

  // ✅ DOB value
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(10, 10, 80);
  doc.text(formatDate(data.pDob) || "", 2.5, 53.5);

  // ✅ Signature
  if (data.pSign) {
    try {
      doc.addImage(data.pSign, "PNG", 27, 44, 18, 7);
    } catch (e) {}
  }

  // ✅ हस्ताक्षर / Signature label
  doc.setFontSize(5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(30, 30, 140);
  doc.text("gLrk{kj / Signature", 30, 52.5);

  doc.save(`pan_${data.pNo || "card"}.pdf`);
};
        
