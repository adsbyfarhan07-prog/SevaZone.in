import jsPDF from "jspdf";

export const downloadNiosPDF = (data: any) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  doc.text("NIOS Certificate", 10, 10);
  doc.save("nios.pdf");
};
