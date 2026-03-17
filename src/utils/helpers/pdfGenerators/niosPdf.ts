// niosPdf.ts
import jsPDF from "jspdf";

export const downloadNiosPDF = (data: {
  name: string;
  father: string;
  mother: string;
  dob: string;
  year: string;
  enrolment?: string;
  photo: string | null;
  result?: string;
  subjects?: any[];
}) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210, ml = 15, mr = 195;

  // Border
  doc.setDrawColor(0);
  doc.setLineWidth(0.8);
  doc.rect(8, 8, W - 16, 279);

  // Title
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Academic Examination Result", W / 2, 20, { align: "center" });

  // Left details
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  let y = 30;
  const details = [
    `Enrolment No : ${data.enrolment || "202462961657"}`,
    `Course : Secondary`,
    `Candidate Name : ${data.name || ""}`,
    `DOB : ${data.dob || ""}`,
    `Mother's Name : ${data.mother || ""}`,
    `Father's Name : ${data.father || ""}`,
    `Examination Year : ${data.year || ""}`,
    `Examination : APRIL-2024`,
  ];
  details.forEach((line, i) => {
    doc.text(line, ml, y + i * 7);
  });

  // Photo
  if (data.photo) {
    try { doc.addImage(data.photo, "JPEG", 155, 50, 30, 36); } catch (e) {}
  } else {
    doc.rect(155, 50, 30, 36);
    doc.setFontSize(7);
    doc.text("Photo", 164, 70);
  }

  // Table
  y = 100;
  const colX = [ml, 40, 70, 90, 110, 135, 165];
  const headers = [
    "Subject Code",
    "Subject Name",
    "Theory",
    "Practical",
    "TMA / Internal",
    "Total",
    "Result",
  ];

  doc.setLineWidth(0.4);
  doc.rect(ml, y, mr - ml, 10);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  headers.forEach((h, i) => {
    if (i > 0) doc.line(colX[i], y, colX[i], y + 10);
    doc.text(h, colX[i] + 1, y + 6);
  });

  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const subjects = data.subjects || [
    { code: "201", name: "HINDI" },
    { code: "211", name: "MATHEMATICS" },
    { code: "212", name: "SCIENCE/SCI.&TECH." },
    { code: "202", name: "ENGLISH" },
    { code: "213", name: "SOCIAL SCIENCE" },
  ];
  subjects.forEach((sub: any) => {
    const rowH = 8;
    doc.rect(ml, y, mr - ml, rowH);
    colX.slice(1).forEach((c) => doc.line(c, y, c, y + rowH));
    doc.text(sub.code || "", colX[0] + 1, y + 5);
    doc.text(sub.name || "", colX[1] + 1, y + 5);
    doc.text("", colX[2] + 1, y + 5); // theory
    doc.text("", colX[3] + 1, y + 5); // practical
    doc.text("", colX[4] + 1, y + 5); // tma
    doc.text("", colX[5] + 1, y + 5); // total
    doc.text("", colX[6] + 1, y + 5); // result
    y += rowH;
  });

  // Result row
  doc.rect(ml, y, mr - ml, 8);
  doc.setFont("helvetica", "bold");
  doc.text(`Result: ${data.result || "PASS"}`, W / 2, y + 5, { align: "center" });
  y += 18;

  // Notes
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const note =
    "Note: Marksheet-cum-Passing certificate will be issued to only those students who have completely passed (minimum 5 subjects including minimum one language) for certification. Read the prospectus for details.";
  doc.text(doc.splitTextToSize(note, mr - ml), ml, y);

  y += 20;
  doc.setFontSize(6);
  doc.setTextColor(100);
  doc.text(
    "The Result published on the website is provisional and subject to confirmation by National Institute of Open Schooling. NIOS is not responsible for any inadvertent error that might have crept in the Result published on the website. The details published on the website are for immediate information only.",
    ml,
    y,
    { maxWidth: mr - ml }
  );

  doc.save("nios_certificate.pdf");
};
