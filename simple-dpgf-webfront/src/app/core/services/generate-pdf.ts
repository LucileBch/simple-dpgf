import { jsPDF } from "jspdf";
import { LotDto } from "../dtos/lot/LotDto";
import { ProductDto } from "../dtos/product/ProductDto";
import { DpgfDto } from "../dtos/dpgf/DpgfDto";
import { unitEnumtoLabel } from "../enums/UnitEnum";
import { lotNameToLabel } from "../enums/LotEnum";

export function generatePdf(
  dpgf: DpgfDto,
  lotList: LotDto[],
  productList: ProductDto[]
) {
  const doc = new jsPDF("landscape");

  let yOffset = 20; // Initial position

  // Titre du PDF
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(
    `Décomposition du Prix Global et Forfaitaire : ${dpgf.name}`,
    20,
    yOffset
  );
  yOffset += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Créé par : ${dpgf.createdByUser}`, 20, yOffset);
  yOffset += 10;

  lotList.forEach((lot) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`${lot.code} - ${lotNameToLabel(lot.lotName)} :`, 20, yOffset);
    yOffset += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Nom", 20, yOffset);
    doc.text("Unité", 80, yOffset);
    doc.text("Quantité", 120, yOffset);
    doc.text("Prix Unitaire", 160, yOffset);
    doc.text("Prix Total", 200, yOffset);
    yOffset += 5;

    const filteredProductsByLotCode = productList.filter(
      (product) => product.lotCode === lot.code
    );

    filteredProductsByLotCode.forEach((product) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(product.name, 20, yOffset);
      doc.text(unitEnumtoLabel(product.unit), 80, yOffset);
      doc.text(String(product.quantity), 120, yOffset);
      doc.text(`${product.unitPrice.toFixed(2)} €`, 160, yOffset);
      doc.text(`${product.totalPrice.toFixed(2)} €`, 200, yOffset);
      yOffset += 5;
    });

    yOffset += 10;
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`Total DPGF: ${dpgf.dpgfTotal.toFixed(2)} €`, 20, yOffset);

  // Sauvegarder le PDF
  doc.save(`DPGF_${dpgf.name}`);
}
