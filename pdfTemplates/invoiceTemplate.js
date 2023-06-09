const { PDFDocument, StandardFonts, rgb } = require("pdf-lib")

const invoiceTemplate = async () => {

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
    
      // Set the font and font size
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 12;
    
      // Add a new page to the PDF
      const page = pdfDoc.addPage();
    
      // Draw text on the page
      const { width, height } = page.getSize();
    
      // Invoice details
      const invoiceDetails = {
        invoiceNumber: 'INV-001',
        date: '2023-06-08',
        customerName: 'John Doe',
        totalAmount: '$100.00',
      };
    
      // Set the initial y-position for drawing text
      let y = height - 50;
    
      // Draw invoice details
      page.drawText(`Invoice Number: ${invoiceDetails.invoiceNumber}`, {
        x: 50,
        y: y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
      y -= 20;
    
      page.drawText(`Date: ${invoiceDetails.date}`, {
        x: 50,
        y: y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
      y -= 20;
    
      page.drawText(`Customer Name: ${invoiceDetails.customerName}`, {
        x: 50,
        y: y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
      y -= 40;
    
      // Draw table headers
      page.drawText('Item', {
        x: 50,
        y: y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
    
      page.drawText('Quantity', {
        x: 200,
        y: y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
    
      page.drawText('Price', {
        x: 300,
        y: y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
    
      y -= 20;
    
      // Draw table rows (sample data)
      const items = [
        { name: 'Item 1', quantity: 2, price: '$50.00' },
        { name: 'Item 2', quantity: 1, price: '$25.00' },
      ];
    
      for (const item of items) {
        page.drawText(item.name, {
          x: 50,
          y: y,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
    
        page.drawText(item.quantity.toString(), {
          x: 200,
          y: y,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
    
        page.drawText(item.price, {
          x: 300,
          y: y,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
    
        y -= 20;
      }
    
      // Draw total amount
      page.drawText(`Total Amount: ${invoiceDetails.totalAmount}`, {
        x: 200,
        y: y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
    

    // Serialize the PDF to a Uint8Array
    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
}

module.exports = invoiceTemplate