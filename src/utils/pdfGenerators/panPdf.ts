 import { jsPDF } from "jspdf";

export const generatePanPDF = (data: any) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [85.6, 54],
  });

  // Background color (light blue)
  doc.setFillColor(210, 235, 255);
  doc.rect(0, 0, 85.6, 54, "F");

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6);
  doc.text("INCOME TAX DEPARTMENT", 5, 6);
  doc.text("GOVT. OF INDIA", 60, 6);

  // User details
  doc.setFontSize(7);
  doc.text(data.name || "YOUR NAME", 5, 20);
  doc.text(data.father || "FATHER NAME", 5, 26);
  doc.text(data.dob || "01/01/2000", 5, 32);

  // PAN number
  doc.setFontSize(10);
  doc.text(data.pan || "ABCDE1234F", 5, 40);

  doc.save("pan_card.pdf");
};
