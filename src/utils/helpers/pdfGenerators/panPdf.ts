// panPdf.ts
import jsPDF from "jspdf";
import panTemplate from "../../assets/templates/pan.png";

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

  // ✅ Background — pan.png
  doc.addImage(panTemplate, "PNG", 0, 0, W, 54);

  // ✅ PAN Number — center mein heading ke neeche
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(20, 20, 100);
  doc.text(data.pNo || "XXXXXXXXXX", W / 2, 22, { align: "center" });

  // ✅ Name
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 80);
  doc.text(data.pName || "", 25, 36);

  // ✅ Father Name
  doc.text(data.pFather || "", 25, 42);

  // ✅ DOB
  doc.text(data.pDob || "", 25, 47);

  // ✅ Photo
  if (data.pPhoto) {
    try {
      doc.addImage(data.pPhoto, "JPEG", 4.5, 18, 16, 20);
    } catch (e) {}
  }

  // ✅ Signature
  if (data.pSign) {
    try {
      doc.addImage(data.pSign, "PNG", 28, 44, 22, 7);
    } catch (e) {}
  }

  doc.save(`pan_${data.pNo || "card"}.pdf`);
};
