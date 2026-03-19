import jsPDF from "jspdf";

export const downloadVoterPDF = (data: {
  vEpic: string;
  vName: string;
  vPhoto: string | null;
}) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [85.6, 54]
  });

  const W = 85.6, H = 54;

  // Background
  doc.setFillColor(230, 180, 160);
  doc.rect(0, 0, W, H, "F");

  // Dotted border
  doc.setDrawColor(180, 80, 40);
  doc.setLineWidth(0.5);
  doc.setLineDashPattern([1, 1], 0);
  doc.rect(2, 2, W - 4, H - 4);
  doc.setLineDashPattern([], 0);

  // Header
  doc.setFillColor(200, 60, 30);
  doc.rect(3, 3, W - 6, 8, "F");
  doc.setFontSize(5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("भारत निर्वाचन आयोग", W / 2, 6, { align: "center" });
  doc.text("ELECTION COMMISSION OF INDIA", W / 2, 9, { align: "center" });

  // EPIC watermark
  doc.setTextColor(220, 150, 130);
  doc.setFontSize(7);
  for (let i = 0; i < 5; i++) doc.text("EPIC", 3, 15 + i * 8);

  // Photo box
  if (data.vPhoto) {
    try { doc.addImage(data.vPhoto, "JPEG", 4, 12, 18, 22); } catch (e) {}
  } else {
    doc.setFillColor(200, 160, 140);
    doc.rect(4, 12, 18, 22, "F");
    doc.setTextColor(100, 40, 20);
    doc.setFontSize(5);
    doc.text("Photo", 7, 24);
  }

  // Card title
  doc.setTextColor(255, 200, 0);
  doc.setFontSize(5);
  doc.setFont("helvetica", "bold");
  doc.text("मतदाता फोटो पहचान पत्र - ELECTOR PHOTO IDENTITY CARD", 24, 14, { maxWidth: 55 });

  // EPIC No
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.text(data.vEpic || "EPIC NO", 24, 20);

  // Details
  doc.setFontSize(5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 20, 10);
  doc.text("नाम / Name", 4, 37);
  doc.setFont("helvetica", "bold");
  doc.text(": " + (data.vName || ""), 22, 37);
  doc.setFont("helvetica", "normal");
  doc.text("पति/पिता का नाम", 4, 41);
  doc.setFont("helvetica", "bold");
  doc.text(": ", 22, 41);

  // Date
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5);
  doc.text("Date: " + new Date().toLocaleDateString("en-IN"), 4, 50);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(4);
  doc.setTextColor(180, 60, 20);
  doc.text("निर्वाचक रजिस्ट्रीकरण अधिकारी / Electoral Registration Officer", 24, 50, { maxWidth: 55 });

  doc.save("voter_" + (data.vEpic || "card") + ".pdf");
};
