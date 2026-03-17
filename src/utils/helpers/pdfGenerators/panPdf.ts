// panPdf.ts
import jsPDF from "jspdf";

export const downloadPanTemplatePDF = (data: {
  pNo: string;
  pName: string;
  pFather: string;
  pDob: string;
  pPhoto: string | null;
  pSign: string | null;
}) => {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: [85.6, 54] });
  const W = 85.6, H = 54;

  // White background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, W, H, "F");

  // Border
  doc.setDrawColor(0);
  doc.setLineWidth(0.3);
  doc.rect(1, 1, W - 2, H - 2);

  // Header left
  doc.setFontSize(5);
  doc.setFont("helvetica", "bold");
  doc.text("आयकर विभाग", 4, 6);
  doc.text("INCOME TAX DEPARTMENT", 4, 9);

  // Header right
  doc.text("भारत सरकार", W - 4, 6, { align: "right" });
  doc.text("GOVT. OF INDIA", W - 4, 9, { align: "right" });

  // Photo
  if (data.pPhoto) {
    try { doc.addImage(data.pPhoto, "JPEG", 4, 12, 18, 22); } catch (e) {}
  } else {
    doc.setFillColor(240, 240, 240);
    doc.rect(4, 12, 18, 22, "F");
    doc.setFontSize(4);
    doc.text("Photo", 8, 23);
  }

  // Fields
  doc.setFontSize(4.5);
  doc.setFont("helvetica", "normal");
  doc.text("नाम / Name", 25, 16);
  doc.setFont("helvetica", "bold");
  doc.text(data.pName || "________", 25, 20);

  doc.setFont("helvetica", "normal");
  doc.text("पिता का नाम / Father's Name", 25, 25);
  doc.setFont("helvetica", "bold");
  doc.text(data.pFather || "________", 25, 29);

  doc.setFont("helvetica", "normal");
  doc.text("जन्म की तारीख / Date of Birth", 25, 34);
  doc.setFont("helvetica", "bold");
  doc.text(data.pDob || "________", 25, 38);

  // Signature
  doc.setFont("helvetica", "normal");
  doc.text("हस्ताक्षर / Signature", 25, 44);
  if (data.pSign) {
    try { doc.addImage(data.pSign, "JPEG", 25, 45, 30, 7); } catch (e) {}
  }

  // Footer
  doc.setFontSize(3);
  doc.setFont("helvetica", "italic");
  doc.text(
    "PAN Application Digitally Signed, Card Not Valid unless Physically Signed",
    W / 2,
    H - 3,
    { align: "center" }
  );

  doc.save("pan_template.pdf");
};
