const express = require("express")
const app = express()
const router = require("./routes/routes")
const cors = require('cors')

app.use(cors())
 
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/", router);

app.listen(8081, () => {
    console.log("Rodando na porta 8081");
});
