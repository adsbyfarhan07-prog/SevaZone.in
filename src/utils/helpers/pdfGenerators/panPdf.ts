// panPdf.ts
import jsPDF from "jspdf";
import panTemplate from "../assets/templates/pan.png"; // ✅ Direct import

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
    format: [85.6, 54],
  });

  const W = 85.6;

  // ✅ Background Template
  doc.addImage(panTemplate, "PNG", 0, 0, W, 54);

  // ✅ PAN Number — heading ke neeche center mein
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(20, 20, 100);
  doc.text(data.pNo || "XXXXXXXXXX", W / 2, 22, { align: "center" });

  // ✅ Name — नाम / Name ke neeche
  doc.setFontSize(6);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 80);
  doc.text(data.pName || "", 25, 36);

  // ✅ Father Name — पिता का नाम ke neeche
  doc.text(data.pFather || "", 25, 42);

  // ✅ DOB — जन्म की तारीख ke neeche
  doc.text(data.pDob || "", 25, 47);

  // ✅ Photo — Upload Image box ke andar
  if (data.pPhoto) {
    try {
      doc.addImage(data.pPhoto, "JPEG", 4.5, 18, 16, 20);
    } catch (e) {}
  }

  // ✅ Signature — हस्ताक्षर ke upar
  if (data.pSign) {
    try {
      doc.addImage(data.pSign, "JPEG", 28, 44, 22, 7);
    } catch (e) {}
  }

  doc.save(`pan_${data.pNo || "card"}.pdf`);
};
