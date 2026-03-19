import jsPDF from "jspdf";

export const downloadHaryanaDomicilePDF = (data: any) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  doc.text("Haryana Domicile Certificate", 10, 10);
  doc.save("haryana.pdf");
};
