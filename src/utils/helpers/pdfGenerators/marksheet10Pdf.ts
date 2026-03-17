// marksheet10Pdf.ts
import jsPDF from "jspdf";

export const downloadMarksheet10PDF = (data: any) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210, ml = 15, mr = 195;

  // Border
  doc.setDrawColor(0);
  doc.setLineWidth(1.5);
  doc.rect(5, 5, 200, 287);
  doc.setLineWidth(0.5);
  doc.rect(7, 7, 196, 283);

  // Top details
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`क्रमांक Serial No. : ${data.sr || ""}`, ml, 14);
  doc.text(`नामांकन संख्या Enrolment No. : ${data.roll || ""}`, 120, 14);
  doc.text(`अनुक्रमांक Roll No. : ${data.roll || ""}`, 120, 19);

  // Photo
  if (data.photo) {
    try { doc.addImage(data.photo, "JPEG", 162, 10, 30, 35); } catch (e) {}
  } else {
    doc.rect(162, 10, 30, 35);
    doc.setFontSize(7);
    doc.text("Photo", 174, 29);
  }

  // Board Header
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(data.schoolHi || "हरियाणा विद्यालय शिक्षा बोर्ड", W / 2, 26, { align: "center" });
  doc.setFontSize(13);
  doc.text("Board of School Education Haryana", W / 2, 33, { align: "center" });
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("(ISO 9001 : 2015 CERTIFIED)", W / 2, 38, { align: "center" });

  doc.line(ml, 40, mr, 40);

  // Exam title
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("माध्यमिक परीक्षा", W / 2, 47, { align: "center" });
  doc.text("SECONDARY EXAMINATION", W / 2, 54, { align: "center" });
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(
    "योग्यता प्रमाण-पत्र सह अंकतालिका / Certificate of Qualification cum Mark Sheet",
    W / 2,
    60,
    { align: "center" }
  );
  doc.line(ml, 62, mr, 62);

  // Student details
  let y = 69;
  doc.setFontSize(10);
  doc.text("प्रमाणित किया जाता है कि", ml, y);
  doc.text("This is to certify that :", ml, y + 5);
  doc.setFont("helvetica", "bold");
  doc.text(data.nameEn || "", 80, y + 5);
  doc.setFont("helvetica", "normal");
  doc.text("पिता का नाम श्री / Father's Name Sh.", ml, y + 12);
  doc.setFont("helvetica", "bold");
  doc.text(data.fatherEn || "", 80, y + 12);
  doc.setFont("helvetica", "normal");
  doc.text("माता का नाम सुश्री / Mother's Name Ms.", ml, y + 19);
  doc.setFont("helvetica", "bold");
  doc.text(data.motherEn || "", 80, y + 19);
  doc.setFont("helvetica", "normal");
  doc.text("जन्म तिथि / Date of Birth :", ml, y + 26);
  doc.setFont("helvetica", "bold");
  doc.text(data.date || "", 80, y + 26);
  doc.setFont("helvetica", "normal");
  doc.text("विद्यालय का नाम / Name of School जिला / District :", ml, y + 33);
  doc.setFont("helvetica", "bold");
  doc.text(data.schoolEn || "", ml, y + 40);
  doc.setFont("helvetica", "normal");

  y += 50;
  doc.setFontSize(9);
  doc.text(
    `बोर्ड द्वारा आयोजित माध्यमिक परीक्षा में प्रविष्ट हुआ / has appeared in Secondary Examination held in ${data.year || ""}`,
    ml,
    y
  );
  y += 14;
  doc.line(ml, y, mr, y);

  // Table header
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("प्राप्तांक / Marks Obtained  परिणाम / Result", W / 2, y + 7, { align: "center" });
  y += 10;

  // Table columns
  const cols = [ml, 30, 100, 130, 155, 172, 187];
  const headers = [
    "क्रमांक\nSr.No.",
    "विषय / Subject",
    "प्राप्तांक\nMarks",
    "न्यूनतम\nउत्तीर्ण\nMin Pass",
    "अधिकतम\nअंक\nMax",
    "श्रेणी\nGrade",
    "श्रेणी अंक\nGrade Point",
  ];

  doc.setLineWidth(0.4);
  doc.rect(ml, y, mr - ml, 14);
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  headers.forEach((h, i) => {
    if (i < headers.length - 1) doc.line(cols[i + 1], y, cols[i + 1], y + 14);
    const lines = h.split("\n");
    lines.forEach((l, li) => doc.text(l, cols[i] + 1, y + 4 + li * 4));
  });

  y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  data.subjects?.forEach((sub: any, i: number) => {
    const rowH = 9;
    doc.rect(ml, y, mr - ml, rowH);
    cols.slice(1).forEach((c) => doc.line(c, y, c, y + rowH));
    doc.text(String(i + 1), ml + 2, y + 6);
    doc.text(sub.s || "", 31, y + 6);
    doc.text(sub.m || "", 104, y + 6);
    doc.text("33", 134, y + 6);
    doc.text(sub.t || "100", 158, y + 6);
    doc.text(sub.g || "", 174, y + 6);
    doc.text("-", 188, y + 6); // grade point
    y += rowH;
  });

  // Total row
  doc.rect(ml, y, mr - ml, 10);
  doc.setFont("helvetica", "bold");
  doc.text("कुल योग / Total Marks", ml + 2, y + 7);
  doc.text(data.grand || "", 104, y + 7);
  doc.text("500", 158, y + 7);
  y += 18;

  // GPA
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("General Awareness & Life Skills Grade :  VERY GOOD", ml, y);
  doc.text("Co-Curricular Activity Grade :  A", ml, y + 7);
  y += 20;
  doc.line(ml, y, mr, y);
  y += 8;

  // Footer
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(data.district || "DISTRICT", ml, y);
  doc.setFont("helvetica", "normal");
  doc.text(`दिनांक Dated :  ${data.date || ""}`, ml, y + 8);
  doc.text(`जारी करने की तिथि / Issued on Dated : ${data.date || ""}`, ml, y + 16);
  doc.text("सचिव / SECRETARY", 155, y + 16);

  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text("Generated by SevaZone | Support: +91 8307950410", W / 2, 288, { align: "center" });

  doc.save(`marksheet_10_${data.roll || "manual"}.pdf`);
};
