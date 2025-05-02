const express = require("express")
const {connection} = require("./db")
const { tenantRouter } = require("./routes/tenent.route");
const { landlordRouter } = require("./routes/landlord.route");
const cors = require('cors');
const port = process.env.PORT || 8080

const app = express()
app.use(express.json());

app.use(cors());
app.use("/tenant", tenantRouter);
app.use("/landlord", landlordRouter);


app.get("/",(req,res)=>{
res.send("Welcome to the api of Rentify.")
})

 app.listen(port,async()=>{
     try {
         await connection
         console.log("Connected to the DB");
         console.log(`Server is Running on http://localhost:${port}`);
     } catch (error) {
         console.log(error);
     }
 })