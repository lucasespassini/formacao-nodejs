const pdf = require('html-pdf')

class PdfWriter {
   static WriterPdf(filename, html) {
      pdf.create(html,{}).toFile(filename, (err) => {})
   }
}

module.exports = PdfWriter