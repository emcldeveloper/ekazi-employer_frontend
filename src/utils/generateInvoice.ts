import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import logo from "@/assets/logo.png";
import type { ClientPayment } from "@/@types/payments";
import { formatDate, formatMoney } from "@/utils/helpers";

export const generatePaymentReceipt = (payment: ClientPayment) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 14;
  const right = pageWidth - margin;

  // ---------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------

  const text = (
    value: string,
    x: number,
    y: number,
    options?: {
      size?: number;
      bold?: boolean;
      align?: "left" | "center" | "right";
    },
  ) => {
    doc.setFont("helvetica", options?.bold ? "bold" : "normal");
    doc.setFontSize(options?.size ?? 10);

    doc.text(value, x, y, {
      align: options?.align ?? "left",
    });
  };

  const line = (y: number) => {
    doc.setDrawColor(210, 210, 210);
    doc.setLineWidth(0.25);
    doc.line(margin, y, right, y);
  };

  // ---------------------------------------------------------
  // Receipt information
  // ---------------------------------------------------------

  const transactionId = payment.transaction_id || `PAY-${payment.id}`;
  const providerTransactionId =
    payment.provider_transaction_id || `PAY-${payment.id}`;

  // If your backend doesn't provide invoice/receipt numbers,
  // we generate stable-looking references from the payment ID.
  const invoiceNumber = `INV-${String(payment.id).padStart(6, "0")}`;
  const receiptNumber = transactionId;
  const referenceNumber = providerTransactionId;

  const paymentDate = formatDate(payment.created_at);
  const amount = formatMoney(payment.amount);

  // ---------------------------------------------------------
  // Header
  // ---------------------------------------------------------

  text("Invoice", margin, 20, {
    size: 18,
    bold: true,
  });

  // Simple Ekazi branding
  // Replace this with your logo later if you have one.
  // Logo
  const logoWidth = 20;
  const logoHeight = 10;

  doc.addImage(logo, "PNG", right - logoWidth, 10, logoWidth, logoHeight);

  // ---------------------------------------------------------
  // Receipt metadata
  // ---------------------------------------------------------

  text("Invoice number", margin, 31, {
    size: 8.5,
    bold: true,
  });

  text(invoiceNumber, margin + 28, 31, {
    size: 8.5,
  });

  text("Order number", margin, 37, {
    size: 8.5,
    bold: true,
  });

  text(receiptNumber, margin + 28, 37, {
    size: 8.5,
  });

  text("Date", margin, 43, {
    size: 8.5,
    bold: true,
  });

  text(paymentDate, margin + 28, 43, {
    size: 8.5,
  });

  // ---------------------------------------------------------
  // Seller + Bill To
  // ---------------------------------------------------------

  const companyX = margin;
  const billToX = 105;

  text("Ekazi", companyX, 57, {
    size: 9,
    bold: true,
  });

  text("Bill to", billToX, 57, {
    size: 9,
    bold: true,
  });

  // Seller details
  text("eKazi Company", companyX, 64, {
    size: 8.5,
  });

  text("Dar es Salaam, Tanzania", companyX, 70, {
    size: 8.5,
  });

  text("info@ekazi.co.tz", companyX, 76, {
    size: 8.5,
  });

  text("0715800430", companyX, 82, {
    size: 8.5,
  });

  // ---------------------------------------------------------
  // Customer
  //
  // Adjust these fields depending on where you store
  // the authenticated user's information.
  // ---------------------------------------------------------

  const customerName =
    [
      (payment as any).meta?.customer?.firstname,
      (payment as any).meta?.customer?.lastname,
    ]
      .filter(Boolean)
      .join(" ") || "Customer";

  const customerEmail = (payment as any).meta?.customer?.email || "";

  const customerPhone = (payment as any).meta?.customer?.phone || "";

  text(customerName, billToX, 64, {
    size: 8.5,
  });

  if (customerEmail) {
    text(customerEmail, billToX, 70, {
      size: 8.5,
    });
  }

  if (customerPhone) {
    text(customerPhone, billToX, 76, {
      size: 8.5,
    });
  }

  // ---------------------------------------------------------
  // Payment line items
  // ---------------------------------------------------------

  const planName = payment.plan?.name;

  autoTable(doc, {
    startY: 90,
    margin: {
      left: margin,
      right: margin,
    },

    head: [["Description", "Qty", "Unit price", "Tax", "Amount"]],

    body: [[planName, "1", amount, "18% incl.", amount]],

    theme: "plain",

    styles: {
      font: "helvetica",
      fontSize: 8.5,
      textColor: [30, 30, 30],
      cellPadding: {
        top: 3,
        bottom: 3,
        left: 0,
        right: 2,
      },
    },

    headStyles: {
      fontStyle: "normal",
      fontSize: 8,
      textColor: [30, 30, 30],
      lineWidth: 0,
      fillColor: [255, 255, 255],
    },

    bodyStyles: {
      lineWidth: 0,
    },

    columnStyles: {
      0: {
        cellWidth: 72,
        halign: "left",
      },
      1: {
        cellWidth: 15,
        halign: "center",
      },
      2: {
        cellWidth: 32,
        halign: "right",
      },
      3: {
        cellWidth: 30,
        halign: "right",
      },
      4: {
        cellWidth: 31,
        halign: "right",
      },
    },

    didParseCell: (data) => {
      // Align table headers with their respective columns
      if (data.section === "head") {
        if (data.column.index === 0) {
          data.cell.styles.halign = "left";
        }

        if (data.column.index === 1) {
          data.cell.styles.halign = "center";
        }

        if (
          data.column.index === 2 ||
          data.column.index === 3 ||
          data.column.index === 4
        ) {
          data.cell.styles.halign = "right";
        }
      }
    },

    didDrawCell: (data) => {
      // Header bottom border
      if (data.section === "head") {
        doc.setDrawColor(40, 40, 40);
        doc.setLineWidth(0.25);

        doc.line(
          data.cell.x,
          data.cell.y + data.cell.height,
          data.cell.x + data.cell.width,
          data.cell.y + data.cell.height,
        );
      }
    },
  });

  // ---------------------------------------------------------
  // Totals
  // ---------------------------------------------------------

  const finalY = (doc as any).lastAutoTable.finalY + 9;

  const totalsX = 115;
  const totalsValueX = right;

  const subtotal = Number(payment.amount) || 0;

  // Assuming 18% VAT is included in the displayed price.
  // VAT-exclusive amount = total / 1.18
  const excludingTax = subtotal / 1.18;
  const vat = subtotal - excludingTax;

  const currency = "TZS";

  text("Subtotal", totalsX, finalY, {
    size: 8.5,
  });

  text(
    `${currency}${subtotal.toLocaleString("en-TZ", {
      minimumFractionDigits: 2,
    })}`,
    totalsValueX,
    finalY,
    {
      size: 8.5,
      align: "right",
    },
  );

  line(finalY + 3);

  text("Total excluding tax", totalsX, finalY + 9, {
    size: 8.5,
  });

  text(
    `${currency}${excludingTax.toLocaleString("en-TZ", {
      minimumFractionDigits: 2,
    })}`,
    totalsValueX,
    finalY + 9,
    {
      size: 8.5,
      align: "right",
    },
  );

  text("VAT - Tanzania (18% incl.)", totalsX, finalY + 16, {
    size: 8.5,
  });

  text(
    `${currency}${vat.toLocaleString("en-TZ", {
      minimumFractionDigits: 2,
    })}`,
    totalsValueX,
    finalY + 16,
    {
      size: 8.5,
      align: "right",
    },
  );

  line(finalY + 19);

  text("Total", totalsX, finalY + 26, {
    size: 8.5,
    bold: true,
  });

  text(
    `${currency}${subtotal.toLocaleString("en-TZ", {
      minimumFractionDigits: 2,
    })}`,
    totalsValueX,
    finalY + 26,
    {
      size: 8.5,
      bold: true,
      align: "right",
    },
  );

  text("Amount paid", totalsX, finalY + 34, {
    size: 8.5,
    bold: true,
  });

  text(
    `${currency}${subtotal.toLocaleString("en-TZ", {
      minimumFractionDigits: 2,
    })}`,
    totalsValueX,
    finalY + 34,
    {
      size: 8.5,
      bold: true,
      align: "right",
    },
  );

  // ---------------------------------------------------------
  // Payment history
  // ---------------------------------------------------------

  const historyY = finalY + 52;

  text("Payment details", margin, historyY, {
    size: 10,
    bold: true,
  });

  autoTable(doc, {
    startY: historyY + 6,

    margin: {
      left: margin,
      right: margin,
    },

    head: [["Payment method", "Date", "Amount paid", "Reference number"]],

    body: [
      [
        (payment as any).channel?.provider || "Mobile payment",
        paymentDate,
        amount,
        referenceNumber,
      ],
    ],

    theme: "plain",

    styles: {
      font: "helvetica",
      fontSize: 8.5,
      textColor: [30, 30, 30],
      cellPadding: {
        top: 3,
        bottom: 3,
        left: 0,
        right: 2,
      },
    },

    headStyles: {
      fontStyle: "normal",
      fontSize: 8,
      textColor: [30, 30, 30],
    },

    columnStyles: {
      0: {
        cellWidth: 75,
        halign: "left",
      },
      1: {
        cellWidth: 35,
        halign: "left",
      },
      2: {
        cellWidth: 35,
        halign: "right",
      },
      3: {
        cellWidth: 35,
        halign: "right",
      },
    },

    // Align headers with their column content
    didParseCell: (data) => {
      if (data.section === "head") {
        if (data.column.index === 0 || data.column.index === 1) {
          data.cell.styles.halign = "left";
        } else {
          data.cell.styles.halign = "right";
        }
      }
    },

    didDrawCell: (data) => {
      if (data.section === "head") {
        doc.setDrawColor(40, 40, 40);
        doc.setLineWidth(0.25);

        doc.line(
          data.cell.x,
          data.cell.y + data.cell.height,
          data.cell.x + data.cell.width,
          data.cell.y + data.cell.height,
        );
      }
    },
  });

  // ---------------------------------------------------------
  // Footer
  // ---------------------------------------------------------

  line(pageHeight - 20);

  text("Thank you for choosing Ekazi.", margin, pageHeight - 12, {
    size: 7.5,
  });

  text("Page 1 of 1", right, pageHeight - 12, {
    size: 7.5,
    align: "right",
  });

  // ---------------------------------------------------------
  // Download
  // ---------------------------------------------------------

  doc.save(`receipt-${transactionId}.pdf`);
};
