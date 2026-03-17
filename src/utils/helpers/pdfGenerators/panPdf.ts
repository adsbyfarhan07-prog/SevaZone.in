// panPdf.ts
import jsPDF from "jspdf";
const panTemplate = "/assets/templates/pan.png";

export const downloadPanTemplatePDF = (data: {
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
    format: [85.6, 54]
  });

  const W = 85.6, H = 54;

  // ✅ FULL TEMPLATE (NO WHITE SPACE)
  doc.addImage(panTemplate, "PNG", 0, 0, W, H);

  // ✅ PAN NUMBER (Heading ke niche center)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(data.pNo || "XXXXXXXXXX", W / 2, 22, { align: "center" });

  // ✅ NAME
  doc.setFontSize(6);
  doc.setFont("helvetica", "bold");
  doc.text(data.pName || "", 25, 31);

  // ✅ FATHER NAME
  doc.text(data.pFather || "", 25, 39);

  // ✅ DOB
  doc.text(data.pDob || "", 25, 47);

  // ✅ PHOTO (BOX ke andar fit)
  if (data.pPhoto) {
    try {
      doc.addImage(data.pPhoto, "JPEG", 4.5, 18, 16, 20);
    } catch (e) {}
  }

  // ✅ SIGNATURE (label ke upar)
  if (data.pSign) {
    try {
      doc.addImage(data.pSign, "JPEG", 45, 43, 22, 7);
    } catch (e) {}
  }

  doc.save("pan_card.pdf");
};
