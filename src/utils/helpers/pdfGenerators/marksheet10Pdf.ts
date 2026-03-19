import jsPDF from "jspdf";

export const downloadMarksheet10PDF = (data: any) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  doc.text("Marksheet 10th", 10, 10);
  doc.save("marksheet10.pdf");
};
