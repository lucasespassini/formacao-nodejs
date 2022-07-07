var Reader = require('./Reader')
var Processor = require('./Processor')
var Table = require('./Table')
var HtmlParser = require('./HtmlParser')
var Writer = require('./Writer')
var PdfWriter = require('./PdfWriter')

var leitor = new Reader()
var escritor = new Writer()

async function main() {
   var dados = await leitor.Read('./Usuarios.csv')
   var dadosProcessador = Processor.Process(dados)
   var users = new Table(dadosProcessador)

   var html = await HtmlParser.Parse(users)

   escritor.Write(Date.now()+'meuhtml.html', html)
   PdfWriter.WriterPdf(Date.now()+'meuhtml.pdf', html)
}

main()
